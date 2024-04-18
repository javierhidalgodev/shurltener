import axios from "axios"

const login = async credentials => {
    const data  = await axios
    .post('/api/login', credentials, {headers: {'Content-Type': 'application/json'}})
    
    return data
}

export default login