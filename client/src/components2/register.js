import React, { Component } from 'react'
import {connect } from 'react-redux';
import {store} from '../store'

import { register , removeError, addError , registerBool } from '../store/actions'


class Register extends Component {
  constructor() {
    super()
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
    }

    this.onChange = this.onChange.bind(this)
    store.dispatch(addError('Fill form'));  
    this.onSubmit = this.onSubmit.bind(this)
  }
  componentDidUpdate(){
    if(this.props.registera.allClear === true){
      console.log("inside clear" , this.props)   
      this.props.history.push('/otpPage')
      store.dispatch(registerBool(false));
      store.dispatch(addError('Enter OTP'));

    }

  }

  onChange=(e)=> {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault()


    const newUser = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password
    }
    const check=  this.props.register(newUser);
    console.log('check[register] ', check)
    if (this.props.error.message){
      console.log("error[register]" , this.props.error.message)
     // const check=  this.props.register(newUser);
     console.log('registor props' , this.props)
    }

    
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Register</h1>
              <div className="form-group">
                <label htmlFor="name">First name</label>
                <input
                  type="text"
                  className="form-control"
                  name="first_name"
                  placeholder="Enter your first name"
                  value={this.state.first_name}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Last name</label>
                <input
                  type="text"
                  className="form-control"
                  name="last_name"
                  placeholder="Enter your lastname name"
                  value={this.state.last_name}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Register!
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(store => ({ error:store.error , registera : store.register}), {register}) (Register)

