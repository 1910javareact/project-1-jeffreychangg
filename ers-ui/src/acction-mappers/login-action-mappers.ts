import { mspLogin } from "../remote/esr-user-cleint/ers-user"

export const msLoginTypes = {
    INVALID_CREDENTIALS: 'MS_LOGIN_INVALID_CREDENTIALS',
    SUCCESSFUL_LOGIN: 'MS_LOGIN_SUCCESSFUL_LOGIN',
    UNSUCCESSFUL_LOGIN: 'MS_LOGIN_FAILED_LOGIN'
}

export const msLogin = (username:string, password:string) => async (dispatch:any) => {

    try{
        let res = await mspLogin(username, password)
        //a successful login
        if(res.status === 200){
            //this is how do it when we have async operations
            dispatch({
                type:msLoginTypes.SUCCESSFUL_LOGIN,
                payload:{
                    user:res.body
                }
            })
        }else{
            dispatch({
                type:msLoginTypes.INVALID_CREDENTIALS
            })
        }
    }catch(e){
        dispatch({
            type:msLoginTypes.UNSUCCESSFUL_LOGIN
        })
    }
    
}

