import React from 'react'
import { Link, Redirect } from 'react-router-dom'

function NavNotAuth() {

  const userID = localStorage.getItem('userID')

  if (userID) return <Redirect to="/dashboard" />

  return (
    <>
      <div className="logo">
        <Link to={userID ? "/dashboard" : "/"} className="logo-link">
          < i className="fas fa-code" ></i >
          <label className="logo-lable">DevHub</label>
        </Link>
      </div>
      <div className="right-nav">
        <Link to="/signin" className="sign-in">Sign in</Link>
        <Link to="/signup" className="sign-up">Sign up</Link>

      </div>
    </>
  )
}

export default NavNotAuth
