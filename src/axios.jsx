import axios from "axios";



    const instance = axios.create({
        baseURL: 'https://web-tech-official-server.vercel.app/',
        // timeout: 1000,
        // headers: {'X-Custom-Header': 'foobar'}
    });


    //? Add a request interceptor
    instance.interceptors.request.use((config) => {
        // Add common headers to every request
        config.headers["content-type"] = "application/json";
        return config;
    }, (error) => {
        // Handle request errors
        console.log(error);
        return Promise.reject(error);
    });


    

//? Add a response interceptor
instance.interceptors.response.use((response) => {
        // Transform response data if needed

        // console.log('response from axios', response);
        return response.data;
    }, (error) => {
        // Handle response errors
        console.log(error?.message);
        return Promise.reject(error);
    });


export default instance