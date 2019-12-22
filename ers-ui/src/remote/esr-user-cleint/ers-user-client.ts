import axios from 'axios'


export const msUserClient = axios.create({
    baseURL: 'http://3.136.18.150:2001', //generally just network address
    headers:{
        'Content-Type':'application/json'
    },
    withCredentials:true
})