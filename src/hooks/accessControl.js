import { useContext } from 'react';
import AuthContext from '@/lib/authContext';

export const useAccessControl = (url) => {
    let user = useContext(AuthContext);

    const can = (p) => {
        if (typeof p == "string") 
            return user?.permissions?.includes(p) ? true : false;
        else {
            let grantedPermissions = 0;

            p.forEach(permission => {
                if (user?.permissions?.includes(permission)) 
                    grantedPermissions += 1;
            })

            return grantedPermissions > 0 ? true : false;
        }
    }

    return {
        permissions: user?.permissions ?? [],
        can: can
    };
};

