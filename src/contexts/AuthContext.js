import { useState, useEffect, createContext, useContext } from 'react';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isLoginSucces, setIsLoginSucces] = useState(false);

    const login = async (data) => {
        setIsLoginSucces(true);
        setUser(data);
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