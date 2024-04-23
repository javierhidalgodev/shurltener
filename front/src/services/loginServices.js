import axios from "axios"

const baseURL = import.meta.env.VITE_BASE_URL

const login = async credentials => {
    const data  = await axios
    .post(`${baseURL}/login`, credentials, {headers: {'Content-Type': 'application/json'}})
    
    return data
}

export default login