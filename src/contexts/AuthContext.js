import { useState, useEffect, createContext, useContext } from 'react';
import { getProfile } from '../services/api';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isLoginSucces, setIsLoginSucces] = useState(false);


    useEffect(() => {
        (async () => {
            const access_token = localStorage.getItem('access_token');

            if (access_token) {
                try {
                    const response = await getProfile();
                    setUser(response);
                } catch (error) {
                    console.log(error);
                }
            }
            setLoading(false);
        })();
    }, []);
            

    const login = async (data) => {
        setIsLoginSucces(true);
        setUser(data);

        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
    }

    const values = {
        user,
        login,
        loading,
        isLoginSucces
    }

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => useContext(AuthContext);