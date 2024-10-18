import axios from 'axios'

export const getProducts = async ({pageParam = 0}) => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/products?offset=${pageParam}&limit=${12}`)
    return data
}

export const getProductDetail = async (id) => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/products/${id}`)
    return data
}

export const signUp = async (email, password) => {
    const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, { email, password })
    return data
}

export const signIn = async (email, password) => {
    const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, { email, password })
    return data
}