import React from 'react'
import { useState, useEffect } from 'react';

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { fetchUser } from "../../redux/authen/authenAction";

const Hero = ({ success, fetchUser }) => {
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

    //console.log(formData);
    fetchUser(formData, "signup");
  }




  return (
    <div className="landing-cover">
      <div className="container hero-container">
        <div className="hero-description">
          <h1 className="title">
            Build for developers
          </h1>
          <p className="description">
            DevHub is a social Media plartform inspired from other plartform.
            DevHub  is a open sourse project to conncet the developers around the world.
          </p>
        </div>
        <div className="hero-form-container">
          <form className="hero-form" onSubmit={handelSubmit}>
            <div className="form-grp">
              <lable className="form-grp-title">Username</lable>
              <input type="text" name="name" id="username" value={name} onChange={handelChange} />
            </div>
            <div className="form-grp">
              <lable className="form-grp-title">Email</lable>
              <input type="email" name="email" id="email" onChange={handelChange} value={email} />
            </div>
            <div className="form-grp">
              <lable className="form-grp-title">Password</lable>
              <input type="password" name="password" id="password" onChange={handelChange} value={password} />
            </div>
            <p className="landing-note">Make sure it's at least 15 characters OR at least 8 characters including a number and a lowercase letter.</p>

            <button type="submit" className="landing-btn-submit">
              Sign up for DevHub
            </button>
            <p className="landing-note">By clicking “Sign up for DevHub”, you agree to our Terms of Service and Privacy Statement.</p>

          </form>
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

export default connect(mapStateToProps, mapStateToDispatch)(Hero)


