import useSWR from 'swr'
import axios from '@/lib/axios'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export const useNotification = ({ middleware, redirectIfAuthenticated } = {}) => {
    const router = useRouter()

    const { data: notifications, error } = useSWR('/api/notifications', () => {
        return axios
            .get('/api/notifications')
            .then(res => res.data.data)
            .catch(error => {
                console.log(error);

                if (error.response.status == 409) router.push('/verify-email')

                throw error;
            })
    })

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user)
            router.push(redirectIfAuthenticated)
        if (
            window.location.pathname === '/verify-email' &&
            user?.email_verified_at
        )
            router.push(redirectIfAuthenticated)
    }, [notifications, error])

    return {
        notifications,
    }
}
