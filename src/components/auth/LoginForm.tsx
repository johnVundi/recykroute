import { useState } from "react"
import { Eye, EyeOff, Mail, Lock, LogIn, Recycle } from 'lucide-react'
import login from '../../assets/images/login.jpg'
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { validateCredentials } from '../../data/users'

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        setTimeout(() => {
            const user = validateCredentials(email, password);

            if (user) {
                setIsLoading(false)
                toast.success(`Welcome back, ${user.username}!`);
                // Store user info in localStorage for session management
                localStorage.setItem('currentUser', JSON.stringify(user));
                navigate('/dashboard');
            } else {
                setIsLoading(false)
                toast.error('Invalid email or password. Please try again.');
            }
        }, 1000)
    }

    return (
        <div className='flex items-center justify-center min-h-screen w-full bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 p-4'>
            <div className='w-full max-w-5xl flex shadow-2xl rounded-lg overflow-hidden bg-gray-800 border border-gray-700'>
                {/* Left Side - Image Background */}
                <div className='hidden md:flex md:w-1/2 items-center justify-center p-8 relative'>
                    {/* Background Image */}
                    <img src={login}
                        alt="Login Background"
                        className='absolute inset-0 w-full h-full object-cover object-center'
                    />

                    <div className='absolute inset-0 bg-linear-to-br from-sky-400/40 to-sky-600/40 backdrop-blur-[2px]'></div>

                    {/* Content */}
                    <div className='relative z-10 text-center'>

                        <div className='bg-white/10 backdrop-blur-xl rounded-xl p-12 border border-white/20'>
                            <div className='flex items-center mb-3 text-white justify-center gap-2'>
                                <Recycle size={45} />
                                <h2 className='text-5xl capitalize flex items-center gap-2 font-bold text-white  drop-shadow-lg'>
                                    RECYKROUTE
                                </h2>
                            </div>
                            <h2 className='text-xl font-bold text-white mb-3 drop-shadow-lg'>
                                Welcome Back!
                            </h2>
                            <p className='text-white text-lg drop-shadow-md'>
                                Join us in making a difference! Log in to manage your recycling tasks and contribute to a greener planet.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className='w-full md:w-1/2 flex flex-col justify-center p-8 md:p-12'>
                    {/* Logo/Title */}
                    <div className='mb-8 text-center md:text-left'>

                        <div className='flex md:hidden text-white items-center mb-3 justify-center gap-2'>
                            <Recycle size={30} />
                            <h2 className='md:text-5xl text-3xl flex items-center gap-2 font-bold text-white  drop-shadow-lg'>
                                RECYKROUTE
                            </h2>
                        </div>

                        <div className='mb-4 flex items-center gap-3 text-sky-400 justify-center'>
                            <h1 className='md:text-4xl text-2xl font-extrabold  mb-2 flex items-center justify-center  gap-2'>Sign In </h1>
                            <LogIn className='w-8 h-8' />
                        </div>


                        <p className='text-gray-400 text-center text-sm'>
                            Enter your credentials to access your account
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className='space-y-6'>
                        {/* Email Input */}
                        <div>
                            <label htmlFor='email' className='block text-sm font-medium text-gray-300 mb-2'>
                                Email
                            </label>
                            <div className='relative'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <Mail className='h-5 w-5 text-gray-500' />
                                </div>
                                <input
                                    id='email'
                                    type='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder='Enter your email'
                                    required
                                    className='w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0277c7] focus:border-transparent transition-all duration-200'
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor='password' className='block text-sm font-medium text-gray-300 mb-2'>
                                Password
                            </label>
                            <div className='relative'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <Lock className='h-5 w-5 text-gray-500' />
                                </div>
                                <input
                                    id='password'
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder='••••••••'
                                    required
                                    className='w-full pl-10 pr-12 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0277c7] focus:border-transparent transition-all duration-200'
                                />
                                <button
                                    type='button'
                                    onClick={() => setShowPassword(!showPassword)}
                                    className='absolute cursor-pointer inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300'
                                >
                                    {showPassword ? (
                                        <EyeOff className='h-5 w-5' />
                                    ) : (
                                        <Eye className='h-5 w-5' />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className='flex items-center justify-between'>
                            <label className='flex items-center'>
                                <input
                                    type='checkbox'
                                    className='w-4 h-4 accent-[#0277c7] text-[#0277c7] bg-gray-700 border-gray-600 rounded focus:ring-[#0277c7] focus:ring-2'
                                />
                                <span className='ml-2 text-sm text-gray-300'>Remember me</span>
                            </label>
                            <a
                                href='/forgot-password'
                                className='text-sm text-[#0277c7] hover:text-sky-300 transition-colors'
                            >
                                Forgot password?
                            </a>
                        </div>

                        {/* Submit Button */}
                        <button
                            type='submit'
                            disabled={isLoading}
                            className='w-full bg-[#0277c7] cursor-pointer hover:bg-sky-500 text-gray-900 font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
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
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    <LogIn className='w-5 h-5' />
                                    Sign In
                                </>
                            )}
                        </button>
                    </form>



                    {/* Sign Up Link */}
                    <p className='mt-8 text-center font-semibold text-md text-gray-400'>
                        Don't have an account?{' '}
                        <a
                            href='/register'
                            className='text-[#0277c7] underline hover:text-sky-300 font-semibold transition-colors'
                        >
                            Sign up for free
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoginForm