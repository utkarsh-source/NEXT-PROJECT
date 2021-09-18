import { AuthAction, withAuthUser } from "next-firebase-auth"

function Reports() {
    return (
            <h1>Report page</h1>
    )
}

export default withAuthUser({
    whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Reports)
