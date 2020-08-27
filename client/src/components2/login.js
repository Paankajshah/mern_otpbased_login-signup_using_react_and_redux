import React, { Component } from 'react'
import { login } from '../store/actions';
import {connect } from 'react-redux';
import { Redirect } from 'react-router-dom';



class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  componentDidUpdate(){
    console.log('login props' , this.props)
    if (this.props.auth.isAuthenticated) return this.props.history.push('/profile');

  }

  



  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault()

    const user = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.login(user);
  

  }

  handleRegister = () =>{
    this.props.history.push('/register');
  }



  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
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
                Sign in
              </button>
              <button
                onClick={this.handleRegister}
                className="btn btn-lg btn-primary btn-block"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(store => ({auth: store.auth}), {login}) (Login)
