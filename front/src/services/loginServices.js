import axios from "axios"

const login = async credentials => {
    const data  = await axios
    .post('https://shurltener-api.vercel.app/api/login', credentials, {headers: {'Content-Type': 'application/json'}})
    
    return data
}

export default login