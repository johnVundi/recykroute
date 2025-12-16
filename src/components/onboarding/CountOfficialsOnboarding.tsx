import { useState } from 'react'
import { ShieldCheck, UserCog, Lock, Building2, CheckCircle2, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import bg from '../../assets/images/tras.jpg'

interface CountyOfficialOnboardingData {
    role: string
    permissionLevel: string
    department: string
}

const CountOfficialsOnboarding = () => {
    const navigate = useNavigate()
    const [step, setStep] = useState(1)
    const [isLoading, setIsLoading] = useState(false)

    const [formData, setFormData] = useState<CountyOfficialOnboardingData>({
        role: '',
        permissionLevel: '',
        department: ''
    })

    const roles = [
        { value: 'ward-admin', label: 'Ward Admin', icon: '🏛️', description: 'Manage ward-level operations' },
        { value: 'municipal-manager', label: 'Municipal Manager', icon: '🏙️', description: 'Oversee municipal services' },
        { value: 'waste-officer', label: 'County Waste Officer', icon: '♻️', description: 'Coordinate waste management' },
        { value: 'environment-officer', label: 'Environment Officer', icon: '🌿', description: 'Environmental compliance' },
        { value: 'system-admin', label: 'System Admin', icon: '⚙️', description: 'Full system administration' }
    ]

    const permissionLevels = [
        {
            value: 'view-only',
            label: 'View Only',
            icon: '👁️',
            description: 'Access to reports and dashboards',
            color: 'blue'
        },
        {
            value: 'manage-operations',
            label: 'Manage Pickups & Disputes',
            icon: '📋',
            description: 'Handle operational tasks',
            color: 'yellow'
        },
        {
            value: 'approve-onboarding',
            label: 'Approve Aggregator Onboarding',
            icon: '✅',
            description: 'Review and approve applications',
            color: 'orange'
        },
        {
            value: 'full-admin',
            label: 'Full Administrative Access',
            icon: '🔐',
            description: 'Complete system control',
            color: 'red'
        }
    ]

    const departments = [
        { value: 'environment', label: 'Environment', icon: '🌳' },
        { value: 'municipal-services', label: 'Municipal Services', icon: '🏢' },
        { value: 'public-health', label: 'Public Health', icon: '🏥' }
    ]

    const handleInputChange = (field: keyof CountyOfficialOnboardingData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleNext = () => {
        if (step === 1 && !formData.role) {
            toast.error('Please select your role')
            return
        }
        if (step === 2 && !formData.permissionLevel) {
            toast.error('Please select your permission level')
            return
        }

        if (step < 3) {
            setStep(step + 1)
        }
    }

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1)
        }
    }

    const handleSubmit = () => {
        if (!formData.department) {
            toast.error('Please select your department')
            return
        }

        setIsLoading(true)

        setTimeout(() => {
            const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
            const updatedUser = {
                ...currentUser,
                onboardingComplete: true,
                userType: 'county-official',
                onboardingData: formData
            }
            localStorage.setItem('currentUser', JSON.stringify(updatedUser))

            setIsLoading(false)
            toast.success('Onboarding completed successfully!')
            navigate('/dashboard')
        }, 1500)
    }

    const progressPercentage = (step / 3) * 100

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
                <div className='bg-linear-to-br from-orange-900 via-orange-800 to-orange-950 p-6'>
                    <h1 className='md:text-3xl text-xl text-center font-bold text-white mb-2 flex items-center justify-center gap-2'>
                        <ShieldCheck className='w-8 h-8' />
                        County Official Onboarding
                    </h1>
                    <p className='text-blue-50 text-center mt-4'>Setup your administrative profile</p>

                    {/* Progress Bar */}
                    <div className='mt-4 bg-gray-400 rounded-full h-2 overflow-hidden'>
                        <div
                            className={`h-full transition-all duration-300 ease-in-out
                                ${progressPercentage <= 33 ? 'bg-red-500'
                                    : progressPercentage <= 66 ? 'bg-yellow-500'
                                        : 'bg-green-600'}`}
                            style={{ width: `${progressPercentage}%` }}
                        />
                    </div>
                    <div className='flex justify-between'>
                        <p className='text-blue-50 text-sm mt-2'>Step {step} of 3</p>
                        <p className='text-blue-50 text-sm mt-2'>{progressPercentage.toFixed(0)}%</p>
                    </div>
                </div>

                {/* Content */}
                <div className='p-8'>
                    {/* Step 1: Role Selection */}
                    {step === 1 && (
                        <div className='space-y-6'>
                            <div>
                                <h2 className='text-2xl font-bold text-white mb-2 flex items-center gap-2'>
                                    <UserCog className='w-6 h-6 text-orange-400' />
                                    Select Your Role
                                </h2>
                                <p className='text-gray-400 mb-6'>What is your position in the county government?</p>
                            </div>

                            <div className='space-y-3'>
                                {roles.map((role) => (
                                    <button
                                        key={role.value}
                                        onClick={() => handleInputChange('role', role.value)}
                                        className={`w-full p-4 rounded-lg cursor-pointer border-2 transition-all duration-200 text-left ${formData.role === role.value
                                            ? 'border-orange-400 bg-orange-400/10'
                                            : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
                                            }`}
                                    >
                                        <div className='flex items-center justify-between'>
                                            <div className='flex items-center gap-3'>
                                                <span className='text-3xl'>{role.icon}</span>
                                                <div>
                                                    <h3 className='text-white font-semibold text-lg'>{role.label}</h3>
                                                    <p className='text-gray-400 text-sm'>{role.description}</p>
                                                </div>
                                            </div>
                                            {formData.role === role.value && (
                                                <CheckCircle2 className='w-6 h-6 text-orange-400' />
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 2: Permission Level */}
                    {step === 2 && (
                        <div className='space-y-6'>
                            <div>
                                <h2 className='text-2xl font-bold text-white mb-2 flex items-center gap-2'>
                                    <Lock className='w-6 h-6 text-orange-400' />
                                    Permission Level
                                </h2>
                                <p className='text-gray-400 mb-6'>What level of system access do you need?</p>
                            </div>

                            <div className='space-y-3'>
                                {permissionLevels.map((level) => (
                                    <button
                                        key={level.value}
                                        onClick={() => handleInputChange('permissionLevel', level.value)}
                                        className={`w-full p-4 rounded-lg cursor-pointer border-2 transition-all duration-200 text-left ${formData.permissionLevel === level.value
                                            ? 'border-orange-400 bg-orange-400/10'
                                            : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
                                            }`}
                                    >
                                        <div className='flex items-center justify-between'>
                                            <div className='flex items-center gap-3'>
                                                <span className='text-3xl'>{level.icon}</span>
                                                <div>
                                                    <h3 className={`font-semibold text-lg
                                                        ${level.color === 'blue' ? 'text-white'
                                                            : level.color === 'yellow' ? 'text-yellow-400'
                                                                : level.color === 'orange' ? 'text-orange-400'
                                                                    : 'text-red-400'}`}>
                                                        {level.label}
                                                    </h3>
                                                    <p className='text-gray-400 text-sm'>{level.description}</p>
                                                </div>
                                            </div>
                                            {formData.permissionLevel === level.value && (
                                                <CheckCircle2 className='w-6 h-6 text-orange-400' />
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {formData.permissionLevel === 'full-admin' && (
                                <div className='mt-4 p-4 bg-red-900/20 border border-red-700 rounded-lg'>
                                    <div className='flex items-start gap-3'>
                                        <ShieldCheck className='w-5 h-5 text-red-400 mt-0.5 shrink-0' />
                                        <div>
                                            <h4 className='text-red-400 font-semibold mb-1'>High-Level Access</h4>
                                            <p className='text-gray-300 text-sm'>
                                                This permission level grants complete control over the system.
                                                It may require approval from a senior administrator.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Step 3: Department */}
                    {step === 3 && (
                        <div className='space-y-6'>
                            <div>
                                <h2 className='text-2xl font-bold text-white mb-2 flex items-center gap-2'>
                                    <Building2 className='w-6 h-6 text-orange-400' />
                                    Department
                                </h2>
                                <p className='text-gray-400 mb-6'>Which department are you part of?</p>
                            </div>

                            <div className='space-y-3'>
                                {departments.map((dept) => (
                                    <button
                                        key={dept.value}
                                        onClick={() => handleInputChange('department', dept.value)}
                                        className={`w-full p-5 rounded-lg cursor-pointer border-2 transition-all duration-200 text-left ${formData.department === dept.value
                                            ? 'border-orange-400 bg-orange-400/10'
                                            : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
                                            }`}
                                    >
                                        <div className='flex items-center justify-between'>
                                            <div className='flex items-center gap-3'>
                                                <span className='text-4xl'>{dept.icon}</span>
                                                <h3 className='text-white font-semibold text-xl'>{dept.label}</h3>
                                            </div>
                                            {formData.department === dept.value && (
                                                <CheckCircle2 className='w-7 h-7 text-orange-400' />
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {/* Summary Card */}
                            <div className='mt-8 p-5 bg-gray-700/50 rounded-lg border border-gray-600'>
                                <h3 className='text-white font-semibold mb-3 flex items-center gap-2'>
                                    <CheckCircle2 className='w-5 h-5 text-orange-400' />
                                    Profile Summary
                                </h3>
                                <div className='space-y-2 text-sm'>
                                    <div className='flex justify-between'>
                                        <span className='text-gray-400'>Role:</span>
                                        <span className='text-white font-medium'>
                                            {roles.find(r => r.value === formData.role)?.label}
                                        </span>
                                    </div>
                                    <div className='flex justify-between'>
                                        <span className='text-gray-400'>Permission:</span>
                                        <span className='text-white font-medium'>
                                            {permissionLevels.find(p => p.value === formData.permissionLevel)?.label}
                                        </span>
                                    </div>
                                    {formData.department && (
                                        <div className='flex justify-between'>
                                            <span className='text-gray-400'>Department:</span>
                                            <span className='text-white font-medium'>
                                                {departments.find(d => d.value === formData.department)?.label}
                                            </span>
                                        </div>
                                    )}
                                </div>
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

                    {step < 3 ? (
                        <button
                            onClick={handleNext}
                            className='px-10 py-2.5 bg-blue-500 cursor-pointer text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center gap-2'
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

export default CountOfficialsOnboarding