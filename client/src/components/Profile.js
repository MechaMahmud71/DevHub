import React, { useState, useEffect } from 'react';
import axios from "axios";
import "../styles/CreateProfile.css";
import { Redirect, useLocation, useParams } from 'react-router-dom';



function Profile() {

  const initialState = {
    bio: "",

    githubusername: "",
    skills: '',
    website: ""
  }
  const location = useLocation();
  const { id } = useParams();

  const [formData, setFormData] = useState(initialState);
  const [profileId, setProfileId] = useState('');
  const [success, setSuccess] = useState(false);
  const [linkName, setLinkName] = useState('create-profile')

  useEffect(() => {
    handleLocation();
    getProfile();

  }, [])

  const createProfile = async () => {
    try {
      const { data } = await axios.post('/api/v1/profile/createProfile', formData);
      setProfileId(data.data._id);
      setSuccess(true);
      //console.log(data)
    } catch (error) {
      console.log(error);
    }
  }
  const getProfile = async () => {
    try {
      const { data: { data } } = await axios.get(`/api/v1/profile/me`);
      // console.log(data);
      setProfileId(id);
      setFormData({
        bio: `${data.bio}` === "undefined" ? "" : `${data.bio}`,
        githubusername: `${data.githubusername}` === "undefined" ? "" : `${data.githubusername}`,
        skills: `${data.skills}` === "undefined" ? "" : `${data.skills}`,
        website: `${data.website}` === "undefined" ? "" : `${data.website}`,
      })
    } catch (error) {
      console.log(error)
    }

  }

  const updateProfile = async () => {
    try {
      const { data: { success, data } } = await axios.put(`/api/v1/profile/${id}/updateprofile`);
      setSuccess(success);
      // setProfileId(id);
      //console.log(data)
    } catch (error) {
      console.log(error);
    }

  }

  const handleChange = (e) => {


    setFormData({ ...formData, [e.target.name]: e.target.value })

    console.log(formData)

  }

  const handleLocation = () => {
    let splittedLocation = location.pathname.split('/');

    //console.log(splittedLocation);

    if (splittedLocation.length > 3) {

      setLinkName(splittedLocation[3])
    }


  }

  const handleSubmit = e => {
    e.preventDefault();
    createProfile();
  }

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    updateProfile();
  }

  if (success) return <Redirect to={`/profile/${profileId}`} />

  return (
    <>

      <div className="container create-profile-container">
        <div className="create-profile-heading">
          {linkName === "updateprofile" ? (
            <h1 className="heading-text">Update Your Profile</h1>
          ) : (
              <h1 className="heading-text">Create Your Profile</h1>
            )}
          <p className="paragraph-text">Let's get some imformation to make your profile stand out </p>
        </div>
        <div className="create-profile-about">
          <h2 className="create-profile-about-heading">About</h2>
          <textarea name="bio" id="about" value={formData.bio} placeholder="A short bio of yourself" onChange={handleChange}></textarea>
          <p className="sub-text">Tell us a litte about yourself</p>
        </div>

        <div className="create-profile-skills">
          <h2 className="profile-skills-heading">Skills</h2>
          <input type="text" name="skills" value={formData.skills} className="profile-skills" onChange={handleChange} placeholder="*Skills" />
          <p className="sub-text">Please use comma separated values (eg.HTML,CSS,JavaScript,PHP)</p>
        </div>

        <div className="create-profile-githubusername">
          <h2 className="profile-github-username">GitHub Username</h2>
          <input type="text" name="githubusername" value={formData.githubusername} className="profile-githubusername" onChange={handleChange} />
          <p className="sub-text">If you want to show your latest repos and their links include your github user name</p>
        </div>

        <div className="create-profile-website">
          <h2 className="profile-website-heading">Your website link</h2>
          <input type="text" name="website" value={formData.website} placeholder="Website link" className="profile-website" onChange={handleChange} />
          <p className="sub-text">Could be your or your company link</p>
        </div>

        <div className="create-profile-buttons">
          {
            linkName === "updateprofile" ? (
              <button className="profile-confirm-button" onClick={handleUpdateSubmit}>Update Profile</button>
            ) : (
                <button className="profile-confirm-button" onClick={handleSubmit}>Create Profile</button>
              )
          }
          {/* <button className="profile-cancle-button">Cancle</button> */}
          <a href="/dashboard" className="profile-cancle-button">Cancle</a>
        </div>


      </div>
    </>

  )
}


export default Profile
