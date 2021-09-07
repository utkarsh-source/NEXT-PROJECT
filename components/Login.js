import Image from "next/image";
import logo from '../assets/logo-cyan.svg';
import google from '../assets/search.png';
import lock from '../assets/lock.png';
import firebase from 'firebase'
import { useState } from "react";
import FullPageLoader from '../components/FullPageLoader'
import {FaEye, FaEyeSlash} from 'react-icons/fa'

function Login() {

    const [usingGoogle, setUsingGoogle] = useState(false)

    const [isLoading, setIsLoading] = useState(false)

    const [show, setShow] = useState(false)

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        hasAccount: false,
        emailError: "",
        passError: "",
        remember : false,
    })

    

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!usingGoogle) {
            if (user.hasAccount) {
                setIsLoading(true)
                firebase
                    .auth()
                    .signInWithEmailAndPassword(user.email, user.password)
                    .then(res => {
                        setIsLoading(false);
                    })
                    .catch(err => {
                        setIsLoading(false);
                        console.log(err)
                        switch (err.code) {
                            case 'auth/invalid-email':
                            case 'auth/user-disabled':
                            case 'auth/user-not-found':
                                setUser(prev => ({ ...prev, emailError: err.message }))
                                break;
                            case 'auth/wrong-password':
                                setUser(prev => ({ ...prev, passError: err.message }))
                                break;
                        }
                    })
            } else {
                setIsLoading(true)
                firebase
                    .auth()
                    .createUserWithEmailAndPassword(user.email, user.password)
                    .then(res => {
                        firebase
                            .auth()
                            .signInWithEmailAndPassword(user.email, user.password)
                            .then(res => {
                                setIsLoading(false);
                            })
                    })
                    .catch(err => {
                        setIsLoading(false);
                        console.log(err)
                        switch (err.code) {
                            case 'auth/email-already-in-use':
                            case 'auth/invalid-email':
                            case 'auth/user-not-found':
                                setUser(prev => ({ ...prev, emailError: err.message }))
                                break;
                            case 'auth/weak-password':
                                setUser(prev => ({ ...prev, passError: err.message }))
                                break;
                        }
                    })
            }
        }
    }

    return (
        <div className="bg-gray-50 fixed w-screen h-screen top-0 left-0 bottom-0 right-0 flex items-center justify-center">
            <form  className="relative w-5/12" onSubmit={handleFormSubmit}>
                <figure className="w-max mx-auto mb-6">
                    <Image src={logo} alt="Workflow logo" width={65} height={65} />
                </figure>
                <h1 className="text-center text-3xl font-extrabold pb-10">Sign in to your account</h1>
                <div className="border-2 relative flex flex-col rounded-lg overflow-hidden">
                    <input onChange={(e) => setUser(prev => ({ ...prev, email: e.target.value, passError: "", emailError: "" }))} value={user.email} className="focus:outline-none   py-4 px-5 bg-white" type="email" name="email" placeholder="Email address" required />
                    <div className="relative w-full"><input onChange={(e) => setUser(prev => ({ ...prev, password: e.target.value, passError: "", emailError: "" }))} value={user.password} className="w-full focus:outline-none border-t-2 py-4 px-5 bg-white" type={show ? "text" : "password"} name="password" placeholder={user.hasAccount ? "Password" : "Create Password"} required />{show ? <FaEyeSlash onClick={() => setShow(false)} className="z-50 top-1/2 transform -translate-y-1/2 absolute right-4 text-gray-400 cursor-pointer text-2xl"/> : <FaEye onClick={() => setShow(true)} className="z-50 top-1/2 transform -translate-y-1/2 absolute right-4 text-gray-400 cursor-pointer text-2xl" />}</div>
                    
                </div>
                {user.emailError != "" && <p className="mt-4 rounded-lg bg-red-100 px-3 text-sm text-red-700 font-semibold py-3">{user.emailError}</p>}
                {user.passError != "" && <p className="mt-4 rounded-lg bg-red-100 px-3 text-sm text-red-700 font-semibold py-3">{user.passError}</p>}
                {user.hasAccount && <div className="px-3 flex items-center justify-between py-4">
                    <p><input onChange={(e) => setUser(prev => ({ ...prev, remember: e.target.checked }))} value={user.remember} className="transform scale-125 mr-3" type="checkbox" name="checkbox" />Remember me</p>
                    <span className="text-sm text-cyan font-semibold cursor-pointer">Forgot your password?</span>
                </div>}
                <p className="py-7 text-right px-3">{user.hasAccount ? "Don't have an account?" : "Already have an account?" }<span className="cursor-pointer pl-1.5 text-cyan text-base underline font-extrabold" onClick={()=>setUser(prev=> ({...prev, hasAccount : !prev.hasAccount, passError : "", emailError : ""}))} aria-label="button">{user.hasAccount ? "Create" : "Sign In"}</span></p>
                <button type="submit" onClick={()=> setUsingGoogle(false)} className="flex items-center justify-center w-full mb-3 btn-indigo"><span className="absolute grid place-items-center left-4"><Image src={lock} alt="Google" width={25} height={25} /></span>   {user.hasAccount ? "Sign In" : "Create Account"}</button>
                <button type="submit" onClick={()=> setUsingGoogle(true)} className="flex items-center justify-center  w-full plain-btn"><span className="grid place-items-center absolute left-4"><Image src={google} alt="Google" width={25} height={25} /> </span> Sign in with Google</button>
            </form>
            {isLoading && <FullPageLoader/>}
        </div>
    )
}

export default Login
