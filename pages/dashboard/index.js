import { FaCheckCircle, FaHome, FaSyncAlt } from "react-icons/fa"
import FullPageLoader from '../../components/FullPageLoader'
import getAbsoluteURL from '../../utils/getAbsoluteURL'
import Card from "../../components/card"
import { AuthAction, withAuthUser } from "next-firebase-auth"

function Dashboard() {



    return (
        <section className="relative w-full">
            <div className="flex items-center justify-end py-4 px-5">
                <button className="mr-3 plain-btn">Add money</button>
                <button className="btn-indigo">Send money</button>
            </div>
            <div className="w-full px-5">
                <h1 className="text-lg font-semibold text-gray-600 pb-4">Overview</h1>
                <div className="flex items-center space-x-5 flex-wrap">
                    <Card amount="$30,659.45" title="Account balance" icon={FaHome}/>
                    <Card amount="-$19,500.00" title="Pending" icon={FaSyncAlt}/>
                    <Card amount="$20,000" title="Processed (last 30 days)" icon={FaCheckCircle}/>
                </div>
            </div>
        </section>
    )
}

export default withAuthUser({
    whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
    whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
    LoaderComponent: FullPageLoader,  
})(Dashboard)