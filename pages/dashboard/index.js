import { AuthAction, withAuthUserTokenSSR } from "next-firebase-auth"
import { FaCheckCircle, FaHome, FaSyncAlt } from "react-icons/fa"
import Card from "../../components/card"
import Layout from "../../components/Layout"

function Dashboard(props) {
    
    return (
        <Layout {...props}>
                    <section className="relative w-full">
                        <div className="flex items-center justify-end py-4  md:px-1 lg:px-5">
                            <button className="mr-3 plain-btn">Add money</button>
                            <button className="btn-indigo">Send money</button>
                        </div>
                        <div className="w-full md:px-1 lg:px-5">
                            <h1 className="text-lg font-semibold text-gray-600 pb-4">Overview</h1>
                            <div className="relative w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-y-6 gap-x-4">
                                <Card amount="$30,659.45" title="Account balance" icon={FaHome} />
                                <Card amount="-$19,500.00" title="Pending" icon={FaSyncAlt} />
                                <Card amount="$20,000" title="Processed (last 30 days)" icon={FaCheckCircle} />
                            </div>
                        </div>
            </section>
            </Layout>
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
export default (Dashboard)


