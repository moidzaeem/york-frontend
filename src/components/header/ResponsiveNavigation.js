import { usePathname } from 'next/navigation'
import ResponsiveNavLink from '../ResponsiveNavLink';

const ResponsiveNavigation = () => {

    return (
        <div className="pt-2 pb-3 space-y-1">
            <ResponsiveNavLink
                href="/dashboard"
                active={usePathname() === '/dashboard'}>
                Dashboard
            </ResponsiveNavLink>
        </div>
    )
}

export default ResponsiveNavigation