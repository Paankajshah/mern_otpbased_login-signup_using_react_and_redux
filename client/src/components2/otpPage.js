import React, { Component } from 'react'

import { verify } from '../store/actions';
import {connect } from 'react-redux';

class otpPage extends Component {

    state ={
        token:'',
        code:''
    }

    componentDidUpdate(){
        if(!this.props.error.message){
            this.props.history.push('/profile')

        }
    }
   

    onChangeHandler=(e)=> {
        const token= localStorage.registerToken
        this.setState({ [e.target.name]: e.target.value,
            token:token })
      }

      onSubmitHandler=(e)=>{
        e.preventDefault()
        const user = {
            token: this.state.token,
            code: this.state.code
        }

        if(this.state.code !== ''){
            
                    
                    this.props.verify(user);

        }
       
        
      }

    render() {
        return (
            <div className="col-md-6 mt-5 mx-auto">

                <form onSubmit={this.onSubmitHandler}>
                    <p>A six digit code is sent to your email.</p>
                <input
                  type="text"
                  className="form-control"

                  placeholder="Enter Code"
                  name="code"
                  value={this.state.code}
                  onChange={this.onChangeHandler}
                />
                <br></br>
                <button type='submit'>Verify</button>
                </form>
                
            </div>
        )
    }
}

export default connect(store => ({auth: store.auth, error:store.error}), {verify}) (otpPage)

