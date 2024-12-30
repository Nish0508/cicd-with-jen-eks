const authMiddleware = async (req, res, next) => {
  const isAuthenticated = req.session.isAuthenticated;
  if (isAuthenticated) {
    next();
  } else {
    res.status(401).json({
      status: 401,
      message: "The request is not authenticated!"
    });
  }
};

export default authMiddleware;
