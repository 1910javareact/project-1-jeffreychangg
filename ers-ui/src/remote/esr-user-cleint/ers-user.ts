import { msUserClient } from "./ers-user-client";


export async function mspLogin(username:string, password:string){
    const credentials = {
        username,
        password
    }
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
        console.log(e);
        throw new Error('Something Went Wrong')
    }
    
}

