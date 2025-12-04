import { Recycle } from "lucide-react";


const DashboardPage = () => {

    const currentUser = localStorage.getItem('currentUser');
    const user = currentUser ? JSON.parse(currentUser) : null;

    return (
        <div className="flex flex-col items-center bg-gray-800 justify-center h-screen">
            <div className="flex flex-col items-center bg-black/30 backdrop-blur-3xl border border-sky-300 rounded-md p-4">

                <div className='flex items-center mb-3 text-white justify-center gap-2'>
                    <Recycle size={45} />
                    <h2 className='text-5xl logo-text capitalize flex items-center gap-2 font-bold text-white  drop-shadow-lg'>
                        RECYKROUTE
                    </h2>
                </div>

                <p className="text-4xl text-white ">
                    Welcome Back
                </p>
                <p className="text-2xl text-sky-400 font-semibold">Name: {user ? `${user.firstName} ${user.secondName}` : 'Guest'}</p>
                <p className="text-2xl text-sky-400 font-semibold">Email: {user ? user.email : 'N/A'}</p>
                <p className="text-2xl text-sky-400 font-semibold">Phone: {user ? user.phoneNumber : 'N/A'}</p>
                <p className="text-2xl text-sky-400 font-semibold">Ward: {user ? user.ward : 'N/A'}</p>

            </div>

        </div>
    )
}

export default DashboardPage