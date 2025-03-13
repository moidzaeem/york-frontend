'use client'

import LoginLinks from '@/app/LoginLinks'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// export const metadata = {
//     title: 'Laravel',
// }

const Home = () => {

    const router = useRouter();

    useEffect(() => {
        router.replace('/login');
    }, [router]);

    return (
        <>
            <div>
                {/* no contents */}
            </div>
        </>
    )
}

export default Home
