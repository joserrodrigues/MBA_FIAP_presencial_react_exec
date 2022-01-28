import api from "../Common/api";

const getPersons = () => api.get("/persons/getPersons/");

export default {
    getPersons
};