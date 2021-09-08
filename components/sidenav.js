import { sidenavData } from "../helpers/sidenavData"
import logo from '../assets/logo.svg'
import profile from '../assets/avatar2.png'
import Image from 'next/image'
import React, { useContext } from "react"
import Link from 'next/link'
import { ContextProvider } from "../utils/context"

function Sidenav() {

    const {toggleNav } = useContext(ContextProvider)

    return (
        <div className={`bg-cyan ${toggleNav ? "-ml-0" : "-ml-64" } md:ml-0 relative w-64 flex-shrink-0 min-h-screen px-3 py-6 `}>
                <div className=" mb-3 flex items-center pl-2 py-0.5">
                    <figure aria-label="logo" className="mr-3 relative w-9">
                        <Image layout="responsive" objectFit="cover" src={logo} alt="Workflow"/>
                    </figure>
                    <h2 className="align-middle font-semibold text-2xl text-white">easywire</h2>
                </div>
                <ul className="flex flex-col">
                        {sidenavData.map((nav, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <li className="text-md font-medium my-1  cursor-pointer hover:bg-gray-900 hover:bg-opacity-30 rounded-md  text-white list-none"><Link href={index ===0 ? "/dashboard" : '/dashboard/'+nav.text.toLowerCase()}><a className="flex items-center w-full px-3 py-2" ><nav.icon className="text-white text-xl mr-5" />{nav.text}</a></Link></li>
                                    {index === 5 && <hr className="my-3.5 border-t-2 border-gray-300"/> }
                                </React.Fragment>
                            )
                        })}
                </ul>
                <hr className="my-3.5 border-t-2 border-gray-300"/>
                <div className="absolute bottom-0 flex items-center py-3">
                    <figure aria-label="logo" className="mr-4 relative w-10">
                        <Image layout="responsive" objectFit="cover" src={profile} alt="Workflow"/>
                    </figure>
                    <div>
                        <h1 className="text-sm text-white font-semibold pb-0.5">Emilia Birch</h1>
                        <p className="text-sm text-white">Duke street studio</p>
                    </div>
                </div>
            </div>
    )
}

export default Sidenav
