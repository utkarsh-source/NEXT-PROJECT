import { client } from "./apolloClient";
import { USER_BY_EMAIL_ID } from "./gqlQuery";
import Notification from  '../components/Notification'
import firebase from 'firebase'

export const verifyUser = async (setState, toast, email) => {
    let isUserVerified;
    try {
           const {data} =  await client.query({
                    query: USER_BY_EMAIL_ID,
                    variables: {
                        email,
                    }
            })
                if (!data.current_user_by_pk) {
                   firebase.auth().signOut()
                   toast.warn(<Notification>Provided user email does not match any user in our database!</Notification>, {
                                style: {
                                    backgroundColor: '#db504a',
                                }
                            })                  
                        setState(false)
                        isUserVerified = false;
                        } else {
                        isUserVerified = true      
                        }    
                    }catch(err){
                        isUserVerified = false;
                        setState(false)
                        toast.warn(<Notification>{err.message}!</Notification>, {
                            style: {
                                backgroundColor: '#db504a',
                            }
                        })
                }
            return isUserVerified
}