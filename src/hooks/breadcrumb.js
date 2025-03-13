
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useBreadcrumb = () => {

    const [breadcrumb, setBreadcrumb] = useState();

    let pathname = usePathname();
    let router = useRouter();

    let currentPath = pathname.slice(1).split("/");


    useEffect(() => {

        const handleNavigation = (path) => {
            router.push(path);
        }
        
        setBreadcrumb(prev => (
            <ul className="flex items-center justify-start gap-3">
                {

                    currentPath.map((item, idx) => 
                        idx == 0 ? (
                            <>
                                <li className="capitalize text-base text-gray-800 hover:text-blue-500 hover:underline cursor-pointer" onClick={() => { handleNavigation("/dashboard") }} >Dashboard</li>
                                <li >&gt;</li>
                                <li className="capitalize text-base text-gray-800 hover:text-blue-500 hover:underline cursor-pointer" onClick={() => { handleNavigation(currentPath.slice(0, idx).join("/")) }} >{ item.split("-").join(" ") }</li>
                            </>
                        )
                        :
                        (
                            <>
                                <li>&gt;</li>
                                <li className="capitalize text-base text-gray-800 hover:text-blue-500 hover:underline cursor-pointer" onClick={() => { handleNavigation(currentPath.slice(0, idx).join("/")) }}>{ item.split("-").join(" ") }</li>
                            </>
                        )
                    )
                }
            </ul>
        ))
    }, [router]);

    return [
        breadcrumb
    ];
    
}