import { useState, createContext, useContext } from 'react';

const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
    const [basket, setBasket] = useState([]);

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
