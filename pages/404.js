import Link from "next/link"
import Image from 'next/image'
import duck from '../assets/duck.png'

function FourOFour() {
    return (
        <div className='z-50 flex items-center justify-center fixed top-0 left-0 h-full w-full bg-cyan'>
            <div className="flex flex-col">
                <figure className="text-center mb-10">
                    <Image src={duck} alt="Duck" width={250} height={250}/>
                </figure>
                <h1 className="text-white font-bold text-3xl">Ops! Something went wrong.</h1>
                <Link href="/"><a className="mt-8 plain-btn w-max self-center">Take me Home</a></Link>
            </div>
        </div>
    )
}

export default FourOFour
