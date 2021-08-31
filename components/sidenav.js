import { sidenavData } from "../helpers/sidenavData"
import logo from '../assets/logo.svg'
import profile from '../assets/avatar2.png'
import Image from 'next/image'



function Sidenav() {
    return (
            <div className="relative w-64 flex-shrink-0 min-h-screen px-3 py-6 bg-indigo-600">
                <div className="mb-3 flex items-center pl-2 py-0.5">
                    <figure aria-label="logo" className="mr-3 relative w-9">
                        <Image layout="responsive" objectFit="cover" src={logo} alt="Workflow"/>
                    </figure>
                    <h2 className="align-middle font-semibold text-2xl text-white">easywire</h2>
                </div>
                <ul className="flex flex-col">
                        {sidenavData.map((nav, index) => {
                            return (
                                <>
                                    <li key={index} className="text-md font-medium my-1 px-3 cursor-pointer hover:bg-gray-900 hover:bg-opacity-30 rounded-md flex items-center text-white list-none py-2"><nav.icon className="text-white text-xl mr-5" /> {nav.text}</li>
                                    {index === 5 && <hr className="my-3.5 border-t-2 border-gray-300"/> }
                                </>
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
