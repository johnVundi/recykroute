import { useState } from 'react'
import { Factory, Recycle, Package, DollarSign, Clock, CreditCard, CheckCircle2, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import bg from '../../assets/images/tras.jpg'

interface RecyclerOnboardingData {
    companyName: string
    wasteStreams: string[]
    intakeCapacity: string
    buyingPrices: {
        pet: string
        glass: string
        metal: string
        organic: string
    }
    operatingHours: string
    useAlternatePayment: boolean
    paymentChannel: string
}

const RecyclersOnboarding = () => {
    const navigate = useNavigate()
    const [step, setStep] = useState(1)
    const [isLoading, setIsLoading] = useState(false)

    const [formData, setFormData] = useState<RecyclerOnboardingData>({
        companyName: '',
        wasteStreams: [],
        intakeCapacity: '',
        buyingPrices: {
            pet: '',
            glass: '',
            metal: '',
            organic: ''
        },
        operatingHours: '',
        useAlternatePayment: false,
        paymentChannel: ''
    })

    const wasteStreamOptions = [
        { value: 'pet', label: 'PET (Plastic Bottles)', icon: '♻️' },
        { value: 'hdpe', label: 'HDPE (Hard Plastics)', icon: '🔷' },
        { value: 'cartons', label: 'Cartons', icon: '📦' },
        { value: 'glass', label: 'Glass', icon: '🫙' },
        { value: 'metal', label: 'Metal', icon: '🔩' },
        { value: 'organic', label: 'Organic Compost', icon: '🌱' },
        { value: 'ewaste', label: 'E-waste', icon: '🖥️' }
    ]

    const intakeCapacities = [
        { value: 'low', label: 'Low', description: 'Up to 500 kg/week' },
        { value: 'medium', label: 'Medium', description: '500 - 2000 kg/week' },
        { value: 'high', label: 'High', description: '2000+ kg/week' }
    ]

    const operatingHoursOptions = [
        { value: 'weekdays-8-5', label: 'Weekdays 8AM - 5PM' },
        { value: 'weekdays-24', label: 'Weekdays 24 Hours' },
        { value: 'everyday-8-5', label: 'Every Day 8AM - 5PM' },
        { value: 'everyday-24', label: 'Every Day 24 Hours' },
        { value: 'custom', label: 'Custom Hours' }
    ]

    const handleInputChange = (field: keyof RecyclerOnboardingData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handlePriceChange = (material: keyof typeof formData.buyingPrices, value: string) => {
        setFormData(prev => ({
            ...prev,
            buyingPrices: {
                ...prev.buyingPrices,
                [material]: value
            }
        }))
    }

    const toggleWasteStream = (stream: string) => {
        setFormData(prev => ({
            ...prev,
            wasteStreams: prev.wasteStreams.includes(stream)
                ? prev.wasteStreams.filter(s => s !== stream)
                : [...prev.wasteStreams, stream]
        }))
    }

    const handleNext = () => {
        if (step === 1 && !formData.companyName) {
            toast.error('Please enter your company/facility name')
            return
        }
        if (step === 2 && formData.wasteStreams.length === 0) {
            toast.error('Please select at least one waste stream')
            return
        }
        if (step === 3 && !formData.intakeCapacity) {
            toast.error('Please select your intake capacity')
            return
        }
        if (step === 5 && !formData.operatingHours) {
            toast.error('Please select your operating hours')
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
        if (formData.useAlternatePayment && !formData.paymentChannel) {
            toast.error('Please enter payment channel details')
            return
        }

        setIsLoading(true)

        setTimeout(() => {
            const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
            const updatedUser = {
                ...currentUser,
                onboardingComplete: true,
                userType: 'recycler',
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
                <div className='bg-linear-to-tl from-emerald-800 via-emerald-700 to-emerald-950 p-6'>
                    <h1 className='md:text-3xl text-xl text-center font-bold text-white mb-2 flex items-center justify-center gap-2'>
                        <Factory className='w-8 h-8' />
                        Recycler Onboarding
                    </h1>
                    <p className='text-emerald-50 text-center mt-4'>Complete your facility profile</p>

                    {/* Progress Bar */}
                    <div className='mt-4 bg-gray-300/50 rounded-full h-2 overflow-hidden'>
                        <div
                            className={`h-full transition-all duration-300 ease-in-out
                                ${progressPercentage <= 20 ? 'bg-red-500'
                                    : progressPercentage <= 40 ? 'bg-yellow-500'
                                        : progressPercentage <= 60 ? 'bg-orange-500'
                                            : progressPercentage <= 80 ? 'bg-emerald-500'
                                                : 'bg-green-600'}`}
                            style={{ width: `${progressPercentage}%` }}
                        />
                    </div>
                    <div className='flex justify-between'>
                        <p className='text-emerald-50 text-sm mt-2'>Step {step} of 6</p>
                        <p className='text-emerald-50 text-sm mt-2'>{progressPercentage.toFixed(0)}%</p>
                    </div>
                </div>

                {/* Content */}
                <div className='p-8'>
                    {/* Step 1: Company Name */}
                    {step === 1 && (
                        <div className='space-y-6'>
                            <div>
                                <h2 className='text-2xl font-bold text-white mb-2 flex items-center gap-2'>
                                    <Factory className='w-6 h-6 text-emerald-400' />
                                    Company Details
                                </h2>
                                <p className='text-gray-400 mb-6'>Tell us about your recycling facility</p>
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-gray-300 mb-2'>
                                    Company / Facility Name <span className='text-red-400'>*</span>
                                </label>
                                <input
                                    type='text'
                                    value={formData.companyName}
                                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                                    placeholder='e.g., Green Recycling Ltd, EcoWaste Solutions'
                                    className='w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent'
                                />
                            </div>
                        </div>
                    )}

                    {/* Step 2: Waste Streams */}
                    {step === 2 && (
                        <div className='space-y-6'>
                            <div>
                                <h2 className='text-2xl font-bold text-white mb-2 flex items-center gap-2'>
                                    <Recycle className='w-6 h-6 text-emerald-400' />
                                    Waste Streams Accepted
                                </h2>
                                <p className='text-gray-400 mb-6'>Select all materials you can process (multiple choice)</p>
                            </div>

                            <div className='grid grid-cols-2 gap-3'>
                                {wasteStreamOptions.map((stream) => {
                                    const isSelected = formData.wasteStreams.includes(stream.value)
                                    return (
                                        <button
                                            key={stream.value}
                                            onClick={() => toggleWasteStream(stream.value)}
                                            className={`p-4 rounded-lg cursor-pointer border-2 transition-all duration-200 text-left ${isSelected
                                                ? 'border-emerald-400 bg-emerald-400/10'
                                                : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
                                                }`}
                                        >
                                            <div className='flex items-center justify-between'>
                                                <div className='flex items-center gap-2'>
                                                    <span className='text-2xl'>{stream.icon}</span>
                                                    <span className='text-white font-medium text-sm'>{stream.label}</span>
                                                </div>
                                                {isSelected && (
                                                    <CheckCircle2 className='w-5 h-5 text-emerald-400' />
                                                )}
                                            </div>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    {/* Step 3: Intake Capacity */}
                    {step === 3 && (
                        <div className='space-y-6'>
                            <div>
                                <h2 className='text-2xl font-bold text-white mb-2 flex items-center gap-2'>
                                    <Package className='w-6 h-6 text-emerald-400' />
                                    Daily/Weekly Intake Capacity
                                </h2>
                                <p className='text-gray-400 mb-6'>How much waste can you process?</p>
                            </div>

                            <div className='space-y-3'>
                                {intakeCapacities.map((capacity) => (
                                    <button
                                        key={capacity.value}
                                        onClick={() => handleInputChange('intakeCapacity', capacity.value)}
                                        className={`w-full p-4 rounded-lg cursor-pointer border-2 transition-all duration-200 text-left ${formData.intakeCapacity === capacity.value
                                            ? 'border-emerald-400 bg-emerald-400/10'
                                            : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
                                            }`}
                                    >
                                        <div className='flex items-center justify-between'>
                                            <div>
                                                <h3 className={`font-semibold text-lg
                                                    ${capacity.label === 'Low' ? 'text-yellow-500'
                                                        : capacity.label === 'Medium' ? 'text-orange-500'
                                                            : 'text-green-500'}`}>
                                                    {capacity.label}
                                                </h3>
                                                <p className='text-white text-sm'>{capacity.description}</p>
                                            </div>
                                            {formData.intakeCapacity === capacity.value && (
                                                <CheckCircle2 className='w-6 h-6 text-emerald-400' />
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 4: Buying Prices */}
                    {step === 4 && (
                        <div className='space-y-6'>
                            <div>
                                <h2 className='text-2xl font-bold text-white mb-2 flex items-center gap-2'>
                                    <DollarSign className='w-6 h-6 text-emerald-400' />
                                    Buying Prices per KG
                                </h2>
                                <p className='text-gray-400 mb-6'>This is <span className='text-emerald-500'>(Optional)</span>  but helps attract suppliers</p>
                            </div>

                            <div className='space-y-4'>
                                {[
                                    { key: 'pet', label: 'PET (Plastic Bottles)' },
                                    { key: 'glass', label: 'Glass' },
                                    { key: 'metal', label: 'Metal' },
                                    { key: 'organic', label: 'Organic Compost' }
                                ].map((material) => (
                                    <div key={material.key}>
                                        <label className='block text-sm font-medium text-gray-300 mb-2'>
                                            {material.label} (KSh / kg)
                                        </label>
                                        <input
                                            type='number'
                                            value={formData.buyingPrices[material.key as keyof typeof formData.buyingPrices]}
                                            onChange={(e) => handlePriceChange(material.key as keyof typeof formData.buyingPrices, e.target.value)}
                                            placeholder='e.g., 50'
                                            className='w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent'
                                        />
                                    </div>
                                ))}
                                <p className='text-gray-500 text-xs mt-2'>Leave blank if you prefer not to display prices</p>
                            </div>
                        </div>
                    )}

                    {/* Step 5: Operating Hours */}
                    {step === 5 && (
                        <div className='space-y-6'>
                            <div>
                                <h2 className='text-2xl font-bold text-white mb-2 flex items-center gap-2'>
                                    <Clock className='w-6 h-6 text-emerald-400' />
                                    Operating Hours
                                </h2>
                                <p className='text-gray-400 mb-6'>When can suppliers deliver to you?</p>
                            </div>

                            <div className='space-y-3'>
                                {operatingHoursOptions.map((hours) => (
                                    <button
                                        key={hours.value}
                                        onClick={() => handleInputChange('operatingHours', hours.value)}
                                        className={`w-full p-4 rounded-lg cursor-pointer border-2 transition-all duration-200 text-left ${formData.operatingHours === hours.value
                                            ? 'border-emerald-400 bg-emerald-400/10'
                                            : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
                                            }`}
                                    >
                                        <div className='flex items-center justify-between'>
                                            <h3 className='text-white font-semibold'>{hours.label}</h3>
                                            {formData.operatingHours === hours.value && (
                                                <CheckCircle2 className='w-6 h-6 text-emerald-400' />
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 6: Payment Channel */}
                    {step === 6 && (
                        <div className='space-y-6'>
                            <div>
                                <h2 className='text-2xl font-bold text-white mb-2 flex items-center gap-2'>
                                    <CreditCard className='w-6 h-6 text-emerald-400' />
                                    Payment Channel
                                </h2>
                                <p className='text-gray-400 mb-6'>How should suppliers receive payment?</p>
                            </div>

                            <div className='space-y-4'>
                                <div className='p-4 bg-gray-700/50 rounded-lg border border-gray-600'>
                                    <p className='text-gray-300 text-sm mb-3'>
                                        By default, we'll use the payment details from your signup.
                                    </p>

                                    <label className='flex items-center gap-3 cursor-pointer'>
                                        <input
                                            type='checkbox'
                                            checked={formData.useAlternatePayment}
                                            onChange={(e) => handleInputChange('useAlternatePayment', e.target.checked)}
                                            className='w-5 h-5 accent-emerald-500 bg-gray-700 border-gray-600 rounded focus:ring-emerald-400 focus:ring-2'
                                        />
                                        <span className='text-white font-medium'>Use different payment channel</span>
                                    </label>
                                </div>

                                {formData.useAlternatePayment && (
                                    <div className='animate-fade-in'>
                                        <label className='block text-sm font-medium text-gray-300 mb-2'>
                                            M-Pesa Number / Till / Paybill
                                        </label>
                                        <input
                                            type='text'
                                            value={formData.paymentChannel}
                                            onChange={(e) => handleInputChange('paymentChannel', e.target.value)}
                                            placeholder='e.g., 0712345678, Till 123456, Paybill 987654'
                                            className='w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent'
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Navigation */}
                <div className='p-5 bg-gray-700/50 border-t border-gray-600 flex justify-between'>
                    <button
                        onClick={handleBack}
                        disabled={step === 1}
                        className='px-10 py-2.5 bg-gray-600 cursor-pointer text-white rounded-lg font-semibold hover:bg-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        Back
                    </button>

                    {step < 6 ? (
                        <button
                            onClick={handleNext}
                            className='px-10 py-2.5 bg-emerald-500 cursor-pointer text-white rounded-lg font-semibold hover:bg-emerald-600 transition-colors flex items-center gap-2'
                        >
                            Next
                            <ChevronRight className='w-5 h-5' />
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className='px-8 py-2 bg-green-700 cursor-pointer text-white rounded-lg font-semibold hover:bg-green-800 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
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

export default RecyclersOnboarding