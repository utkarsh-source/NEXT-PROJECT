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
    url: process.env.NODE_ENV === "production" ? "https://next-project-theta.vercel.app" : "http://localhost:3000",
     handleCodeInApp: true,
}

function Login() {

    const deleteUser = (user) => {
        user.delete()
        setUserIsLoading(false)
    }

    const { setUserIsLoading } = useContext(ContextProvider)

    const [show, setShow] = useState(false)

    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        hasAccount: true,
        remember: false,
    })

    const [forgetPass, setForgetPass] = useState(false)
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setUserIsLoading(true)
        try {
            const isUserVerified = await verifyUser(setUserIsLoading, toast, user.email)
            if (!isUserVerified) return
            if (user.hasAccount) {
                const userCredential =  await firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                // if (!userCredential.user.emailVerified) {
                //     deleteUser(userCredential.user)
                // }
                setUserIsLoading(false);
            } else {
                const userCredential = await firebase.auth().createUserWithEmailAndPassword(user.email, pass)
                // await userCredential.user.sendEmailVerification(actionCode)
                // toast.success(<Notification>A Verification link has been sent to the registered email. Please check.</Notification>, {
                //     style: {
                //         backgroundColor : "#1CAC78"
                //     }
                // })
                // if (!userCredential.user.emailVerified) {
                //     deleteUser(userCredential.user)
                //     return
                // }    
                toast.success(<Notification>Account has been created successfully !</Notification>, {
                    style: {
                        backgroundColor : "#1CAC78"
                    }
                })
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
    const handleResetEmail = async () => {
        if (!email) {
            toast.warn(<Notification>Please enter your email!</Notification>, {
                style: {
                    backgroundColor: '#db504a',
                }
            })
        } else {
            try {
                setUserIsLoading(true)
                await firebase.auth().sendPasswordResetEmail(email, actionCode)
                toast.success(<Notification>A Reset link has been sent to the provided email!</Notification>, {
                    style: {
                        backgroundColor: "#1CAC78"
                    }
                })
                setUserIsLoading(false)
            } catch (err) {
                toast.warn(<Notification>{err.message}!</Notification>, {
                    style: {
                        backgroundColor: '#db504a',
                    }
                })
                setUserIsLoading(false)
            }
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
                <h1 className="text-center text-3xl font-extrabold">{forgetPass ? "Forgot password?" : "Sign in to your account"}</h1>
                {!forgetPass ? 
                <>
                    <p className="py-7 text-center px-3">{user.hasAccount ? "Don't have an account?" : "Already have an account?"}<span className="cursor-pointer pl-1.5 text-cyan text-base underline font-extrabold" onClick={() => setUser(prev => ({ ...prev, hasAccount: !prev.hasAccount}))} aria-label="button">{user.hasAccount ? "Sign Up" : "Sign In"}</span></p>
                    <div className="border relative flex flex-col rounded-lg overflow-hidden">
                        <input autoFocus onChange={(e) => {
                            setUser(prev => ({ ...prev, email: e.target.value}))
                        }} value={user.email} className="focus:outline-none   py-4 px-5 bg-white" type="email" name="email" placeholder="Email address" required />
                            <div className="relative w-full">{user.hasAccount ?
                                    <input
                                        onChange={(e) => { setUser(prev => ({ ...prev, password: e.target.value })) }}
                                        value={user.password}
                                        className="w-full focus:outline-none border-t py-4 px-5 bg-white"
                                        type={show ? "text" : "password"}
                                        name="password"
                                        placeholder="Password"
                                    required />
                                :
                                    <input
                                        type={show ? "text" : "password"}
                                        className="w-full focus:outline-none border-t py-4 px-5 bg-white"
                                        onChange={(e) => setPass( e.target.value)}
                                        value={pass}
                                        required
                                        placeholder="Create Password"
                                        name="create pass"
                                    />
                                } {show ? <FaEyeSlash onClick={() => setShow(false)} className="z-50 top-1/2 transform -translate-y-1/2 absolute bg-gray-100 h-full w-14 px-4 right-0 text-gray-400 cursor-pointer text-2xl" /> : <FaEye onClick={() => setShow(true)} className="z-50 top-1/2 transform -translate-y-1/2 absolute bg-gray-100 h-full w-14 px-4 right-0 text-gray-400 cursor-pointer text-2xl" />}</div>
                    </div>
                    {user.hasAccount && 
                        <span onClick={()=>setForgetPass(true)} className="pt-10 px-3 text-sm text-right text-cyan font-semibold cursor-pointer">Forgot your password?</span>}
                    <div className="md:static fixed mt-10 left-0 px-5 md:px-0 bottom-5 w-full">
                        <button type="submit" className="flex items-center justify-center w-full mb-4 btn-indigo"><span className="absolute grid place-items-center left-4"><Image src={lock} alt="Google" width={30} height={30} /></span>   {user.hasAccount ? "Sign In" : "Create Account"}</button>
                        <button type="button" onClick={handleGoogleSignIn} className="flex items-center justify-center  w-full plain-btn"><span className="grid place-items-center absolute left-4"><Image src={google} alt="Google" width={25} height={25} /> </span> Sign in with Google</button>
                    </div> 
                    </> :
                    <div className="w-full relative">
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-full mt-7 border border-gray-300 rounded-md focus:outline-none  py-4 px-5 bg-white" placeholder="Enter your Email" required autoFocus />
                        <div className="mt-7 flex space-x-3 w-full relative">
                            <button onClick={()=>setForgetPass(false)} className="plain-btn flex-grow">back</button>
                            <button onClick={handleResetEmail} className="btn-indigo flex-grow" type="reset" >Reset</button>
                        </div>
                    </div>
                    }
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
