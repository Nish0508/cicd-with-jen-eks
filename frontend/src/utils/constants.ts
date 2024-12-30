


export const MIN_DURATION_MINUTES = 1;
export const MAX_DURATION_MINUTES_BASIC = 75;
export const MAX_DURATION_MINUTES_PRO = 130;

export const ALLOWED_FILES = {
  ".mp3": [
    "audio/mpeg",
    "audio/mpeg3",
    "audio/x-mpeg-3",
    "audio/mp3",
    "audio/x-mp3",
    "audio/x-mpeg",
    "audio/mpg",
    "audio/x-mpg"
  ],
  ".mp4": ["audio/mp4", "audio/x-mp4"],
  ".m4a": ["audio/x-m4a", "audio/m4a", "video/mp4", "audio/mp4"],
  ".ogg": ["audio/ogg", "audio/x-ogg"],
  ".webm": ["audio/webm", "video/webm"],
  ".weba": ["audio/webm"],
  ".wav": ["audio/vnd.wav", "audio/x-wav", "audio/wav"],
  ".aiff": ["audio/aiff", "audio/x-aiff"]
};

export const BYTES_OF_200MB = 209715200;
export const BYTES_OF_100MB = 104857600;

export const BYTES_OF_150MB = 157286400;

export const ACTIVE = "active";

export const INACTIVE = "inactive";
export const ARCHIVED = "archived";

export const MIN_DESCRIPTION_WORD_LENGTH = 50;
export const MAX_DESCRIPTION_WORD_LENGTH = 1000;
export const DEMO_NOTES_COUNT = 15;
export const MINUTES_TO_MS = 60000;

export const ONE_HOUR_IN_MINUTES = 60;
export const HALF_DAY_IN_MINUTES = 12 * ONE_HOUR_IN_MINUTES;
export const DAY_IN_MINUTES = 24 * ONE_HOUR_IN_MINUTES;
export const HOUR_TO_MS = 60 * MINUTES_TO_MS;
export const HOURS = "hours";
export const MINUTES = "minutes";
export const VERSION_KEY = "version-update-needed";
export const DISABLE_SAVE_TO_RECORDS_CONFIRMATION = "disable_save_to_records_confirmation";
export const PATIENT_TYPE = "patient";
export const GROUP_TYPE = "group";
export const GROUP_NOTE_TYPE = "Group Therapy note"

export const YEAR = "year";
export const MONTH = "month";

//NOTES
export const PROGRESS = "progress";
export const INTAKE = "intake";

export const SOLO_PRACTITIONER = "solo practitioner";
export const LEADER = "leader";

// NOTE STATES

type SessionStatus = string

export const SESSION_STATUS: { [key: string]: SessionStatus } = {
  NOT_STARTED: "not_started",
  FAILED: "failed",
  TRANSCRIPT_FAIL: "transcript_fail",
  NOTE_FAIL: "note_fail",
  SILENCE: "silence",
  DUPLICATE: "duplicate",
  UPLOADING_FAILED: "uploading_failed",
  DONE: "done",
  TRANSCRIPTION_DONE: "transcription_done",
  UPLOADING: "uploading",
  PENDING: "pending",
  NOTE_GENERATION_PENDING: "note_generation_pending",
  TREATMENT_GENERATING: "generating"
};

// TREATMENT STATES
export const TREATMENT_PLAN_STATUS = {
  GENERATING: "generating",
  UNSAVED: "unsaved",
  SAVED: "saved",
  MISSING: "missing",
  DELETED: "deleted",
  FAILED: "treatment_failed"
};

export const FREE_PLAN_LEVEL = 0;
export const MINI_PLAN_LEVEL = 1;
export const BASIC_PLAN_LEVEL = 2;
export const PRO_PLAN_LEVEL = 3;
export const SUPER_PLAN_LEVEL = 4;
