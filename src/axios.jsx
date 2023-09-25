import axios from "axios";



    const instance = axios.create({
        baseURL: 'http://localhost:5000/',
    });


    //? Add a request interceptor
    instance.interceptors.request.use((config) => {
        config.headers["content-type"] = "application/json";
        return config;
    }, (error) => {
        console.log(error);
        return Promise.reject(error);
    });


    

//? Add a response interceptor
instance.interceptors.response.use((response) => {
        return response.data;
    }, (error) => {
        console.log(error?.message);
        return Promise.reject(error);
    });


export default instance