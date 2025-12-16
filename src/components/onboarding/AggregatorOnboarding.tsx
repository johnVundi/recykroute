import { useState } from 'react'
import { Users, UsersRound, Truck, Package, DollarSign, CheckCircle2, ChevronRight, Recycle, ShoppingCart, Bike, Car } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import bg from '../../assets/images/tashes.jpg'

interface AggregatorOnboardingData {
    groupName: string
    idNumber: string
    teamSize: string
    equipment: string[]
    collectionCapacity: string
    wasteTypes: string[]
    useAlternatePayment: boolean
    alternatePaymentNumber: string
}

const AggregatorOnboarding = () => {
    const navigate = useNavigate()
    const [step, setStep] = useState(1)
    const [isLoading, setIsLoading] = useState(false)

    const [formData, setFormData] = useState<AggregatorOnboardingData>({
        groupName: '',
        idNumber: '',
        teamSize: '',
        equipment: [],
        collectionCapacity: '',
        wasteTypes: [],
        useAlternatePayment: false,
        alternatePaymentNumber: ''
    })

    const teamSizes = [
        { value: '1-2', label: '1–2 people', description: 'Solo or small team' },
        { value: '3-5', label: '3–5 people', description: 'Medium team' },
        { value: '6+', label: '6+ people', description: 'Large team' }
    ]

    const equipmentOptions = [
        { value: 'handcart', label: 'Handcart', icon: ShoppingCart },
        { value: 'bicycle', label: 'Bicycle', icon: Bike },
        { value: 'motorcycle', label: 'Motorcycle', icon: Bike },
        { value: 'tuktuk', label: 'Tuk Tuk', icon: Car },
        { value: 'pickup', label: 'Pickup', icon: Truck }
    ]

    const capacityOptions = [
        { value: 'light', label: 'Light', description: '1–5 households' },
        { value: 'moderate', label: 'Moderate', description: '6–15 households' },
        { value: 'heavy', label: 'Heavy', description: '16+ households' }
    ]

    const wasteTypeOptions = [
        { value: 'mixed', label: 'Mixed Waste', description: 'All types of waste' },
        { value: 'organic', label: 'Organic', description: 'Food and garden waste' },
        { value: 'recyclables', label: 'Recyclables Only', description: 'Plastic, paper, metal, glass' }
    ]

    const handleInputChange = (field: keyof AggregatorOnboardingData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const toggleEquipment = (equipment: string) => {
        setFormData(prev => ({
            ...prev,
            equipment: prev.equipment.includes(equipment)
                ? prev.equipment.filter(e => e !== equipment)
                : [...prev.equipment, equipment]
        }))
    }

    const toggleWasteType = (wasteType: string) => {
        setFormData(prev => ({
            ...prev,
            wasteTypes: prev.wasteTypes.includes(wasteType)
                ? prev.wasteTypes.filter(w => w !== wasteType)
                : [...prev.wasteTypes, wasteType]
        }))
    }

    const handleNext = () => {
        // Validate current step
        if (step === 1 && !formData.groupName) {
            toast.error('Please enter your group/business name')
            return
        }
        if (step === 2 && !formData.teamSize) {
            toast.error('Please select your team size')
            return
        }
        if (step === 3 && formData.equipment.length === 0) {
            toast.error('Please select at least one equipment type')
            return
        }
        if (step === 4 && !formData.collectionCapacity) {
            toast.error('Please select your collection capacity')
            return
        }
        if (step === 5 && formData.wasteTypes.length === 0) {
            toast.error('Please select at least one waste type')
            return
        }

        if (step < 6) {
            setStep(step + 1)
        }
    }

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1)
        }
    }

    const handleSubmit = () => {
        if (formData.useAlternatePayment && !formData.alternatePaymentNumber) {
            toast.error('Please enter alternate payment number')
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
                userType: 'aggregator',
                onboardingData: formData
            }
            localStorage.setItem('currentUser', JSON.stringify(updatedUser))

            setIsLoading(false)
            toast.success('Onboarding completed successfully!')
            navigate('/dashboard')
        }, 1500)
    }

    const progressPercentage = (step / 6) * 100

    return (
        <div className='min-h-screen flex items-center justify-center'
            style={{
                backgroundImage: `url(${bg})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
            }}>
            <div className=' bg-black/70 flex flex-col p-4 justify-center items-center min-h-screen w-full'>
                <div className='w-full max-w-2xl backdrop-blur-xl rounded-lg bg-gray-800 shadow-2xl border border-gray-700 overflow-hidden'>
                {/* Header */}
                <div className='bg-[#0277c7] p-4'>
                    <h1 className='text-3xl font-bold text-white mb-2 flex items-center gap-2'>
                        <Truck className='w-8 h-8' />
                        Aggregator Onboarding
                    </h1>
                    <p className='text-green-50'>Complete your operating profile</p>

                    {/* Progress Bar */}
                    <div className='mt-4 bg-gray-400/30 rounded-full h-2 overflow-hidden'>
                        <div
                            className={`h-full transition-all
                                ${progressPercentage <= 20 ? 'bg-red-500'
                                    : progressPercentage <= 40 ? 'bg-yellow-500'
                                        : progressPercentage <= 60 ? 'bg-orange-500'
                                            : progressPercentage <= 80 ? 'bg-sky-400'
                                                : 'bg-emerald-500'} duration-300 ease-in-out`}
                            style={{ width: `${progressPercentage}%` }}
                        />
                    </div>
                    <div className='flex justify-between'>
                        <p className='text-green-50 text-sm mt-2'>Step {step} of 6</p>
                        <p className='text-green-50 text-sm mt-2'>{progressPercentage.toFixed(0)}%</p>
                    </div>

                </div>

                {/* Content */}
                <div className='p-8'>
                    {/* Step 1: Group/Business Name & ID */}
                    {step === 1 && (
                        <div className='space-y-6'>
                            <div>
                                <h2 className='text-2xl font-bold text-white mb-2 flex items-center gap-2'>
                                    <Users className='w-6 h-6 text-green-400' />
                                    Business Details
                                </h2>
                                <p className='text-gray-400 mb-6'>Tell us about your operation</p>
                            </div>

                            <div className='space-y-4'>
                                <div>
                                    <label className='block text-sm font-medium text-gray-300 mb-2'>
                                        Group/Business Name <span className='text-red-400'>*</span>
                                    </label>
                                    <input
                                        type='text'
                                        value={formData.groupName}
                                        onChange={(e) => handleInputChange('groupName', e.target.value)}
                                        placeholder='e.g., Green Warriors Youth Group'
                                        className='w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent'
                                    />
                                </div>

                                <div>
                                    <label className='block text-sm font-medium text-gray-300 mb-2'>
                                        ID Number <span className='text-gray-500 text-xs'>(Optional but recommended)</span>
                                    </label>
                                    <input
                                        type='text'
                                        value={formData.idNumber}
                                        onChange={(e) => handleInputChange('idNumber', e.target.value)}
                                        placeholder='Enter your ID number'
                                        className='w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent'
                                    />
                                    <p className='text-gray-500 text-xs mt-1'>Helps build trust with customers</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Team Size */}
                    {step === 2 && (
                        <div className='space-y-6'>
                            <div>
                                <h2 className='text-2xl font-bold text-white mb-2 flex items-center gap-2'>
                                    <UsersRound className='w-6 h-6 text-green-400' />
                                    Team Size
                                </h2>
                                <p className='text-gray-400 mb-6'>How many people are in your team?</p>
                            </div>

                            <div className='space-y-3'>
                                {teamSizes.map((size) => (
                                    <button
                                        key={size.value}
                                        onClick={() => handleInputChange('teamSize', size.value)}
                                        className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${formData.teamSize === size.value
                                            ? 'border-green-400 bg-green-400/10'
                                            : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
                                            }`}
                                    >
                                        <div className='flex items-center justify-between'>
                                            <div>
                                                <h3 className='text-white font-semibold text-lg'>{size.label}</h3>
                                                <p className='text-gray-400 text-sm'>{size.description}</p>
                                            </div>
                                            {formData.teamSize === size.value && (
                                                <CheckCircle2 className='w-6 h-6 text-green-400' />
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 3: Available Equipment */}
                    {step === 3 && (
                        <div className='space-y-6'>
                            <div>
                                <h2 className='text-2xl font-bold text-white mb-2 flex items-center gap-2'>
                                    <Truck className='w-6 h-6 text-green-400' />
                                    Available Equipment
                                </h2>
                                <p className='text-gray-400 mb-6'>Select all equipment you have (multiple choice)</p>
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                {equipmentOptions.map((equip) => {
                                    const Icon = equip.icon
                                    const isSelected = formData.equipment.includes(equip.value)
                                    return (
                                        <button
                                            key={equip.value}
                                            onClick={() => toggleEquipment(equip.value)}
                                            className={`p-5 rounded-lg cursor-pointer border-2 transition-all duration-200 ${isSelected
                                                ? 'border-green-400 bg-green-400/10'
                                                : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
                                                }`}
                                        >
                                            <div className='flex items-center justify-between'>
                                                <div className='flex items-center gap-3'>
                                                    <Icon className={`w-6 h-6 ${isSelected ? 'text-green-400' : 'text-gray-400'
                                                        }`} />
                                                    <h3 className='text-white font-semibold'>{equip.label}</h3>
                                                </div>
                                                {isSelected && (
                                                    <CheckCircle2 className='w-5 h-5 text-green-400' />
                                                )}
                                            </div>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    {/* Step 4: Collection Capacity */}
                    {step === 4 && (
                        <div className='space-y-6'>
                            <div>
                                <h2 className='text-2xl font-bold text-white mb-2 flex items-center gap-2'>
                                    <Package className='w-6 h-6 text-green-400' />
                                    Daily Collection Capacity
                                </h2>
                                <p className='text-gray-400 mb-6'>How many households can you serve daily?</p>
                            </div>

                            <div className='space-y-3'>
                                {capacityOptions.map((capacity) => (
                                    <button
                                        key={capacity.value}
                                        onClick={() => handleInputChange('collectionCapacity', capacity.value)}
                                        className={`w-full p-4 rounded-lg cursor-pointer border-2 transition-all duration-200 text-left ${formData.collectionCapacity === capacity.value
                                            ? 'border-green-400 bg-green-400/10'
                                            : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
                                            }`}
                                    >
                                        <div className='flex items-center justify-between'>
                                            <div>
                                                <h3 className={`
                                                    ${capacity.label === 'Light' ? 'text-yellow-500' : capacity.label === 'Moderate' ? 'text-green-500' : 'text-red-500'} font-semibold text-lg`}>{capacity.label}</h3>
                                                <p className='text-gray-400 text-sm'>{capacity.description}</p>
                                            </div>
                                            {formData.collectionCapacity === capacity.value && (
                                                <CheckCircle2 className='w-6 h-6 text-green-400' />
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 5: Waste Types */}
                    {step === 5 && (
                        <div className='space-y-5'>
                            <div>
                                <h2 className='text-2xl font-bold text-white mb-2 flex items-center gap-2'>
                                    <Recycle className='w-6 h-6 text-green-400' />
                                    Waste Types Accepted
                                </h2>
                                <p className='text-gray-400 mb-6'>What types of waste do you collect? (multiple choice)</p>
                            </div>

                            <div className='space-y-3'>
                                {wasteTypeOptions.map((wasteType) => {
                                    const isSelected = formData.wasteTypes.includes(wasteType.value)
                                    return (
                                        <button
                                            key={wasteType.value}
                                            onClick={() => toggleWasteType(wasteType.value)}
                                            className={`w-full p-4 rounded-lg cursor-pointer border-2 transition-all duration-200 text-left ${isSelected
                                                ? 'border-green-400 bg-green-400/10'
                                                : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
                                                }`}
                                        >
                                            <div className='flex items-center justify-between'>
                                                <div>
                                                    <h3 className='text-white font-semibold text-lg'>{wasteType.label}</h3>
                                                    <p className='text-gray-400 text-sm'>{wasteType.description}</p>
                                                </div>
                                                {isSelected && (
                                                    <CheckCircle2 className='w-6 h-6 text-green-400' />
                                                )}
                                            </div>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    {/* Step 6: Payment Number */}
                    {step === 6 && (
                        <div className='space-y-6'>
                            <div>
                                <h2 className='text-2xl font-bold text-white mb-2 flex items-center gap-2'>
                                    <DollarSign className='w-6 h-6 text-green-400' />
                                    Payment Details
                                </h2>
                                <p className='text-gray-400 mb-6'>Where should we send your payments?</p>
                            </div>

                            <div className='space-y-4'>
                                <div className='p-4 bg-gray-700/50 rounded-lg border border-gray-600'>
                                    <p className='text-gray-300 text-sm mb-3'>
                                        By default, payments will be sent to the phone number you registered with.
                                    </p>

                                    <label className='flex items-center gap-3 cursor-pointer'>
                                        <input
                                            type='checkbox'
                                            checked={formData.useAlternatePayment}
                                            onChange={(e) => handleInputChange('useAlternatePayment', e.target.checked)}
                                            className='w-5 h-5 accent-green-500 bg-gray-700 border-gray-600 rounded focus:ring-green-400 focus:ring-2'
                                        />
                                        <span className='text-white font-medium'>Use a different payment number</span>
                                    </label>
                                </div>

                                {formData.useAlternatePayment && (
                                    <div className='animate-fade-in'>
                                        <label className='block text-sm font-medium text-gray-300 mb-2'>
                                            Alternate Payment Number
                                        </label>
                                        <input
                                            type='tel'
                                            value={formData.alternatePaymentNumber}
                                            onChange={(e) => handleInputChange('alternatePaymentNumber', e.target.value)}
                                            placeholder='e.g., 0712345678'
                                            className='w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent'
                                        />
                                        <p className='text-gray-500 text-xs mt-1'>M-Pesa or mobile money number</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Navigation */}
                <div className='p-6 bg-gray-700/50 border-t border-gray-600 flex justify-between'>
                    <button
                        onClick={handleBack}
                        disabled={step === 1}
                        className='px-10 py-2.5 bg-gray-600 text-white rounded-lg  cursor-pointer
                        font-semibold hover:bg-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        Back
                    </button>

                    {step < 6 ? (
                        <button
                            onClick={handleNext}
                            className='px-10 py-2.5 bg-sky-600 text-white rounded-lg cursor-pointer
                             font-semibold hover:bg-sky-700 transition-colors flex items-center gap-2'
                        >
                            Next
                            <ChevronRight className='w-5 h-5' />
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className='px-10 py-2.5 bg-emerald-700 text-white rounded-lg font-semibold cursor-pointer
                             hover:bg-emerald-500 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
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
            
        </div>
    )
}

export default AggregatorOnboarding
