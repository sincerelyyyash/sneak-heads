import axios from "axios"
import { baseUrl } from "../Constants";






export const SignUp = async (email,fullname,password) => {
    try {
        const requestBody = {
            email,
            fullname,
            password
        };

        const response = await axios.post(baseUrl+'/users/register', requestBody)

        localStorage.setItem("accessToken", response.data.accessToken);
        // setAccessToken(response.data.accessToken);

    } catch (response) {
        console.log('Error signing up:', response);
    }
}


export const SignIn = async (email, password) => {
    
    try {
        const requestBody = {
            email,
            password
        };

        const response = await axios.post(baseUrl+'/users/register', requestBody)
        localStorage.setItem("accessToken", response.data.accessToken);
        // setAccessToken(response.data.accessToken);
        

    } catch (response) {
        console.log(response);  
    }
}