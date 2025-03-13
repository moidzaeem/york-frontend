'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/auth'

const LoginLinks = () => {
    const { user } = useAuth({ middleware: 'guest' })

    return (
        <div className="flex items-center justify-center w-full h-full ">
            {user ? (
                <Link
                    href="/dashboard"
                    className="ml-4 text-2xl text-gray-700 underline"
                >
                    Dashboard
                </Link>
            ) : (
                <>
                    <Link
                        href="/login"
                        className="text-2xl text-gray-700 underline"
                    >
                        Login
                    </Link>
                </>
            )}
        </div>
    )
}

export default LoginLinks
