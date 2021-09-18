import Image from "next/image";
import logo from '../assets/logo-cyan.svg';
import google from '../assets/search.png';
import lock from '../assets/lock.png';
import firebase from 'firebase'
import { useContext, useState } from "react";
import {FaEye, FaEyeSlash} from 'react-icons/fa'
import { client } from "../utils/apolloClient";
import { USER_BY_EMAIL_ID } from "../utils/gqlQuery";
import {AuthAction, useAuthUser, withAuthUser} from "next-firebase-auth";
import { ContextProvider } from "../utils/context";
import { toast } from "react-toastify";
import Notification from './Notification'
import { useRouter } from "next/router";


toast.configure()

function Login() {

    const {setUserIsLoading} = useContext(ContextProvider)

    const [show, setShow] = useState(false)

    const AuthUser = useAuthUser()

    const router = useRouter()

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        hasAccount: true,
        remember: false,
    })
    
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (user.hasAccount) {
                try {
                    setUserIsLoading(true)
                    const res = await client.query({
                        query: USER_BY_EMAIL_ID,
                        variables: {
                            email : user.email
                        }
                    })
                    if (!res.data.current_user_by_pk) {
                        setUserIsLoading(false)
                        toast.warn(<Notification>Provided user email does not match any user in our database!</Notification>, {
                            style: {
                                backgroundColor: '#db504a',
                            }
                        })
                        return
                    } else {
                        firebase
                        .auth()
                        .signInWithEmailAndPassword(user.email, user.password)
                            .then(res => {
                            // router.push('/dashboard')
                            setUserIsLoading(false);
                        })
                        .catch(err => {
                            setUserIsLoading(false);
                            switch (err.code) {
                                case 'auth/invalid-email':
                                case 'auth/user-disabled':
                                    toast.warn(<Notification>{err.message}!</Notification>, {
                                        style: {
                                            backgroundColor: '#db504a',
                                        }
                                    })
                                    break;
                                case 'auth/user-not-found':
                                    toast.warn(<Notification>There is no such user, try creating an account first!!</Notification>, {
                                        style: {
                                            backgroundColor: '#db504a',
                                        }
                                    })
                                    break;
                                case 'auth/wrong-password':
                                    toast.warn(<Notification>{err.message}!</Notification>, {
                                        style: {
                                            backgroundColor: '#db504a',
                                        }
                                    })
                                    break;
                            }
                        })
                    }
                } catch (err) {
                    console.log(err)
                    setUserIsLoading(false)
                    return
                }               
            } else {
                setUserIsLoading(true)
                firebase
                    .auth()
                    .createUserWithEmailAndPassword(user.email, user.password)
                    .then(res => {
                        toast.warn(<Notification>Account created successfully!</Notification>, {
                                    style: {
                                        backgroundColor: '#db504a',
                                    }
                                })
                        // router.push('/dashboard')
                    })
                    .catch(err => {
                        setUserIsLoading(false);
                        switch (err.code) {
                            case 'auth/email-already-in-use':
                            case 'auth/invalid-email':
                            case 'auth/user-not-found':
                                toast.warn(<Notification>{err.message}!</Notification>, {
                                    style: {
                                        backgroundColor: '#db504a',
                                    }
                                })
                                break;
                            case 'auth/weak-password':
                                toast.warn(<Notification>{err.message}!</Notification>, {
                                    style: {
                                        backgroundColor: '#db504a',
                                    }
                                })
                                break;
                        }
                    })
            }
    }

    const handleGoogleSignIn = async () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        try {
            setUserIsLoading(true)
            const res = await firebase.auth().signInWithPopup(provider)
            const {data} = await client.query({
                    query: USER_BY_EMAIL_ID,
                    variables: {
                        email: res.user.email
                    }
            })
            if (!data.current_user_by_pk) {
                        firebase.auth().signOut()
                        setUserIsLoading(false);
                        toast.warn(<Notification>Provided user email does not match any user in our database!</Notification>, {
                            style: {
                                backgroundColor: '#db504a',
                            }
                        })
                    } else {
                        setUserIsLoading(false)
            }
            
        } catch(err){
            console.log(err);
            setUserIsLoading(false);
        }
    }      

    return (
        <div className="bg-gray-50 fixed py-5 w-screen top-0 left-0 bottom-0 right-0 flex md:items-center justify-center">
            <form  className="flex flex-col relative w-11/12 md:w-8/12 lg:w-5/12" onSubmit={handleFormSubmit}>
                <figure className="w-max mx-auto mb-6">
                    <Image src={logo} alt="Workflow logo" width={65} height={65} />
                </figure>
                <h1 className="text-center text-3xl font-extrabold pb-10">Sign in to your account</h1>
                <div className="border relative flex flex-col rounded-lg overflow-hidden">
                    <input onChange={(e) => {
                        setUser(prev => ({ ...prev, email: e.target.value}))
                    }} value={user.email} className="focus:outline-none   py-4 px-5 bg-white" type="email" name="email" placeholder="Email address" required />
                    <div className="relative w-full"><input onChange={(e) => {
                        setUser(prev => ({ ...prev, password: e.target.value}))
                    }} value={user.password} className="w-full focus:outline-none
                    border-t py-4 px-5 bg-white" type={show ? "text" : "password"} name="password" placeholder={user.hasAccount ? "Password" : "Create Password"} required />{show ? <FaEyeSlash onClick={() => setShow(false)} className="z-50 top-1/2 transform -translate-y-1/2 absolute right-4 text-gray-400 cursor-pointer text-2xl" /> : <FaEye onClick={() => setShow(true)} className="z-50 top-1/2 transform -translate-y-1/2 absolute right-4 text-gray-400 cursor-pointer text-2xl" />}</div>
                    
                </div>
                {user.hasAccount && <div className="px-3 flex items-center justify-between py-4">
                    <p className="flex items-center"><input onChange={(e) => setUser(prev => ({ ...prev, remember: e.target.checked }))} value={user.remember} className="transform scale-125 mr-3" type="checkbox" name="checkbox" />Remember me</p>
                    <span className="text-sm text-cyan font-semibold cursor-pointer">Forgot your password?</span>
                </div>}
                <p className="py-7 text-right px-3">{user.hasAccount ? "Don't have an account?" : "Already have an account?"}<span className="cursor-pointer pl-1.5 text-cyan text-base underline font-extrabold" onClick={() => setUser(prev => ({ ...prev, hasAccount: !prev.hasAccount, passError: "", emailError: "" }))} aria-label="button">{user.hasAccount ? "Create" : "Sign In"}</span></p>
                <div className="md:static fixed left-0 px-5 md:px-0 bottom-5 w-full">
                    <button type="submit" className="flex items-center justify-center w-full mb-4 btn-indigo"><span className="absolute grid place-items-center left-4"><Image src={lock} alt="Google" width={30} height={30} /></span>   {user.hasAccount ? "Sign In" : "Create Account"}</button>
                    <button type="button" onClick={handleGoogleSignIn} className="flex items-center justify-center  w-full plain-btn"><span className="grid place-items-center absolute left-4"><Image src={google} alt="Google" width={25} height={25} /> </span> Sign in with Google</button>
                </div>
            </form>
        </div>
    )
}

export default withAuthUser({
    whenAuthed: AuthAction.REDIRECT_TO_APP,
    appPageURL : '/dashboard'
})(Login)
