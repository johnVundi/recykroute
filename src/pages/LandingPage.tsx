import { useNavigate } from 'react-router-dom'
import bg from '../assets/images/trash.jpg'
import { useState } from 'react';
import GettingReady from '../components/GettingReady';

const LandingPage = () => {
    const navigate = useNavigate();
    const [showLoading, setShowLoading] = useState(false);
    const [userType, setUserType] = useState<'generator' | 'aggregator' | 'recycler' | 'county-official' | null>(null);

    const handleGeneratorPath = () => {
        setUserType('generator');
        setShowLoading(true);
    };

    const handleAggregatorPath = () => {
        setUserType('aggregator');
        setShowLoading(true);
    };

    const handleRecyclerPath = () => {
        setUserType('recycler');
        setShowLoading(true);
    };

    const handleCountyOfficialPath = () => {
        setUserType('county-official');
        setShowLoading(true);
    };

    const handleLoadingComplete = () => {
        if (userType === 'generator') {
            navigate('/onboarding/waste-generator');
        } else if (userType === 'aggregator') {
            navigate('/onboarding/aggregator');
        } else if (userType === 'recycler') {
            navigate('/onboarding/recycler');
        } else if (userType === 'county-official') {
            navigate('/onboarding/county-official');
        }
    };

    if (showLoading && userType) {
        return <GettingReady onComplete={handleLoadingComplete} userType={userType} />;
    }

    const roleCards = [
        {
            title: 'Waste Generator',
            // icon: '♻️',
            description: 'Manage your waste collection',
            onClick: handleGeneratorPath,
            linear: 'from-cyan-500 to-blue-600',
            hoverlinear: 'hover:from-cyan-400 hover:to-blue-500'
        },
        {
            title: 'Aggregator',
            // icon: '👥',
            description: 'Coordinate collection routes',
            onClick: handleAggregatorPath,
            linear: 'from-blue-500 to-indigo-600',
            hoverlinear: 'hover:from-blue-400 hover:to-indigo-500'
        },
        {
            title: 'Recycler',
            // icon: '🏭',
            description: 'Process recycled materials',
            onClick: handleRecyclerPath,
            linear: 'from-emerald-500 to-teal-600',
            hoverlinear: 'hover:from-emerald-400 hover:to-teal-500'
        },
        {
            title: 'County Official',
            // icon: '🛡️',
            description: 'Monitor & oversee operations',
            onClick: handleCountyOfficialPath,
            linear: 'from-violet-500 to-purple-600',
            hoverlinear: 'hover:from-violet-400 hover:to-purple-500'
        }
    ];

    return (
        <div className='relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden'
            style={{
                backgroundImage: `url(${bg})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
            }}
        >
            {/* Overlay with linear */}
            <div className='absolute inset-0 bg-linear-to-br from-black/60 via-black/50 to-black/60'></div>

            {/* Animated background elements */}
            <div className='absolute inset-0 overflow-hidden pointer-events-none'>
                <div className='absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse'></div>
                <div className='absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse' style={{ animationDelay: '1s' }}></div>
            </div>

            <div className='relative z-10 w-full max-w-6xl px-4 py-8'>
                {/* Header */}
                <div className='text-center mb-12 animate-fade-in'>
                    <div className='inline-block mb-4'>
                        <div className='flex items-center justify-center space-x-3'>
                            <span className='text-5xl'>♻️</span>
                            <h1 className='text-5xl md:text-7xl font-bold'>
                                <span className='bg-linear-to-r logo-text from-cyan-400 via-sky-600 to-blue-500 bg-clip-text text-transparent'>
                                    RECYKROUTE
                                </span>
                            </h1>
                        </div>
                    </div>
                    <p className='text-xl md:text-3xl text-gray-200 font-light mb-3'>
                        Your Ultimate Recycling Route Planner
                    </p>
                    <div className='flex items-center justify-center space-x-2'>
                        <div className='h-px w-12 bg-linear-to-r from-transparent to-sky-400' />
                        <p className='text-sky-400 text-md uppercase tracking-widest'>Smart • Efficient • Sustainable</p>
                        <div className='h-px w-12 bg-linear-to-l from-transparent to-sky-400' />
                    </div>
                </div>

                {/* Main Card */}
                <div className='flex flex-col w-full items-center justify-center'>
                    <div className='bg-white/10 backdrop-blur-md max-w-3xl w-full rounded-lg shadow-2xl border border-white/20 p-8 md:p-12 animate-slide-up'>
                        <p className='text-white text-xl md:text-2xl mb-8 text-center font-light'>
                            Select your role to begin your journey
                        </p>

                        {/* Role Cards Grid */}
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mb-8'>
                            {roleCards.map((role, index) => (
                                <button
                                    key={role.title}
                                    onClick={role.onClick}
                                    className='group relative cursor-pointer overflow-hidden bg-white/5 backdrop-blur-sm hover:bg-white/10 border border-white/10 hover:border-white/30 rounded-lg p-4 transition-all duration-300 hover:scale-105 hover:shadow-2xl'
                                >
                                    {/* linear overlay on hover */}
                                    <div className={`absolute inset-0 bg-linear-to-br ${role.linear} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

                                    <div className='relative z-10 flex items-start space-x-4'>
                                        {/* <div className={`shrink-0 w-14 h-14 rounded-xl bg-linear-to-br ${role.linear} ${role.hoverlinear} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        <span className='text-2xl'>{role.icon}</span>
                                    </div> */}
                                        <div className='flex-1 text-left'>
                                            <h3 className='text-xl font-semibold text-white mb-1 group-hover:text-cyan-300 transition-colors'>
                                                {role.title}
                                            </h3>
                                            <p className='text-sm text-gray-300 group-hover:text-gray-200 transition-colors'>
                                                {role.description}
                                            </p>
                                        </div>
                                        <svg className='w-6 h-6 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all duration-300' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                                        </svg>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className='text-center pt-6 border-t border-white/10'>
                            <p className='text-gray-300 text-sm md:text-base'>
                                Let's make recycling easier together! For assistance, contact us at{' '}
                                <a href='mailto:support@recykroute.com' className='text-cyan-400 hover:text-cyan-300 transition-colors underline decoration-cyan-400/50 hover:decoration-cyan-300'>
                                    support@recykroute.com
                                </a>
                            </p>
                        </div>
                    </div>
                </div>

            </div>

            <style>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes slide-up {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fade-in {
                    animation: fade-in 0.8s ease-out;
                }

                .animate-slide-up {
                    animation: slide-up 0.8s ease-out 0.2s backwards;
                }
            `}</style>
        </div>
    )
}

export default LandingPage