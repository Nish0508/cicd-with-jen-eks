import { buildSchema } from "graphql";
export const schema = buildSchema(`

  type mentalyc_users{
    user_id: String 	
    user_name: String 	
    user_email: String 	
    user_password: String	
    user_type: String          
    user_status: String   
    is_admin: Boolean
    is_owner: Boolean
    team_id: String
    created: String
    finished_onboarding: Boolean
    finished_introduction: Boolean
    therapy_type_id: Int
    therapy_type_name: String
    client_gender: String
    session_speaker_count: Int
    stripe_customer_id: String
  }

  type Query {

    getTherapistByEmail(user_email: String) : mentalyc_users
  }
`);
