import { useState } from 'react'
import { Recycle, Truck, ArrowRight, Home } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const UserTypeSelection = () => {
    const navigate = useNavigate()
    const [selectedType, setSelectedType] = useState<string>('')

    const userTypes = [
        {
            value: 'waste-generator',
            title: 'Waste Generator',
            description: 'Landlords, Hostels, Households, Businesses',
            icon: Home,
            color: 'sky',
            route: '/onboarding/waste-generator'
        },
        {
            value: 'aggregator',
            title: 'Aggregator / Collector',
            description: 'Youth Groups, Waste Collectors',
            icon: Truck,
            color: 'green',
            route: '/onboarding/aggregator'
        }
    ]

    const handleContinue = () => {
        if (!selectedType) return
        const selectedUserType = userTypes.find(type => type.value === selectedType)
        if (selectedUserType) {
            navigate(selectedUserType.route)
        }
    }

    return (
        <div className='min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4'>
            <div className='w-full max-w-4xl'>
                {/* Header */}
                <div className='text-center mb-12'>
                    <div className='flex items-center justify-center gap-3 mb-4'>
                        <Recycle className='w-12 h-12 text-sky-400' />
                        <h1 className='text-5xl font-bold text-white'>RECYKROUTE</h1>
                    </div>
                    <h2 className='text-3xl font-bold text-white mb-3'>Welcome! 👋</h2>
                    <p className='text-gray-400 text-lg'>
                        Let's get you set up. What describes you best?
                    </p>
                </div>

                {/* User Type Cards */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
                    {userTypes.map((type) => {
                        const Icon = type.icon
                        const isSelected = selectedType === type.value

                        return (
                            <button
                                key={type.value}
                                onClick={() => setSelectedType(type.value)}
                                className={`p-8 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${isSelected
                                        ? type.color === 'sky'
                                            ? 'border-sky-400 bg-sky-400/10 shadow-lg shadow-sky-500/20'
                                            : 'border-green-400 bg-green-400/10 shadow-lg shadow-green-500/20'
                                        : 'border-gray-600 bg-gray-800/50 hover:border-gray-500'
                                    }`}
                            >
                                <div className='text-center'>
                                    <div className='flex justify-center mb-4'>
                                        <div className={`p-4 rounded-full ${isSelected
                                                ? type.color === 'sky'
                                                    ? 'bg-sky-400/20'
                                                    : 'bg-green-400/20'
                                                : 'bg-gray-700'
                                            }`}>
                                            <Icon className={`w-12 h-12 ${isSelected
                                                    ? type.color === 'sky'
                                                        ? 'text-sky-400'
                                                        : 'text-green-400'
                                                    : 'text-gray-400'
                                                }`} />
                                        </div>
                                    </div>

                                    <h3 className='text-2xl font-bold text-white mb-2'>{type.title}</h3>
                                    <p className='text-gray-400'>{type.description}</p>

                                    {isSelected && (
                                        <div className='mt-4 flex items-center justify-center gap-2 text-sm font-semibold'>
                                            <span className={type.color === 'sky' ? 'text-sky-400' : 'text-green-400'}>
                                                Selected
                                            </span>
                                            <div className={`w-2 h-2 rounded-full ${type.color === 'sky' ? 'bg-sky-400' : 'bg-green-400'
                                                }`} />
                                        </div>
                                    )}
                                </div>
                            </button>
                        )
                    })}
                </div>

                {/* Continue Button */}
                <div className='flex justify-center'>
                    <button
                        onClick={handleContinue}
                        disabled={!selectedType}
                        className='px-8 py-4 bg-sky-500 text-white rounded-xl font-bold text-lg hover:bg-sky-600 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-3 shadow-lg disabled:shadow-none'
                    >
                        Continue to Onboarding
                        <ArrowRight className='w-6 h-6' />
                    </button>
                </div>

                {/* Footer Note */}
                <div className='mt-8 text-center'>
                    <p className='text-gray-500 text-sm'>
                        You can always update your preferences later in settings
                    </p>
                </div>
            </div>
        </div>
    )
}

export default UserTypeSelection
