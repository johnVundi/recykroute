import { useState } from 'react'
import { Home, Building2, Hotel, Briefcase, MoreHorizontal, MapPin, Package, Calendar, Recycle, CheckCircle2, ChevronRight, Popcorn } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import bg from '../../assets/images/bg.jpg'

interface OnboardingData {
    propertyType: string
    estateName: string
    housePlotNumber: string
    wasteVolume: string
    collectionFrequency: string
    sortingLevel: string
}

const WasteGeneratorOnboarding = () => {
    const navigate = useNavigate()
    const [step, setStep] = useState(1)
    const [isLoading, setIsLoading] = useState(false)

    const [formData, setFormData] = useState<OnboardingData>({
        propertyType: '',
        estateName: '',
        housePlotNumber: '',
        wasteVolume: '',
        collectionFrequency: '',
        sortingLevel: ''
    })

    const propertyTypes = [
        { value: 'household', label: 'Household', icon: Home },
        { value: 'apartment', label: 'Apartment Block', icon: Building2 },
        { value: 'hostel', label: 'Hostel / Student Residence', icon: Hotel },
        { value: 'business', label: 'Business Premises', icon: Briefcase },
        { value: 'other', label: 'Other', icon: MoreHorizontal }
    ]

    const wasteVolumes = [
        { value: 'low', label: 'Low', description: '1–2 bags per week' },
        { value: 'medium', label: 'Medium', description: '3–5 bags per week' },
        { value: 'high', label: 'High', description: '6+ bags per week' }
    ]

    const collectionFrequencies = [
        { value: 'on-demand', label: 'On-demand', description: 'Request when needed' },
        { value: 'daily', label: 'Daily', description: 'Every day' },
        { value: 'twice-weekly', label: 'Twice Weekly', description: 'Two times per week' },
        { value: 'weekly', label: 'Weekly', description: 'Once per week' }
    ]

    const sortingLevels = [
        { value: 'not-sorting', label: 'Not Sorting', description: 'All waste mixed together' },
        { value: 'basic', label: 'Basic Sorting', description: 'Some separation' },
        { value: 'fully-sorted', label: 'Fully Sorted', description: 'Complete separation' }
    ]

    const handleInputChange = (field: keyof OnboardingData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleNext = () => {
        // Validate current step
        if (step === 1 && !formData.propertyType) {
            toast.error('Please select a property type')
            return
        }
        if (step === 2 && (!formData.estateName || !formData.housePlotNumber)) {
            toast.error('Please fill in all building details')
            return
        }
        if (step === 3 && !formData.wasteVolume) {
            toast.error('Please select waste volume')
            return
        }
        if (step === 4 && !formData.collectionFrequency) {
            toast.error('Please select collection frequency')
            return
        }

        if (step < 5) {
            setStep(step + 1)
        }
    }

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1)
        }
    }

    const handleSubmit = () => {
        if (!formData.sortingLevel) {
            toast.error('Please select your waste sorting level')
            return
        }

        setIsLoading(true)

        // Simulate API call
        setTimeout(() => {
            // Store onboarding data in localStorage
            const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
            const updatedUser = {
                ...currentUser,
                onboardingComplete: true,
                onboardingData: formData
            }
            localStorage.setItem('currentUser', JSON.stringify(updatedUser))

            setIsLoading(false)
            toast.success('Onboarding completed successfully!')
            navigate('/dashboard')
        }, 1500)
    }

    const progressPercentage = (step / 5) * 100

    return (
        <div className='min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4'
            style={{
                backgroundImage: `url(${bg})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
            }}
        >
            <div className='w-full max-w-2xl bg-gray-800 rounded-lg shadow-2xl border border-gray-700 overflow-hidden'>
                {/* Header */}
                <div className='bg-linear-330-to-r from-sky-600 to-sky-400 p-6'>
                    <h1 className='md:text-3xl text-xl text-center font-bold text-white mb-2 flex items-center gap-2'>
                        <Recycle className='w-8 h-8 text-sky-400' />
                        Waste Generator Onboarding
                    </h1>
                    <p className='text-sky-50 text-center mt-4'>Help us allocate pickups correctly</p>

                    {/* Progress Bar */}
                    <div className='mt-4 bg-gray-500/30 rounded-full h-2 overflow-hidden'>
                        <div
                            className={` h-full 
                                ${progressPercentage === 20 ? 'bg-red-500'
                                    : progressPercentage === 40 ? 'bg-yellow-500'
                                        : progressPercentage === 60 ? 'bg-orange-500'
                                            : progressPercentage === 80 ? 'bg-[#0277c7]'
                                                : 'bg-emerald-500'} transition-all duration-300 ease-in-out`}
                            style={{ width: `${progressPercentage}%` }}
                        />
                    </div>
                    <div className='flex justify-between'>
                        <p className='text-sky-50 text-sm mt-2'>Step {step} of 5</p>
                        <p className='text-sky-50 text-sm mt-2'>{progressPercentage.toFixed(0)}%</p>
                    </div>

                </div>

                {/* Content */}
                <div className='p-8'>
                    {/* Step 1: Property Type */}
                    {step === 1 && (
                        <div className='space-y-6'>
                            <div>
                                <h2 className='text-2xl font-bold text-white mb-2 flex items-center gap-2'>
                                    <Home className='w-6 h-6 text-sky-400' />
                                    Property Type
                                </h2>
                                <p className='text-gray-400 mb-6'>What type of property do you have?</p>
                            </div>

                            <div className='grid grid-cols-2 md:grid-cols-2 gap-4'>
                                {propertyTypes.map((type) => {
                                    const Icon = type.icon
                                    return (
                                        <button
                                            key={type.value}
                                            onClick={() => handleInputChange('propertyType', type.value)}
                                            className={`md:p-4 p-2 rounded-lg cursor-pointer border-2 transition-all duration-200 
                                                ${formData.propertyType === type.value
                                                    ? 'border-sky-400 bg-sky-400/10'
                                                    : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
                                                }`}
                                        >
                                            <Icon className={`w-8 h-8 mb-3 ${formData.propertyType === type.value ? 'text-sky-400' : 'text-gray-400'
                                                }`} />
                                            <h3 className='text-white font-semibold text-lg'>{type.label}</h3>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    {/* Step 2: Building Details */}
                    {step === 2 && (
                        <div className='space-y-5'>
                            <div>
                                <h2 className='text-2xl font-bold text-white mb-2 flex items-center gap-2'>
                                    <MapPin className='w-6 h-6 text-sky-400' />
                                    Building / Plot Details
                                </h2>
                                <p className='text-gray-400 mb-6'>Where is your property located?</p>
                            </div>

                            <div className='space-y-4'>
                                <div>
                                    <label className='block text-sm font-medium text-gray-300 mb-2'>
                                        Estate or Building Name
                                    </label>
                                    <input
                                        type='text'
                                        value={formData.estateName}
                                        onChange={(e) => handleInputChange('estateName', e.target.value)}
                                        placeholder='e.g., Greenview Estate, Mwamba Apartments'
                                        className='w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent'
                                    />
                                </div>

                                <div>
                                    <label className='block text-sm font-medium text-gray-300 mb-2'>
                                        House / Door / Plot Number
                                    </label>
                                    <input
                                        type='text'
                                        value={formData.housePlotNumber}
                                        onChange={(e) => handleInputChange('housePlotNumber', e.target.value)}
                                        placeholder='e.g., A12, Plot 456, Door 3B'
                                        className='w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent'
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Waste Volume */}
                    {step === 3 && (
                        <div className='space-y-5'>
                            <div>
                                <h2 className='text-2xl font-bold text-white mb-2 flex items-center gap-2'>
                                    <Package className='w-6 h-6 text-sky-400' />
                                    Waste Volume
                                </h2>
                                <p className='text-gray-400 mb-6'>How much waste do you typically generate?</p>
                            </div>

                            <div className='space-y-3'>
                                {wasteVolumes.map((volume) => (
                                    <button
                                        key={volume.value}
                                        onClick={() => handleInputChange('wasteVolume', volume.value)}
                                        className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left ${formData.wasteVolume === volume.value
                                            ? 'border-sky-400 bg-sky-400/10'
                                            : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
                                            }`}
                                    >
                                        <div className='flex items-center cursor-pointer justify-between'>
                                            <div>
                                                <h3 className={`
                                                    ${volume.label === 'Low' ? 'text-yellow-500' : volume.label === 'Medium' ? 'text-green-500' : 'text-red-500'} font-semibold text-lg`}>{volume.label}</h3>
                                                <p className='text-white text-sm'>{volume.description}</p>
                                            </div>

                                            {formData.wasteVolume === volume.value && (
                                                <CheckCircle2 className='w-6 h-6 text-sky-400' />
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 4: Collection Frequency */}
                    {step === 4 && (
                        <div className='space-y-5'>
                            <div>
                                <h2 className='text-2xl font-bold text-white mb-2 flex items-center gap-2'>
                                    <Calendar className='w-6 h-6 text-sky-400' />
                                    Collection Frequency
                                </h2>
                                <p className='text-gray-400 mb-6'>How often would you like waste collected?</p>
                            </div>

                            <div className='space-y-3'>
                                {collectionFrequencies.map((frequency) => (
                                    <button
                                        key={frequency.value}
                                        onClick={() => handleInputChange('collectionFrequency', frequency.value)}
                                        className={`w-full p-4 rounded-lg cursor-pointer border-2 transition-all duration-200 text-left ${formData.collectionFrequency === frequency.value
                                            ? 'border-sky-400 bg-sky-400/10'
                                            : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
                                            }`}
                                    >
                                        <div className='flex items-center justify-between'>
                                            <div>
                                                <h3 className='text-white font-semibold text-lg'>{frequency.label}</h3>
                                                <p className='text-gray-400 text-sm'>{frequency.description}</p>
                                            </div>
                                            {formData.collectionFrequency === frequency.value && (
                                                <CheckCircle2 className='w-6 h-6 text-sky-400' />
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 5: Sorting Level */}
                    {step === 5 && (
                        <div className='space-y-5'>
                            <div>
                                <h2 className='text-2xl font-bold text-white mb-2 flex items-center gap-2'>
                                    <Recycle className='w-6 h-6 text-sky-400' />
                                    Waste Sorting Level
                                </h2>
                                <p className='text-gray-400 mb-6'>Do you sort your waste before collection?</p>
                            </div>

                            <div className='space-y-3'>
                                {sortingLevels.map((level) => (
                                    <button
                                        key={level.value}
                                        onClick={() => handleInputChange('sortingLevel', level.value)}
                                        className={`w-full p-4 rounded-lg cursor-pointer border-2 transition-all duration-200 text-left ${formData.sortingLevel === level.value
                                            ? 'border-sky-400 bg-sky-400/10'
                                            : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
                                            }`}
                                    >
                                        <div className='flex items-center justify-between'>
                                            <div>
                                                <h3 className='text-white font-semibold text-lg'>{level.label}</h3>
                                                <p className='text-gray-400 text-sm'>{level.description}</p>
                                            </div>
                                            {formData.sortingLevel === level.value && (
                                                <CheckCircle2 className='w-6 h-6 text-sky-400' />
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Navigation */}
                <div className='p-5 bg-gray-700/50 border-t border-gray-600 flex justify-between'>
                    <button
                        onClick={handleBack}
                        disabled={step === 1}
                        className='px-10 py-2.5 bg-gray-600 cursor-pointer text-white rounded-lg font-semibold
                         hover:bg-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        Back
                    </button>

                    {step < 5 ? (
                        <button
                            onClick={handleNext}
                            className='px-10 py-2.5 bg-sky-500 cursor-pointer text-white rounded-lg font-semibold
                             hover:bg-sky-600 transition-colors flex items-center gap-2'
                        >
                            Next
                            <ChevronRight className='w-5 h-5' />
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className='px-8 py-2 bg-green-700 cursor-pointer text-white rounded-lg font-semibold
                             hover:bg-green-800 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                            {isLoading ? (
                                <>
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
                                    Completing...
                                </>
                            ) : (
                                <>
                                    Complete
                                    <CheckCircle2 className='w-5 h-5' />
                                </>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default WasteGeneratorOnboarding
