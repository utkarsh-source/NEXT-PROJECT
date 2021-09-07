import { AuthAction, withAuthUser } from "next-firebase-auth"
import FullPageLoader from "../../components/FullPageLoader"

function Reports() {
    return (
        <div>
            <h1>Report page</h1>
        </div>
    )
}

export default withAuthUser({
    whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
    whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
    LoaderComponent: FullPageLoader,  
})(Reports)