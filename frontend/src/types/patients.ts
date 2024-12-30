export type PatientInfo = {
  client_gender: string;
  patient_id: string;
  patient_name: string;
  status: string;
  therapy_type: string;
  therapist_id?: string;
  last_session_upload_timestamp: string | number;
  checked?: boolean;
  session_speaker_count?: number;
  client_age?: number;
  extra_notes?: string;
  diagnosis?: string;
  comorbidity?: string;
  client_risk?: boolean;
  birth_year?: number;
  has_summarized_session?: boolean;
  is_group?: boolean;
};

export type GroupInfo = {
  group_id: string;
  group_name: string;
  status: string;
  members_count: number;
  last_session_upload_timestamp: number;
  members?: ClientGroupMember[];
  client_group_id?: string;
};

// merger of patient & group clients
export type MergedClient = {
  name: string;
  id: string;
  is_group: boolean;
  therapy_type: string;
  last_session_upload_timestamp: string;
  status: string;
  client_gender?: string;
  speaker_count: number;
  client_age?: number;
  extra_notes?: string;
  diagnosis?: string;
  comorbidity?: string;
  client_risk?: boolean;
  birth_year?: number;
  has_summarized_session?: boolean;
  therapist_id?: string;
  group_members?: ClientGroupMember[];
  is_group_member?: boolean
};

export type ClientGroupMember = {
  user_id: string;
  user_name: string;
  therapy_type_id: string;
  therapy_type_name: string;
  client_gender: string;
  checkedForRemoval: boolean;
};

export type ClientGroupFullInfo = {
  group_id: string;
  group_name: string;
  members_count: number;
  status: string;
  created: string;
  members: ClientGroupMember
};

export type ClientInfoType = {
  therapyType: string;
  name: string;
  gender: string;
  birthYear: string;
  diagnosis: string;
  comorbidity: string;
  risk: boolean;
  notes: string;
  coupleOne: string;
  coupleTwo: string;
  familyName: string;
  clientCount: string;
}

export interface SelectPatient extends PatientInfo {
  label: string;
  value: string;
  therapyType?: string;
}
