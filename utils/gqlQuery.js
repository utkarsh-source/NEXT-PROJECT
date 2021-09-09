import { gql } from "@apollo/client";

export const USER_BY_EMAIL_ID = gql`
    query userByEmailId($email :String!){
        current_user_by_pk(email :$email){
        email
    }
  }
`