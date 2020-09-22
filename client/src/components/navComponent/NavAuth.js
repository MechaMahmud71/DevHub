import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOutUser } from "../../redux/removeAuth/removeAction";
import axios from "axios";


function NavAuth({ success, logOutUser, prop }) {


  const [user, setUser] = useState({});
  const [profileId, setProfileId] = useState('');
  const [avater, setAvater] = useState('');



  useEffect(() => {
    getUser();
    getProfile();
  }, [])

  const getUser = async () => {
    try {
      const { data: { user } } = await axios.get("/api/v1/user/getMe");
      setUser(user);
    } catch (error) {
      console.log(error);
    }
  }

  const getProfile = async () => {
    try {
      const { data } = await axios.get('/api/v1/profile/me');
      //console.log(data)
      setProfileId(data.data._id);
      setAvater(data.repos[0].avater);

    } catch (error) {
      console.log(error);
    }
  }



  const handelLogOut = (e) => {
    e.preventDefault();
    logOutUser();
  }
  //console.log(avater)

  const profileLink = user.profile ? (
    <a href={`/profile/${profileId}`} className="profile-logo-link">
      <div className="profile-nav-avater">
        {avater ? (<img src={avater} className="avater-image-profile" />) : null}
      </div >
      <div className="profile-userName">{user.name}</div>
    </a >
  ) : (
      <Link to="/create-profile" className="nav-profile" >Create a Profile</Link>
    )





  if (success === false) return <Redirect to="/signin" />
  const dashboard = prop === "dashboard" ? (<Link to="/dashboard" className="nav-dashboard">Dashboard</Link>) : (null)
  const profile = prop === "profile" ? null : (<Link to="/dashboard" className="nav-dashboard">Dashboard</Link>)

  return (
    <>
      <div className="logo">
        <Link to="/dashboard" className="logo-link">
          < i className="fas fa-code" ></i >
          <label className="logo-lable">DevHub</label>
        </Link>
      </div>
      <div className="right-nav">
        {profileLink}
        {dashboard}
        {profile}
        <button className="log-out-active" onClick={handelLogOut}>Log out</button>

      </div>
    </>
  )
}

const mapStatetoProps = state => {
  return {
    success: state.logOut.success
  }
}

const mapSatteToDispatch = dispatch => {
  return {
    logOutUser: () => dispatch(logOutUser())
  }
}

export default connect(mapStatetoProps, mapSatteToDispatch)(NavAuth);
