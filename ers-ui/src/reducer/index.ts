import { combineReducers } from "redux";
import { loginReducer } from "./login-reducer";
import { User } from "../model/user";

export interface ILoginState {
    user: User
}

//will be the typing of our entire global state
export interface IState{
    login: ILoginState
    
}

//this will combine all of our reducers
//and make sure they fufill the state required by IState
export const state = combineReducers<IState>({
    login:loginReducer
})