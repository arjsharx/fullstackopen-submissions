import axios from "axios";
const baseURL = 'http://localhost:3001/persons'
const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(response=> {
        return response.data
})
}
const create = newObject =>{
    const request = axios.post(baseURL,newObject)
    return request.then(response=>response.data)

}

const deleteContact = id => {
     return  axios.delete(`${baseURL}/${id}`)
      
} 

const updateContact = (id, newObject) => {
    return axios.put(`${baseURL}/${id}`, newObject )
}
export default {getAll,create,deleteContact,updateContact}
