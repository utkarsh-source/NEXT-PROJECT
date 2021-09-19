import { AuthAction, withAuthUser } from "next-firebase-auth"
import FullPageLoader from "../../components/FullPageLoader"
import Layout from "../../components/Layout"

function Reports() {
    return (
        <Layout>
            <h1>Report page</h1>
        </Layout>
    )
}

// export default withAuthUser({
//     whenUnauthedBeforeInit : AuthAction.SHOW_LOADER,
//     whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
//     LoaderComponent : FullPageLoader
// })(Reports)


export default Reports