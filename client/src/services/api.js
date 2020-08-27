import axios from 'axios'
import jwt_decode from 'jwt-decode';
import { json } from 'body-parser';
import { removeError , addError } from '../store/actions';
import { store } from '../store';


export const setToken = token => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  };

export const register = newUser => {
  return axios
    .post('users/register', {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      password: newUser.password
    })
    .then(response => {
      console.log('register[api]' , response.data)
      if(response.data.token === undefined){
        throw new Error(response.data)     }
      localStorage.setItem('registerToken',(response.data.token))
      const token = localStorage.registerToken;
    })
}

export const registerFinal = newUser => {
  return axios
    .post('users/verify', {
      token: newUser.token,
      otpCode: newUser.code
    })
    .then(response => {
      if(response.data === 'Invalid Otp'){
        store.dispatch(addError('Invalid Otp'))
        throw new Error({ message: 'OTP didnot match'});
      }
      console.log('otp response ' , response)
      return true;
    
    }).catch(err =>{
      console.log('otp catch sentence' , err)
      console.log('otp Error Catch' , err.message)
    })
}


export const login = user => {
  return axios
    .post('users/login', {
      email: user.email,
      password: user.password
    })
    .then(response => {
      console.log('response is ' , response.data)
      localStorage.setItem('usertoken',(response.data))
      const token = localStorage.usertoken
      const decoded = jwt_decode(token)
      const  data = {
        first_name: decoded.first_name,
        last_name: decoded.last_name,
        email: decoded.email
      }
      return data;
     // return response.data
    })
    .catch(err => {
      console.log('error is ' , err)
    })
}

export const getProfile = user => {
  return axios
    .get('users/profile', {
      //headers: { Authorization: ` ${this.getToken()}` }
    })
    .then(response => {
      console.log(response)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export default { setToken , registerFinal , register  , login   , getProfile}
