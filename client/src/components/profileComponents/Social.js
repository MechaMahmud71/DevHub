
import React, { useState, useEffect } from 'react'
import "../../styles/Social.css"
import axios from 'axios';
function Social({ social, id }) {
  //console.log(social);

  const [myId, setMyId] = useState("");

  useEffect(() => {
    getProfile();
  }, [])

  const getProfile = async () => {
    try {
      const { data: { data: { _id } } } = await axios.get('/api/v1/profile/me');
      //console.log(_id);
      setMyId(_id);
    } catch (error) {
      console.log(error);
    }

  }
  return (
    <div className="socialLink-container">
      <div className={social.youtube && social.youtube.length > 0 ? "socialLink youtube-active" : "socialLink youtube-hide"}>
        <a href="http://www.youtube.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube" id="youtube-icon"></i></a>
      </div>
      <div className={social.facebook && social.facebook.length > 0 ? "socialLink facebook-active" : "socialLink facebook-hide"}>
        <a href="http://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook" id="facebook-icon"></i></a>
      </div>
      <div className={social.linkedin && social.linkedin.length > 0 ? "socialLink linkedin-active" : "socialLink linkedin-hide"}>
        <a href="http://linkedin.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin" id='linkedin-icon'></i></a>
      </div>
      <div className={social.instagram && social.instagram.length > 0 ? "socialLink instagram-active" : "socialLink instagram-hide"}>
        <a href="http://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram" id="instagram-icon"></i></a>
      </div>
      <div className={social.twitter && social.twitter.length > 0 ? "socialLink twitter-active" : "socialLink twitter-hide"}>
        <a href="http://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter" id="twitter-icon"></i></a>
      </div>
      {id === myId ? (
        <div className="edit-social-links">
          <a href={`/profile/${id}/editsociallinks`}><i className="fas fa-plus-circle" id="plus-icon"></i></a>
        </div>
      ) : null}

    </div>
  )
}

export default Social
