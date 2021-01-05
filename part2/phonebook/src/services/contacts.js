import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    console.log("you: 123450897659485637")
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const add = (newObject) => {
    const request = axios.post(`${baseUrl}`, newObject)
    return request.then(response => response.data)
}

const remove = (id) => {
    axios.delete(`${baseUrl}/${id}`)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const contactService = {
    getAll, create, add, remove, update
};
export default contactService;