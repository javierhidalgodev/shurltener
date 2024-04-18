import axios from "axios"

const API = 'https://shurltener-api.vercel.app/api/login'

const login = async credentials => {
    const data  = await axios
    .post(API, credentials, {headers: {'Content-Type': 'application/json'}})
    
    return data
}

export default login