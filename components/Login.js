import Image from "next/image";
import logo from '../assets/logo-cyan.svg';
import google from '../assets/search.png';
import lock from '../assets/lock.png';
import firebase from 'firebase'
import { useContext, useState } from "react";
import {FaEye, FaEyeSlash} from 'react-icons/fa'
import {AuthAction, withAuthUser} from "next-firebase-auth";
import { ContextProvider } from "../utils/context";
import { toast } from "react-toastify";
import Notification from './Notification'
import FullPageLoader from "./FullPageLoader";
import { verifyUser } from "../utils/verifyUser";


toast.configure()



const actionCode = {
    url: "http://localhost:3000",
     handleCodeInApp: true,
}

function Login() {

    const {setUserIsLoading} = useContext(ContextProvider)

    const [show, setShow] = useState(false)

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        hasAccount: true,
        remember: false,
    })


    
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setUserIsLoading(true)
        try {
            const isUserVerified = await verifyUser(setUserIsLoading, toast, user.email)
            if (!isUserVerified) return
            if (user.hasAccount) {
                await firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                setUserIsLoading(false);
            } else {
                await firebase.auth().sendSignInLinkToEmail(user.email, actionCode)
                await firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                toast.success(<Notification>Account created successfully!</Notification>)
                setUserIsLoading(false)
            }
        } catch (err) {
            toast.warn(<Notification>{err.message}!</Notification>, {
                style: {
                    backgroundColor: '#db504a',
                }
            })
            setUserIsLoading(false)
        }
    }

    const handleGoogleSignIn = async () => {
        setUserIsLoading(true)
        const provider = new firebase.auth.GoogleAuthProvider()
        try {
            const res = await firebase.auth().signInWithPopup(provider)
            await verifyUser(setUserIsLoading, toast, res.user.email)
            setUserIsLoading(false)
        } catch (err) {
            toast.warn(<Notification>{err.message}!</Notification>, {
                style: {
                    backgroundColor: '#db504a',
                }
            })
            setUserIsLoading(false);
        }
    }      

    return (
        <div className="bg-gray-50 fixed py-5 w-screen top-0 left-0 bottom-0 right-0 flex md:items-center justify-center">
            <form  className="flex flex-col relative w-11/12 md:w-8/12 lg:w-5/12" onSubmit={handleFormSubmit}>
                <figure className="w-max mx-auto mb-6">
                    <Image src={logo} alt="Workflow logo" width={65} height={65} />
                </figure>
                <h1 className="text-center text-3xl font-extrabold">Sign in to your account</h1>
                <p className="py-7 text-center px-3">{user.hasAccount ? "Don't have an account?" : "Already have an account?"}<span className="cursor-pointer pl-1.5 text-cyan text-base underline font-extrabold" onClick={() => setUser(prev => ({ ...prev, hasAccount: !prev.hasAccount, passError: "", emailError: "" }))} aria-label="button">{user.hasAccount ? "Create" : "Sign In"}</span></p>
                <div className="border relative flex flex-col rounded-lg overflow-hidden">
                    <input onChange={(e) => {
                        setUser(prev => ({ ...prev, email: e.target.value}))
                    }} value={user.email} className="focus:outline-none   py-4 px-5 bg-white" type="email" name="email" placeholder="Email address" required />
                    <div className="relative w-full"><input onChange={(e) => {
                        setUser(prev => ({ ...prev, password: e.target.value}))
                    }} value={user.password} className="w-full focus:outline-none
                    border-t py-4 px-5 bg-white" type={show ? "text" : "password"} name="password" placeholder={user.hasAccount ? "Password" : "Create Password"} required />{show ? <FaEyeSlash onClick={() => setShow(false)} className="z-50 top-1/2 transform -translate-y-1/2 absolute bg-gray-100 h-full w-14 px-4 right-0 text-gray-400 cursor-pointer text-2xl" /> : <FaEye onClick={() => setShow(true)} className="z-50 top-1/2 transform -translate-y-1/2 absolute bg-gray-100 h-full w-14 px-4 right-0 text-gray-400 cursor-pointer text-2xl" />}</div>
                    
                </div>
                {user.hasAccount && 
                    <span className="pt-10 px-3 text-sm text-right text-cyan font-semibold cursor-pointer">Forgot your password?</span>}
                <div className="md:static fixed mt-10 left-0 px-5 md:px-0 bottom-5 w-full">
                    <button type="submit" className="flex items-center justify-center w-full mb-4 btn-indigo"><span className="absolute grid place-items-center left-4"><Image src={lock} alt="Google" width={30} height={30} /></span>   {user.hasAccount ? "Sign In" : "Create Account"}</button>
                    <button type="button" onClick={handleGoogleSignIn} className="flex items-center justify-center  w-full plain-btn"><span className="grid place-items-center absolute left-4"><Image src={google} alt="Google" width={25} height={25} /> </span> Sign in with Google</button>
                </div>
            </form>
        </div>
    )
}

export default withAuthUser({
    whenAuthed: AuthAction.REDIRECT_TO_APP,
    whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
    LoaderComponent : FullPageLoader,
    appPageURL : '/dashboard'
})(Login)
