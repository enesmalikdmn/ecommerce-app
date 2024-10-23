import { useState, createContext, useContext, useEffect } from 'react';

const BasketContext = createContext();

const initialBasket = JSON.parse(localStorage.getItem('basket')) || [];

export const BasketProvider = ({ children }) => {
    const [basket, setBasket] = useState(initialBasket);

    useEffect(() => {
        localStorage.setItem('basket', JSON.stringify(basket));
    }, [basket]);

    const addProduct = (product) => {
        setBasket((prev) => [...prev, product]);
    };

    const values = {
        basket,
        setBasket,
        addProduct,
    };
    
    return (
        <BasketContext.Provider value={values}>
        {children}
        </BasketContext.Provider>
    );
};

export const useBasket = () => useContext(BasketContext);
