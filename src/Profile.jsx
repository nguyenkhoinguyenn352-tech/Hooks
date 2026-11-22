import { useState, useEffect } from 'react';
import { useUser } from './Hooks/apiHooks.js';

const Profile = () => {
    const [user, setUser] = useState(null);
    const { getUserByToken } = useUser();

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const userResult = await getUserByToken(token);
                    setUser(userResult.user);
                } catch (error) {
                    console.error('Error fetching user:', error);
                }
            }
        };

        fetchUser();
    }, []);

    return (
        <>
            <h2>Profile</h2>
            {user ? (
                <div>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                    <p>Created: {new Date(user.created_at).toLocaleString('fi-FI')}</p>
                </div>
            ) : (
                <p>Please log in to view your profile.</p>
            )}
        </>
    );
};

export default Profile;