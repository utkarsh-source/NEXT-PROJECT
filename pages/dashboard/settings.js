import { AuthAction, withAuthUser } from "next-firebase-auth"

function Settings() {
    
    return (
            <h1>Setting page</h1>
    )
}


export default withAuthUser({
    whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Settings)

