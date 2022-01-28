import api from "../Common/api";

const login = (data) => api.post("/authPersons/login", data);
const signUp = (data) => api.put("/authPersons/signup", data);

export default {
    login,
    signUp
};