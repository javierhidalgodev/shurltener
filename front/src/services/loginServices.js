import axios from "axios"

const login = async credentials => {
    const data  = await axios
    .post('http://localhost:2024/api/login', credentials, {headers: {'Content-Type': 'application/json'}})
    
    return data
}

export default login