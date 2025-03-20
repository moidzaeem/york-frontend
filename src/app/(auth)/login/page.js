'use client'

import Button from '@/components/Button'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AuthSessionStatus from '@/app/(auth)/AuthSessionStatus'
import ApplicationLogo from '@/components/ApplicationLogo'

const Login = () => {
    const router = useRouter()

    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [shouldRemember, setShouldRemember] = useState(false)
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    useEffect(() => {
        if (router.reset?.length > 0 && errors.length === 0) {
            setStatus(atob(router.reset))
        } else {
            setStatus(null)
        }
    })

    const submitForm = async event => {
        event.preventDefault()

        login({
            email,
            password,
            remember: shouldRemember,
            setErrors,
            setStatus,
        })
    }

    return (
        <div className="flex justify-center items-center min-h-screen ">
            <div className="w-full max-w-lg bg-white p-10 rounded-lg shadow-2xl transform transition duration-300 hover:scale-105 hover:shadow-3xl">
                {/* Logo Section */}
                <div className="text-center mb-8">
                    <div className="flex justify-center items-center mb-4">
                        <Link href="/">
                            <ApplicationLogo className="w-20 h-20 fill-current text-gray-600" />
                        </Link>
                    </div>
                    <h2 className="text-4xl font-extrabold text-gray-800">Welcome Back</h2>
                    <p className="text-lg text-gray-500 mt-2">Please log in to your account</p>
                </div>

                {/* AuthSessionStatus */}
                <AuthSessionStatus className="mb-4" status={status} />

                <form onSubmit={submitForm}>
                    {/* Email Address */}
                    <div className="mb-6">
                        <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            className="block mt-2 w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
                            onChange={event => setEmail(event.target.value)}
                            required
                            autoFocus
                        />
                        <InputError messages={errors.email} className="mt-2 text-red-600 text-sm" />
                    </div>

                    {/* Password */}
                    <div className="mb-6">
                        <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            className="block mt-2 w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
                            onChange={event => setPassword(event.target.value)}
                            required
                            autoComplete="current-password"
                        />
                        <InputError messages={errors.password} className="mt-2 text-red-600 text-sm" />
                    </div>

                    {/* Remember Me */}
                    <div className="block mt-4">
                        <label htmlFor="remember_me" className="inline-flex items-center text-sm text-gray-700">
                            <input
                                id="remember_me"
                                type="checkbox"
                                name="remember"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                onChange={event => setShouldRemember(event.target.checked)}
                            />
                            <span className="ml-2">Remember me</span>
                        </label>
                    </div>

                    {/* Forgot Password */}
                    <div className="flex items-center justify-between mt-6">
                        <Link
                            href="/forgot-password"
                            className="text-sm text-indigo-600 hover:text-indigo-700"
                        >
                            Forgot your password?
                        </Link>

                        <Button className="ml-3 px-6 py-3 bg-black-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            Login
                        </Button>
                    </div>
                </form>

                {/* Register Link */}
                <div className="mt-6 text-center text-sm text-gray-600">
                <span>Don&apos;t have an account?</span>
                <Link
                        href="/register"
                        className="text-indigo-600 hover:text-indigo-700 ml-1"
                    >
                        Register here
                    </Link>
                </div>
            </div>
        </div>
    );



}

export default Login
