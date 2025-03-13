import { usePathname } from 'next/navigation'
import NavLink from './NavLink';

const Navigation = () => {

    return (
        <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
            <NavLink
                href="/dashboard"
                active={usePathname() === '/dashboard'}>
                Dashboard
            </NavLink>
            <NavLink
                href="/snippets"
                active={usePathname() === '/snippets'}>
                Snippets
            </NavLink>
            <NavLink
                href="/reading-list"
                active={usePathname() === '/reading-list'}>
                Reading List
            </NavLink>
            <NavLink
                href="/watching-list"
                active={usePathname() === '/watching-list'}>
                Watching List
            </NavLink>
            <NavLink
                href="/personal-notes"
                active={usePathname() === '/personal-notes'}>
                Personal Notes
            </NavLink>
        </div>
    )
}

export default Navigation