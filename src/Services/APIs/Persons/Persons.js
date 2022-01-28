import api from "../Common/api";

const getPersons = (prodID) => api.get("/persons/?" + prodID);
const getPersonsPost = (data) => api.post("/persons/getPersons", data);
const getAllPersons = (data) => api.get("/persons/?" + data);

const addPersons = (data) => api.post("/persons/person", data);
const editPersons = (id, data) => api.put("/persons/person/"+id, data);
const deletePersons = (id) => api.delete("/persons/person/" + id);


export default {
    getPersons,
    getPersonsPost,
    getAllPersons,
    addPersons,
    editPersons,
    deletePersons
};