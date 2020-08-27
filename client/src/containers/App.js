import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import decode from 'jwt-decode';
import { setCurrentUser, addError , setToken} from '../store/actions';
import Login from '../components2/login'
import Profile from '../components2/profile';
import Register from '../components2/register';
import { Provider } from 'react-redux'
import {store} from '../store'
import otpPage from '../components2/otpPage';
import ErrorMessage from '../components2/ErrorMessage';

if (localStorage.usertoken){
 // setToken(localStorage.jwtToken);
  try {
    console.log('usertoken ' , typeof(localStorage.usertoken) );
    store.dispatch(setCurrentUser(decode(localStorage.usertoken)));
    
  } catch (err) {
    store.dispatch(setCurrentUser({}));
    store.dispatch(addError());  
    
  }
}

const App =() => {

    return ( <Provider store={store}>
      <Router>
        <div className="App">
          <div className="container">

            <Route  path="/" component={ErrorMessage} />
            <Route exact path="/" component={Profile} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/otpPage" component={otpPage} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
          </div>
        </div>
      </Router>

      </Provider>
    )
  }


export default App
