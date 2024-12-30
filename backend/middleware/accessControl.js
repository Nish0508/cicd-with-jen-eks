import clientGroupHelpers from "../utils/clientGroupHelpers.js";
import { logMessage } from "../utils/errorHandling.js";
import { getAllSessionsForUser, sessionBelongsToTherapist } from "../utils/sessionHelpers.js";
import { getTeamMembersSessionIds, getTeamMembersUserIds } from "../utils/teamHelpers.js";
import { getTherapistsPatientsIds } from "../utils/userHelpers.js";

const accessControlMiddleware = args => {
  const { verifyPatientOwnership, verifySessionOwnership, verifyPatientOrGroupOwnership } = args;

  if (verifyPatientOwnership && verifySessionOwnership) {
    throw new Error("Both ownership of patient and session is not supported");
  }

  if (verifyPatientOwnership) {
    return profileAndPatientMiddleware;
  }

  if (verifySessionOwnership) {
    return sessionOwnershipMiddleware;
  }
  if (verifyPatientOrGroupOwnership) {
    return patientOrGroupOwnershipMiddleware;
  }
  return ownProfileMiddleware;
};

const ownProfileMiddleware = async (req, res, next) => {
  const isAdmin = req.session.isAdmin;

  if (isAdmin) {
    next();
  } else {
    let therapistId = undefined;

    if (req.method === "GET" || req.method === "DELETE") {
      therapistId = req.params.therapistId;
    } else {
      therapistId = req.body.therapistId;
    }

    const userId = req.session.userId;

    // request for own profile
    if (userId === therapistId) {
      next();
    } else {
      const teamId = req.session.teamId;
      const isOwner = req.session.isOwner;

      // change to non-owners in the future
      if (teamId && isOwner) {
        // check for team admin requesting member profile
        const teamMembersIds = await getTeamMembersUserIds(teamId);
        if (teamMembersIds.includes(therapistId)) {
          next();
        } else {
          return res.status(400).json({
            status: 400,
            message: `The information doesn't belong to the currently requested user! ${req.originalurl} ${userId} requested ${therapistId}`
          });
        }
      } else {
        return res.status(400).json({
          status: 400,
          message: `The information doesn't belong to the currently requested user! ${req.originalurl} ${userId} requested ${therapistId}`
        });
      }
    }
  }
};

const profileAndPatientMiddleware = async (req, res, next) => {
  const isAdmin = req.session.isAdmin;

  if (isAdmin) {
    next();
  } else {
    let therapistId = undefined;
    let patientId = undefined;

    if (req.method === "GET" || req.method === "DELETE") {
      therapistId = req.params.therapistId;
      patientId = req.params.patientId;
    } else {
      therapistId = req.body.therapistId;
      patientId = req.body.patientId;
    }

    const userId = req.session.userId;
    // request for own profile
    if (userId === therapistId) {
      // if the request includes patient info
      if (patientId !== undefined) {
        // requests patient info - check if it belongs to profile
        const patientsList = req.session.patientsIds || [];
        const clientGroupList = req.session.clientGroupsIds || [];

        if (patientsList.includes(patientId) || clientGroupList.includes(patientId)) {
          next();
        } else {
          return res.json({
            status: 403,
            message: "The patient doesn't belong to the currently logged in user!"
          });
        }
      } else {
        return res.json({
          status: 403,
          message: "The patient doesn't belong to the currently logged in user!"
        });
      }
    } else {
      const teamId = req.session.teamId;
      const isOwner = req.session.isOwner;

      // change to non-owners in the future
      if (teamId && isOwner) {
        // check for team admin requesting member profile

        const teamMembersIds = await getTeamMembersUserIds(teamId);

        if (teamMembersIds.includes(therapistId)) {
          if (patientId !== undefined) {
            // requests patient info - check if it belongs to profile
            const patientsList = await getTherapistsPatientsIds(therapistId);
            const clientGroupList = await clientGroupHelpers.listTherapistClientGroups(therapistId);
            if (patientsList.includes(patientId) || clientGroupList.includes(patientId)) {
              next();
            } else {
              return res.json({
                status: 403,
                message: `The information doesn't belong to the currently requested user! ${req.originalurl} ${userId} requested ${therapistId} patient ${patientId}`
              });
            }
          } else {
            return res.json({
              status: 403,
              message: `The information doesn't belong to the currently requested user! ${req.originalurl} ${userId} requested ${therapistId} patient ${patientId}`
            });
          }
        } else {
          return res.json({
            status: 403,
            message: `The information doesn't belong to the currently requested user! ${req.originalurl} ${userId} requested ${therapistId}`
          });
        }
      } else {
        return res.json({
          status: 403,
          message: `The information doesn't belong to the currently requested user! ${req.originalurl} ${userId} requested ${therapistId}`
        });
      }
    }
  }
};

