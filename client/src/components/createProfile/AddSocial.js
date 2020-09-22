import React, { useState, useEffect } from 'react';
import Nav from "../Nav";
import { useParams, useLocation, Redirect } from "react-router-dom";
import axios from "axios"


function AddSocial() {
  const { id } = useParams();
  const location = useLocation();

  //console.log(location);


  const initialState = {
    youtube: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: ""
  }
  const [formData, setFormData] = useState(initialState);
  const [linkName, setLinkName] = useState('addsocialLinks');
  const [success, setSuccess] = useState(false);

  useEffect(() => {

    handleLocation();
    getProfile();

  }, [])

  const handleLocation = () => {
    let splittedLocation = location.pathname.split('/');

    //console.log(splittedLocation[3]);

    setLinkName(splittedLocation[3])
  }

  const getProfile = async () => {
    try {
      const { data: { data: { social } } } = await axios.get(`/api/v1/profile/${id}`);
      setFormData({
        youtube: `${social.youtube}` === "undefined" ? "" : `${social.youtube}`,
        facebook: `${social.facebook}` === "undefined" ? "" : `${social.facebook}`,
        instagram: `${social.instagram}` === "undefined" ? "" : `${social.instagram}`,
        twitter: `${social.twitter}` === "undefined" ? "" : `${social.twitter}`,
        linkedin: `${social.linkedin}` === "undefined" ? "" : `${social.linkedin}`
      })
    } catch (error) {
      console.log(error)
    }
  }

  // console.log(formData);
  const handleSocialSubmit = async () => {
    try {

      const { data: { success, data } } = await axios.post(`/api/v1/profile/${id}/addsocial`, formData);
      setSuccess(success);
      console.log(data, success)
    } catch (error) {
      console.log(error);
    }

  }

  const handleSocialUpdate = async () => {
    try {

      const { data: { success } } = await axios.put(`/api/v1/profile/${id}/editsocial`, formData);
      setSuccess(success);
      console.log(success)
    } catch (error) {
      console.log(error);
    }
  }




  const handleChange = (e) => {


    setFormData({ ...formData, [e.target.name]: e.target.value })



  }

  if (success) return <Redirect to={`/profile/${id}`} />
  return (
    <>
      <Nav prop="dashboard" />

      <div className="container add-social-links-container">
        <h1 className="add-links-heading">Add Social links to Your profile</h1>
        <div className="input-container add-link-youtube">
          <i className="fab fa-youtube" id="youtube-edit-icon"></i>
          <input type="text" name="youtube" className="link youtube-link" placeholder="Your Youtube channle Link" value={formData.youtube} onChange={handleChange} />
        </div>
        <div className="input-container add-link-facebook ">
          <i className="fab fa-facebook" id="facebook-edit-icon"></i>
          <input type="text" name="facebook" className="link facebook-link" placeholder="Your facebook profile Link" value={formData.facebook} onChange={handleChange} />
        </div>
        <div className="input-container add-link-instagram ">
          <i className="fab fa-instagram" id="instagram-edit-icon"></i>
          <input type="text" name="instagram" className="link instagram-link" placeholder="Your Instagram profile Link" value={formData.instagram} onChange={handleChange} />
        </div>
        <div className="input-container add-link-twitter ">
          <i className="fab fa-twitter" id="twitter-edit-icon"></i>
          <input type="text" name="twitter" className="link twitter-link" placeholder="Your twitter profile Link" value={formData.twitter} onChange={handleChange} />
        </div>
        <div className="input-container add-link-linkedin ">
          <i className="fab fa-linkedin" id="linkedin-edit-icon"></i>
          <input type="text" name="linkedin" className="link linkedin-link" placeholder="Your Linkedin Profile Link" value={formData.linkedin} onChange={handleChange} />
        </div>

        <div className="add-social-submit-buttons">
          {linkName === "editsociallinks" ? < button className="social-submit-button" onClick={handleSocialUpdate} >Update</button > : < button className="social-submit-button" onClick={handleSocialSubmit} > Submit</button >}
          <a href={`/profile/${id}`} className="social-submit-cancle">Cancle</a>
        </div>

      </div>
    </>
  )
}

export default AddSocial









