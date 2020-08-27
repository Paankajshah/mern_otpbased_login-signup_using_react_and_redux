import {addError , removeError} from './error';
import { registerBool } from './register';
import { SET_CURRENT_USER } from "../actionTypes";
import api  from "../../services/api";

export const setCurrentUser = user =>({
    type: SET_CURRENT_USER,
    user
});


export const setToken = token =>{
    api.setToken(token);
};

export const logout = ()=> {
    return async dispatch =>{
        localStorage.clear();
        api.setToken(null);
        dispatch(setCurrentUser({}));
        dispatch(removeError());

    }
}


export const login  = (data) =>{
    return async dispatch =>{
      
        
        try {
            const { ...user } = await api.login(data);
            //          console.log('details is ' , user);
           // localStorage.setItem('jwtToken' , token);
           // api.setToken(token);
            console.log('user Logged' , user);
            if(Object.keys(user).length===0){
                throw{
                    name: "Input Error",
                    message: "Invalid Username or Password"
                }
            }
            console.log('user Logged check' , user);

            dispatch(setCurrentUser(user));
            dispatch(removeError());
            
        } catch (err) {
           // const {error} = err.response.data;
            console.log('error ' , err.message)
            dispatch(addError(err.message));     
           }
    }
}



export const register  = (data) =>{
    return async dispatch =>{
      
        
        try {
           await api.register(data);
           dispatch(registerBool(true));

          
            
        } catch (err) {
           // const {error} = err.response.data;
            console.log('error ' , err.message)
            dispatch(addError(err.message));     
           }
    }
}

export const verify = (data) =>{

    return async dispatch =>{
      
        
        try {
          const result=  await api.registerFinal(data);
          if(result === true){
              dispatch(removeError());

          }
          console.log('verify otp' , result)
          
            
        } catch (err) {
           // const {error} = err.response.data;
            console.log('error ' , err.message)
            dispatch(addError(err.message));     
           }
    }

}