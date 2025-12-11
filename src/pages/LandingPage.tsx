
import { useNavigate } from 'react-router-dom'
import bg from '../assets/images/bg.jpg'
import { useState } from 'react';

const LandingPage = () => {

    const navigate = useNavigate();
    const [aggregatorPath, setAggregatorPath] = useState(false);
    const [generatorPath, setGeneratorPath] = useState(false);

    const handleGeneratorPath = () => {
        setGeneratorPath(true);
        navigate('/onboarding/waste-generator');
    };

    const handleAggregatorPath = () => {
        setAggregatorPath(true);
        navigate('/onboarding/aggregator');
    };

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

                <p className='text-white mb-4 text-center'>
                    Please select your role to continue:
                </p>
                <div className='flex  items-center justify-center gap-6 mt-4'>

                    <button onClick={handleGeneratorPath} className='bg-[#0277c7] text-white px-8 py-2 cursor-pointer rounded hover:bg-sky-500 transition'>
                        A Waste Generator
                    </button>
                    <button onClick={handleAggregatorPath} className='bg-[#0277c7] text-white px-8 py-2 cursor-pointer rounded hover:bg-sky-500 transition'>
                        An Aggregator
                    </button>

                </div>

            </div>
        </div>
    )
}

export default LandingPage