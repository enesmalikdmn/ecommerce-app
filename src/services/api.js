import axios from 'axios'

axios.interceptors.request.use(function (config) {
    const { origin } = new URL(config.url);
    
    const allowedOrigins = [process.env.REACT_APP_API_URL];
    
    if (allowedOrigins[0].includes(origin)) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
    }

    return config;
  }, function (error) {
    return Promise.reject(error);
  });

export const getProducts = async ({pageParam = 0}) => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/products?offset=${pageParam}&limit=${12}`)
    return data
}

export const deleteProduct = async (id) => {
    const { data } = await axios.delete(`${process.env.REACT_APP_API_URL}/products/${id}`)
    return data
}

export const getProductDetail = async (id) => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/products/${id}`)
    return data
}

export const signUp = async ({name, email, password, avatar = 'https://api.lorem.space/image/face?w=640&h=480'}) => {
    const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/users`, { name, email, password, avatar })
    return data
}

export const signIn = async ({email, password}) => {
    const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, { email, password })
    return data
}

export const getProfile = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/auth/profile`)
    return data
}