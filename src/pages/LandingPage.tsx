
import { useNavigate } from 'react-router-dom'
import bg from '../assets/images/bg.jpg'

const LandingPage = () => {

    const navigate = useNavigate();

    return (
        <div className='flex flex-col items-center p-2 justify-center h-screen w-full'
            style={{
                backgroundImage: `url(${bg})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
            }}
        >

            <div className='bg-black/30 p-10 backdrop-blur-3xl rounded-lg shadow-lg'>
                <h1 className='text-4xl text-white font-bold mb-4 text-center'>
                    Welcome to <span className='text-sky-500 logo-text font-semibold capitalize'>
                        RECYKROUTE
                    </span> 
                </h1>
                <p className='text-lg mb-6 text-gray-200 text-center'>Your ultimate recycling route planner</p>

                <div className='flex items-center justify-center  space-x-4'>

                    <button onClick={() => navigate('/login')} className='bg-[#0277c7] text-white px-8 py-2 cursor-pointer rounded hover:bg-sky-500 transition'>
                        Get Started
                    </button>

                </div>

            </div>
        </div>
    )
}

export default LandingPage