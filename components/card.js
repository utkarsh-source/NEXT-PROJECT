
function Card(props) {
    return (
        <div className="border-2 flex-grow w-80 shadow-sm border-gray-600 border-opacity-10 rounded-md">
            <div className="flex items-center px-3 py-6">
                <props.icon className="text-2xl text-gray-600 text-opacity-60 hover:text-cyan mr-6"/>
                <div className="">
                    <p className="text-base text-gray-600 text-opacity-80 pb-1">{props.title}</p>
                    <p className="text-xl text-gray-800 font-semibold" >{props.amount}</p>
                </div>
            </div>
            <button className="text-left font-semibold px-3.5 py-3 rounded-sm text-cyan text-sm w-full bg-gray-400 bg-opacity-5">View all</button>
        </div>
    )
}

export default Card
