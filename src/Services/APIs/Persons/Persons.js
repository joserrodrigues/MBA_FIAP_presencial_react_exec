import { useContext } from "react";
import api from "../Common/api";
import { InfoContext } from '../../../store/InfoContext';


const getPersons = (prodID, token) => api.get("/authPersons/?" + prodID, mountHeader(token));
const getPersonsPost = (data, token) => api.post("/authPersons/getPersons", data, mountHeader(token));
const getAllPersons = (data, token) => api.get("/authPersons/?" + data, mountHeader(token));

const addPersons = (data, token) => api.post("/authPersons/person", data, mountHeader(token));
const editPersons = (id, data, token) => api.put("/persons/person/" + id, data, mountHeader(token));
const deletePersons = (id, token) => api.delete("/persons/person/" + id, mountHeader(token));

const mountHeader = ( token ) => {
    return { headers: { 'Authorization': 'Bearer ' + token } }
}


export default {
    getPersons,
    getPersonsPost,
    getAllPersons,
    addPersons,
    editPersons,
    deletePersons
};