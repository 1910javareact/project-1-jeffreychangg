import { msUserClient } from "./ers-user-client";


export async function mspLogin(username:string, password:string){
    const credentials = {
        username,
        password
    }
    console.log('remote running');
    
    try{
        const response = await msUserClient.post('/login', credentials)
        
        
        if(response.status===200){
            return{
                status:response.status,
                body: response.data
            }
        }else{
            return{
                status:response.status,
                body:undefined
            }
        }
    }catch(e){
        console.log('catching an error');
        
        console.log(e);
        throw new Error('Something Went Wrong')
    }
    
}



    export const getAllUsers = async () => {
        try {
            let response = await msUserClient.get('/users')
            if(response.status === 200){
                return{
                    status:response.status,
                    body:response.data
                }
            }else{
                return {
                    status:response.status,
                    body:undefined
                }
        }
        } catch (e) {
            console.log(e);
        throw new Error('Something Went Wrong')
        }
    }

    export const getAllReimbursements = async (userId: number) => {
        try {
            let response = await msUserClient.get('/reimbursements/author/' + userId)
            if(response.status === 200){
                return{
                    status:response.status,
                    body:response.data
                }
            }else{
                return {
                    status:response.status,
                    body:undefined
                }
        }
        } catch (e) {
            console.log(e);
        throw new Error('Something Went Wrong')
        }
    }

    export const getReimbursementsByStatusId = async (statusId: number) => {
        try {
            let response = await msUserClient.get('/reimbursements/status/' + statusId)
            if(response.status === 200){
                return{
                    status:response.status,
                    body:response.data
                }
            }else{
                return {
                    status:response.status,
                    body:undefined
                }
        }
        } catch (e) {
            console.log(e);
        throw new Error('Something Went Wrong')
        }
    }

/////////////////////////////////////////////////////////////

export const getReimbursementsByAuthor = async (author: number) => {
    try {
        let response = await msUserClient.get('/reimbursements/author/' + author)
        if(response.status === 200){
            return{
                status:response.status,
                body:response.data
            }
        }else{
            return {
                status:response.status,
                body:undefined
            }
    }
    } catch (e) {
        console.log(e);
    throw new Error('Something Went Wrong')
    }
}


    export const getUserById = async (userId: number) => {
        try {
            let response = await msUserClient.get('/users/' + userId)
            if(response.status === 200){
                return{
                    status:response.status,
                    body:response.data
                }
            }else{
                return {
                    status:response.status,
                    body:undefined
                }
        }
        } catch (e) {
            console.log(e);
        throw new Error('Something Went Wrong')
        }
    }

    export const updateUser =async (userid: number, username: string, password: string, firstname: string, lastname: string, email: string, role: any)=> {
        const body = {
            userId:userid,
            userName:username,
            password:password,
            firstName:firstname,
            lastName:lastname,
            email:email,
            roleId:role
        }
        
        try {
            let response = await msUserClient.patch('/users/',body)
            if(response.status === 200){
                return{
                    status:response.status,
                    body:response.data
                }
            }else{
                return {
                    status:response.status,
                    body:undefined
                }
        }
        } catch (e) {
            console.log(e);
        throw new Error('Something Went Wrong')
        }
    }

    export const submitReimbursement= async (amount: number,dateSubmitted: number,description:string,type:number) => {
        const body={ 
            reimbursementId: 0,
            author:0,
            amount: amount,
            dateSubmitted: dateSubmitted, 
            dateResolved:0,
            description: description, 
            resolver:0,     
            status:0, 
            type: type
        }
        try {
           
            
            let response = await msUserClient.post('/reimbursements/',body)
            if(response.status === 201){
                console.log(response);
                return{
                    
                    
                    status:response.status,
                    body:response.data
                }
            }else{
                
                return {
                    status:response.status,
                    body:undefined
                }
        }
        } catch (e) {
            console.log(e);
        throw new Error('Something Went Wrong')
        }
    }