
function Card(props) {
    return (
        <div className="border-2 flex-grow w-80 hover:shadow-md transition-shadow shadow-sm border-gray-800 border-opacity-10 rounded-md">
            <div className="flex items-center px-3 py-6">
                <props.icon className="text-2xl mr-5 text-gray-600 text-opacity-40"/>
                <div className="">
                    <p className="text-base text-gray-600 text-opacity-60 pb-1">{props.title}</p>
                    <p className="text-xl text-gray-800 font-semibold" >{props.amount}</p>
                </div>
            </div>
            <button className="text-left font-semibold px-3.5 py-3 rounded-sm text-indigo-600 text-sm w-full bg-gray-600 bg-opacity-5">View all</button>
        </div>
    )
}

export default Card