const sessionOwnershipMiddleware = async (req, res, next) => {
  const isAdmin = req.session.isAdmin;

  if (isAdmin) {
    next();
  } else {
    let sessionId = undefined;

    if (req.method === "GET" || req.method === "DELETE") {
      sessionId = req.params.sessionId;
    } else {
      sessionId = req.body.sessionId;
    }

    // const userId = req.session.userId;

    let userSessions = req?.session?.userSessions ?? [];
    if (userSessions === undefined || userSessions.length === 0) {
      // check in case something happens here
      const userId = req.session.userId;
      const sessionsList = await getAllSessionsForUser(userId);
      req.session.userSessions = sessionsList;
      userSessions = sessionsList;
      // logMessage(`Was in empty or undefined session list, after query got ${JSON.stringify(userSessions)}`)
    }

    if (userSessions.includes(sessionId)) {
      // check for session belonging to current user
      next();
    } else {
      const userId = req.session.userId;
      const sessionBelongsToCurrentUser = await sessionBelongsToTherapist(sessionId, userId);

      if (sessionBelongsToCurrentUser) {
        req.session.userSessions.push(sessionId);
        next();
      } else {
        const teamId = req.session.teamId;
        const isOwner = req.session.isOwner;

        // change to non-owners in the future
        if (teamId && isOwner) {
          const teamMemberSessions = await getTeamMembersSessionIds(teamId);
          if (teamMemberSessions.includes(sessionId)) {
            // check for session belonging to a team member user
            next();
          } else {
            console.error(
              `Problem with accessing user session: missing id ${sessionId} for user ${req.session.userId}`
            );

            return res.status(400).json({
              status: 400,
              message: "The session doesn't belong to the currently logged in user!"
            });
          }
        } else {
          console.error(
            `Problem with accessing user session: missing id ${sessionId} for user ${req.session.userId}`
          );
          return res.status(400).json({
            status: 400,
            message: "The session doesn't belong to the currently logged in user!"
          });
        }
      }
    }
  }
};

const patientOrGroupOwnershipMiddleware = async (req, res, next) => {
  const isAdmin = req.session.isAdmin;
  if (isAdmin) {
    next();
  } else {
    let clientGroupId = undefined;
    let patientId = undefined;
    let therapistId = undefined;

    if (req.method === "GET" || req.method === "DELETE") {
      clientGroupId = req.params.clientGroupId;
      patientId = req.params.patientId;
      therapistId = req.params.therapistId;
    } else {
      clientGroupId = req.body.clientGroupId;
      patientId = req.body.patientId;
      therapistId = req.body.therapistId;
    }

    if (!clientGroupId && !patientId) {
      return res.status(400).json({
        status: 400,
        message: `patientId or clientGroupId is required`
      });
    }

    const userId = req.session.userId;
    if (userId === therapistId) {
      if (patientId) {
        // requests patient info - check if it belongs to profile
        const patientsList = req.session.patientsIds || [];
        if (patientsList.includes(patientId) === false) {
          return res.status(400).json({
            status: 400,
            message: "The client doesn't belong to the currently logged in user!"
          });
        }
      } else if (clientGroupId) {
        const clientGroupList = req.session.clientGroupsIds || [];
        if (clientGroupList.includes(clientGroupId) === false) {
          return res.status(400).json({
            status: 400,
            message: "The group doesn't belong to the currently logged in user!"
          });
        }
      } else {
         logMessage("missing patientId and clientGroupId");
         return res.status(500).json({
           status: 500,
           message: "An unexpected error occurred while validating the acces to your information. Please inform the support team!"
         });
      }
      next();
    } else {
      const teamId = req.session.teamId;
      const isOwner = req.session.isOwner;

      if (teamId && isOwner) {
        const teamMembersIds = await getTeamMembersUserIds(teamId);
        if (teamMembersIds.includes(therapistId)) {
          if (patientId !== undefined) {
            // requests patient info - check if it belongs to profile
            const patientsList = await getTherapistsPatientsIds(therapistId);
            if (patientsList.includes(patientId)) {
              next();
            } else {
              return res.status(400).json({
                status: 400,
                message: `The information doesn't belong to the currently requested user! ${req.originalurl} ${userId} requested ${therapistId} patient ${patientId}`
              });
            }
          } else if (clientGroupId !== undefined) {
            const clientGroupList = await clientGroupHelpers.listTherapistClientGroups(therapistId);
            if (clientGroupList.find(group => group.group_id === clientGroupId)) {
              next();
            } else {
              return res.status(400).json({
                status: 400,
                message: `The information doesn't belong to the currently requested user! ${req.originalurl} ${userId} requested ${therapistId} patient ${patientId}`
              });
            }
          } else {
            logMessage("missing patientId and clientGroupId when validating team member access");
            return res.status(500).json({
              status: 500,
              message:
                "An unexpected error occurred while validating the acces to your information. Please inform the support team!"
            });
          }
        } else {
          return res.status(400).json({
            status: 400,
            message: `The information doesn't belong to the currently requested user! ${req.originalurl} ${userId} requested ${therapistId}`
          });
        }
      }
    }
  }
};

export default accessControlMiddleware;
