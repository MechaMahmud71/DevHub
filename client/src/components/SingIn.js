import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { fetchUser } from "../redux/authen/authenAction";
import "../styles/Signin.css";


function SingIn({ isLoggedIn, isLoggedOut, fetchUser }) {

  const initialstate = {
    email: '',
    password: '',

  }



  const [formData, setFormData] = useState(initialstate);


  const { email, password } = formData;


  const handelChange = (e) => {


    setFormData({ ...formData, [e.target.name]: e.target.value })


  }

  const handelSubmit = (e) => {
    e.preventDefault();
    fetchUser(formData, "signin");


  }

  //console.log(success)


  return (

    <div className="container signin-container">


      <div className="main main-signin">
        <div className="main-upper-signin">
          <Link to="/" className="logo-link-signin">
            < i className="fas fa-code" id="signin-logo" ></i >
          </Link>
          <p className="signin-msg">Sign in to DevHub</p>
        </div>
        <div className="main-lower-signin">
          <form className="form-signin-form" onSubmit={handelSubmit}>
            <div className="form-signin-grp">
              <div className="signin-formgrp">
                <lable className="signup-lable">Email</lable>

                <input type="email" name="email" id="email" onChange={handelChange} value={email} />
              </div>
              <div className="signin-formgrp">
                <div className="extra">
                  <lable className="signup-lable">Password</lable>
                  <Link to="/forgetpassword" className="forget-password">Forget password?</Link>
                </div>
                <lable className="signup-lable"></lable>
                <input type="password" name="password" id="password" onChange={handelChange} value={password} />
              </div>
              <button type="submit" className="signin-btn">Sign in</button>


            </div>
          </form>

          <div className="create-account-container">
            <div className="create-account">
              <lable className="new-des">New to DevHub?</lable>
              <Link to='/signup' className="create-sign-up">Create an account</Link>
            </div>

          </div>
        </div>
      </div>

      {isLoggedIn === true ? <Redirect to='/dashboard' /> : <Redirect to="/signin" />}


    </div>
  )
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.authen.success,
    isLoggedOut: state.logOut.success
  }
}

const mapStateToDispatch = dispatch => {
  return {
    fetchUser: (formData) => dispatch(fetchUser(formData, "signin"))
  }
}

export default connect(mapStateToProps, mapStateToDispatch)(SingIn)

