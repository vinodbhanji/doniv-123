import axios from 'axios'

const axiosInstance = await axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
    withCredentials:true //alllow browser to send cookies to the server
})

export default axiosInstance