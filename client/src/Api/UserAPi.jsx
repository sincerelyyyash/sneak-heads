import axios from "axios"
import { baseUrl } from "../Constants";

const token = localStorage.getItem("accessToken")
const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };

export const SignUp = async (email,fullname,password) => {
    try {
        const requestBody = {
            email,
            fullname,
            password
        };
        const response = await axios.post(baseUrl+'/users/register', requestBody, {
            withCredentials: true,
        })
        localStorage.setItem("accessToken", response.data.accessToken);

    } catch (response) {
        throw error;
    }
}


export const SignIn = async (email, password) => {
    try {
        const requestBody = {
            email,
            password
        };

        const response = await axios.post(baseUrl + '/users/login', requestBody, {
            withCredentials: true,
        });
        localStorage.setItem("accessToken", response.data.accessToken);

    } catch (error) {
        throw error;
    }
};


export const Logout = async()=>{
    try {
        const response = await axios.post(baseUrl + '/users/logout',config)
    } catch (error) {
        throw error;
    }
}

export const changePassword = async(oldPassword, newPassword )=>{
    try {
        const response = await axios.post(baseUrl + '/users/change-password', {
            oldPassword,
            newPassword
        },
        {
            withCredentials: true,
        },config)
    } catch (error) {
        throw error;
    }
}

export const changeEmail = async(email)=>{
    try {
        const response = await axios.post(baseUrl +'/users/change-email',{
            email
        }, {
            withCredentials: true,
        },config)
    } catch (error) {
        throw error;
    }
}

export const getUserDetails = async()=>{
    try {
        const user = await axios.get(baseUrl + '/users/user', {
            withCredentials: true,
        },config)
    } catch (error) {
        throw error;
    }
}