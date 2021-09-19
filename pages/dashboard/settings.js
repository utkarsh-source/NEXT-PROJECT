import { AuthAction, withAuthUser } from "next-firebase-auth"
import FullPageLoader from "../../components/FullPageLoader"
import Layout from "../../components/Layout"

function Settings() {
    
    return (
        <Layout><h1>Setting page</h1></Layout>
    )
}


// export default withAuthUser({
//     whenUnauthedBeforeInit : AuthAction.SHOW_LOADER,
//     whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
//     LoaderComponent : FullPageLoader
// })(Settings)


export default Settings

