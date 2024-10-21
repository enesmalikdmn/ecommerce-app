import { useState, useEffect, createContext, useContext } from 'react';
import { getProfile } from '../services/api';
import { Flex, Spinner } from '@chakra-ui/react';


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
                    setIsLoginSucces(true);
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

    const logout = (callback) => {
        setIsLoginSucces(false);
        setUser(null);

        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');

        callback();
    }

    const values = {
        user,
        login,
        logout,
        loading,
        isLoginSucces
    }

    if (loading) return (
        <Flex justify="center" align="center" h="100vh">
            <Spinner size="xl" />
        </Flex>
    )

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => useContext(AuthContext);