import { msUserClient } from "./ers-user-client";


export async function mspLogin(username:string, password:string){
    const credentials = {
        username,
        password
    }
    console.log('remote running');
    
    try{
        const response = await msUserClient.post('/login', credentials)
        console.log(`response: ${response}`);
        
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