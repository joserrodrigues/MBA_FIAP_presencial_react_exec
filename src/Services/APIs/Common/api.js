import axios from 'axios';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6I…TM4fQ.Z5QkKPxhTrScwsl0vIG3jZ4RVOHl-BJ_jyzcFdPwRhA";

const ApiConn = axios.create({
    baseURL: process.env.REACT_APP_URL,
    // headers: { 'X-Requested-With': 'XMLHttpRequest',
        // 'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJ1YmVuczNAc2Nob29sZ3VhcmRpYW4uYXBwIiwiaWQiOiI2MWYzNmJjMTA5NWRhNTJhNzllZjU5MTUiLCJpYXQiOjE2NDM0MDA4MDEsImV4cCI6MTY0MzQwNDQwMX0.D_kIJh_A2rBaPuphSVnekvCOfbNTe1iqttLcAZluylY" }
   
});

export default ApiConn;