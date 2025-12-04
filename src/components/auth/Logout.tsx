import { useState } from "react";
import { useNavigate } from "react-router-dom";


export const Logout = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLogout = () => {
        setLoading(true);
        setTimeout(() => {
            localStorage.removeItem('currentUser');
            navigate('/login');
            // window.location.reload();
        }, 3000);

    };

    return (
        <button onClick={handleLogout} className="mt-6 w-full py-3 cursor-pointer bg-red-400 hover:bg-red-500 text-white rounded-md transition-colors duration-200">
            {loading ?
                <>
                    <div className="flex items-center justify-center gap-2">
                        <svg className='animate-spin h-5 w-5' viewBox='0 0 24 24'>
                            <circle
                                className='opacity-25'
                                cx='12'
                                cy='12'
                                r='10'
                                stroke='currentColor'
                                strokeWidth='4'
                                fill='none'
                            />
                            <path
                                className='opacity-75'
                                fill='currentColor'
                                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                            />
                        </svg>
                        <p>Logging Out</p>
                    </div>

                </> : 'Logout'

            }
        </button>
    );
};