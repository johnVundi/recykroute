import { Recycle } from "lucide-react";
import { Logout } from "../components/auth/Logout";


const DashboardPage = () => {

    const currentUser = localStorage.getItem('currentUser');
    const user = currentUser ? JSON.parse(currentUser) : null;

    return (
        <div className="flex flex-col items-center bg-gray-800 justify-center h-screen">
            <div className="flex flex-col items-center bg-black/30 backdrop-blur-3xl border border-sky-300 rounded-md p-4">

                <div className='flex  items-center mb-3 text-white justify-center gap-2'>
                    <Recycle size={45} />
                    <h2 className='text-5xl logo-text capitalize flex items-center gap-2 font-bold text-white  drop-shadow-lg'>
                        RECYKROUTE
                    </h2>

                </div>
                <p className="text-lg mb-3 text-gray-500 ">
                    Welcome Back
                </p>
                <div className="flex flex-col items-start gap-3">

                    <p className="text-2xl text-white font-semibold">
                        Name: {user ? `${user.firstName} ${user.secondName}` : 'Guest'}
                    </p>
                    <p className="text-2xl text-white font-semibold">
                        Email: {user ? user.email : 'N/A'}</p>
                    <p className="text-2xl text-white font-semibold">
                        Phone: {user ? user.phoneNumber : 'N/A'}
                    </p>
                    <p className="text-2xl text-white font-semibold">
                        Ward: {user ? user.ward : 'N/A'}
                    </p>
                </div>

                <Logout />
            </div>



        </div>
    )
}

export default DashboardPage