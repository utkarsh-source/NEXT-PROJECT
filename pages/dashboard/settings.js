
import { AuthAction, withAuthUserTokenSSR } from "next-firebase-auth"
import Layout from "../../components/Layout"

function Settings(props) {
    
    return (
        <Layout {...props}><h1>Setting page</h1></Layout>
    )
}

export const getServerSideProps = withAuthUserTokenSSR({
    whenUnauthed : AuthAction.REDIRECT_TO_LOGIN
})(async ({ AuthUser }) => {
    return {
        props: {
            email: AuthUser.email,
        }
    }
})


export default Settings

