import Verify from "../../components/HOC/isVerified"

function Settings() {
    
    return (
        <Verify srr={true}>
            <h1>Setting page</h1>
        </Verify>
    )
}


export default Settings

