import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import Social from "./profileComponents/Social";
import Nav from "./Nav";
import Post from "./Post";
import Experience from "./profileComponents/Exprerianec";
import "../styles/Loader.css"
import "../styles/Profile.css";
import Education from './profileComponents/Education';
import GitRepo from './profileComponents/GitRepo';
import { getEducation } from '../redux/education/educationAtion';



function PersonProfile({ education, getEducation }) {
  const { id } = useParams();
  const initialSocialState = {
    youtube: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: ""
  }

  // the comments will we used later inshaAllah

  //console.log(education)

  const [userName, setUserName] = useState('');
  // const [githubName, setGithubName] = useState('');
  const [avater, setAvater] = useState('');
  const [posts, setPosts] = useState([]);
  const [bio, setBio] = useState('');
  const [company, setCompany] = useState('');
  //const [education, setEducation] = useState([]);
  // const [experience, setExperiance] = useState([]);
  const [skills, setSkills] = useState('');
  const [social, setSocial] = useState(initialSocialState);
  const [website, setWebSite] = useState();
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState('');
  const [myId, setMyId] = useState("");


  useEffect(() => {
    getProfile();
    getEducation(id);
    getMyProfile()
  }, [])

  const getProfile = async () => {
    try {
      const { data } = await axios.get(`/api/v1/profile/${id}`);
      //console.log(data)
      setLoading(false);
      setUserName(data.data.user.name);
      setUserId(data.data.user._id);
      // setGithubName(data.data.githubusername);
      setPosts(data.data.posts);
      setBio(data.data.bio);
      setCompany(data.data.company);
      //setEducation(data.data.education);
      // setExperiance(data.data.experience);
      setSkills(data.data.skills);
      setSocial(data.data.social);
      setWebSite(data.data.website);
      if (data.repos) {

        setRepositories(data.repos);
        setAvater(data.repos[0].avater);
      }
    } catch (error) {
      console.log(error)
    }


  }
  console.log(skills)
  const getMyProfile = async () => {
    try {
      const { data: { data: { _id } } } = await axios.get('/api/v1/profile/me');
      //console.log(_id);
      setMyId(_id);
    } catch (error) {
      console.log(error);
    }

  }

  const handleEvent = (stringOne, stringTwo) => {
    let classArrayOne = ["profile-middle-upper-post", "profile-middle-upper-bio", "profile-middle-upper-repos", "profile-middle-upper-education"];
    let classArrayTwo = ["profile-posts", "profile-experience", "profile-education", "profile-github-repo"];

    classArrayOne = classArrayOne.filter(el => el !== stringOne);
    classArrayTwo = classArrayTwo.filter(el => el !== stringTwo);


    document.querySelector(`.${stringOne}`).style.borderBottom = "2px solid rgb(0, 112, 243)";
    document.querySelector(`.${stringTwo}`).style.display = "block";

    classArrayOne.forEach(el => {
      document.querySelector(`.${el}`).style.borderBottom = "none"
    })

    classArrayTwo.forEach(el => {
      document.querySelector(`.${el}`).style.display = "none";
    })

  }
  const addSocialLink = <a href={`/profile/${id}/addsociallinks`} className="add-social-links">Add Social Links</a>
  const loader = <span className="loader"></span>
  const socialLinks = social ? <Social social={social} id={id} /> : addSocialLink
  const domPost = posts.map((el, index) => <Post post={el} key={index} testProp="profile" userName={userName} profile_Id={id} userId={userId} />);
  const domExperiance = <Experience data={bio} commpany={company} skills={skills} website={website} />
  const domEducation = <Education data={education} id={id} />
  const domGitRepo = <GitRepo data={repositories} />



  if (loading) return loader
  return (
    <>
      <Nav prop="profile" avater={avater} />
      <div className="profile-main">
        {myId === id ? (
          <div className="profile-settings">
            <a href={`/profile/${id}/updateprofile`} className="profile-update-profile-link"><i className="fas fa-edit" id="edit-profile-icon"></i></a>

          </div>
        ) : null}
        <div className="profile-upper">
          <div className="profile-upper-avater">
            {avater.length > 0 ? (
              <img src={avater} alt="avatar" className="avater-image" />
            ) : (
                <div className="profile-avater-null"></div>
              )}
          </div>
          <div className="profile-upper-username">{userName}</div>

          {socialLinks}

        </div>
      </div>
      <div className="container profile-container">
        <div className="profile-middle">
          <div className="profile-middle-upper-post" onClick={() => handleEvent("profile-middle-upper-post", "profile-posts")}>Posts</div>
          <div className="profile-middle-upper-bio" onClick={() => handleEvent("profile-middle-upper-bio", "profile-experience")}>About</div>
          <div className="profile-middle-upper-repos" onClick={() => handleEvent("profile-middle-upper-repos", "profile-github-repo")}>GitHub Repos</div>
          <div className="profile-middle-upper-education" onClick={() => handleEvent("profile-middle-upper-education", "profile-education")}>Education</div>
        </div>
        <div className="profile-posts">
          {domPost}
        </div>
        <div className="profile-experience">
          {domExperiance}
        </div>
        <div className="profile-education">
          {domEducation}
        </div>
        <div className="profile-github-repo">
          {domGitRepo}
        </div>
      </div>
      <div className="footer" style={{ height: "50px" }}></div>
    </>
  )
}

const mapStateToProps = state => {
  return {
    education: state.education.education
  }
}

const mapStateToDispatch = dispatch => {
  return {
    getEducation: (id) => dispatch(getEducation(id))
  }
}


export default connect(mapStateToProps, mapStateToDispatch)(PersonProfile);






