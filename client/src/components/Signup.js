import React, { useState } from 'react'
import "../styles/Signup.css";
import { fetchUser } from "../redux/authen/authenAction";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";

function Signup({ success, fetchUser }) {

  const initialstate = {
    name: '',
    email: '',
    password: ''
  }
  const [formData, setFormData] = useState(initialstate);


  const { name, email, password } = formData;



  const handelChange = (e) => {


    setFormData({ ...formData, [e.target.name]: e.target.value })

  }

  const handelSubmit = (e) => {
    e.preventDefault();
    fetchUser(formData, "signup");
  }

  //console.log(success)


  return (

    <div className="container signup-container" >

      <div className="main main-signup">

        <div className="main-upper">
          <p className="join-msg">Join DevHub</p>
          <p className="main-text-upper">
            Create DevHub account
          </p>
        </div>

        <div className="main-lower">
          <form className="form-signup-form" onSubmit={handelSubmit}>
            <div className="signup-formgrp">
              <lable className="signup-lable">Username</lable>
              <input type="text" name="name" id="username" value={name} onChange={handelChange} />
            </div>
            <div className="signup-formgrp">
              <lable className="signup-lable">Email</lable>
              <input type="email" name="email" id="email" onChange={handelChange} value={email} />
            </div>
            <div className="signup-formgrp">
              <lable className="signup-lable">Password</lable>
              <input type="password" name="password" id="password" onChange={handelChange} value={password} />
            </div>
            <p className="landing-note">Make sure it's at least 15 characters OR at least 8 characters including a number and a lowercase letter. Learn more.</p>
            <button type="submit" className="signup-create-account">Create account</button>

          </form>
          <div className="create-account-container">
            <div className="create-account">
              <lable className="new-des">Already Have an account?</lable>
              <Link to='/signin' className="create-sign-up">Sign in</Link>
            </div>

          </div>
        </div>
      </div>
      {success ? <Redirect to='/dashboard' /> : null}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    success: state.authen.success
  }
}

const mapStateToDispatch = dispatch => {
  return {
    fetchUser: (formData) => dispatch(fetchUser(formData, "signup"))
  }
}

export default connect(mapStateToProps, mapStateToDispatch)(Signup)