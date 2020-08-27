import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'

import { login , logout } from '../store/actions';
import {connect } from 'react-redux';

class Profile extends Component {
    state = {
      first_name: '',
      last_name: '',
      email: '',
      errors: {}
    }

  componentDidMount() {
    if(this.props.auth.isAuthenticated === false) return  this.props.history.push('/login')
    
    
    this.setState({
      first_name: this.props.auth.user.first_name,
      last_name: this.props.auth.user.last_name,
      email: this.props.auth.user.email
    })

  }
      logoutHandler =() =>{
      this.props.logout();
      this.props.history.push('/login')
        
      }

  render() {
    console.log(this.state);
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">PROFILE</h1>
          </div>
          <table className="table col-md-6 mx-auto">
            <tbody>
              <tr>
                <td>Fist Name</td>
                <td>{this.state.first_name}</td>
              </tr>
              <tr>
                <td>Last Name</td>
                <td>{this.state.last_name}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{this.state.email}</td>
              </tr>
            </tbody>
          </table>

          <button onClick={this.logoutHandler}>Logout</button>
        </div>
      </div>
    )
  }
}

export default connect(store => ({auth: store.auth}), {login , logout}) (Profile)

