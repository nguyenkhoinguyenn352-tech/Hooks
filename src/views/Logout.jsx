import { useEffect } from 'react';
import { useUserContext } from '../Hooks/contextHooks.js';

const Logout = () => {
    const { handleLogout } = useUserContext();

    useEffect(() => {
        handleLogout();
    }, []);

    return <div>Logging out...</div>;
};

export default Logout;