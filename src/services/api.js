import axios from 'axios'

export const getProducts = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/products`)
    return data
}

export const getProductDetail = async (id) => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/products/${id}`)
    return data
}