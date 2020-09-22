import React from 'react';
import "../../styles/Education.css";
import axios from "axios";
import { getEducation } from '../../redux/education/educationAtion';
import { connect } from "react-redux";

function EducationSubSection({ data, key, id, getEducation }) {

  const handleDeleteEducation = () => {
    const isTrue = window.confirm(" Are You Sure?");
    if (isTrue === true) {
      deleteEducation();
      getEducation(id);

    }
  }

  const deleteEducation = async () => {
    try {
      await axios.delete(`/api/v1/profile/${id}/${data._id}`);
      //console.log('deleted')
      getEducation(id);
    } catch (error) {
      console.log(error);
    }
  }

  //console.log(data.from.split("T")[0]);
  return (

    <div className="education-container-main">
      <div className="education-settings">
        <a href={`/profile/${id}/editeducation/${data._id}`} className="edit-education"><i className="far fa-edit" id="edit-education-icon"></i></a>
        <button className="delete-education" onClick={handleDeleteEducation}><i className="fas fa-trash-alt" id="delete-education-icon"></i></button>
      </div>
      <div className="school-name ">
        <span className="school data-title">School</span>
        <span className="school-data data-value"> {data.school}</span>
      </div>
      <div className="degree">
        <span className="degree data-title">Degree</span>
        <span className="degree-data data-value"> {data.degree}</span>
      </div>
      <div className="fieldofstudy">
        <span className="fieldofstudy data-title">Field Of Study</span>
        <span className="fieldofstudy-data data-value"> {data.fieldofstudy}</span>
      </div>
      <div className="education-description">
        <span className="description data-title">description</span>
        <span className="description-data data-value"> {data.description}</span>
      </div>
      <div className="from">
        <span className="from data-title">From</span>
        <span className="from-data data-value"> {data.from.split("T")[0]}</span>
      </div>
      <div className="to">
        <span className="to data-title">To</span>
        <span className="to-data data-value"> {data.to.split("T")[0]}</span>
      </div>
    </div>
  )
}
const mapStateToDispatch = dispatch => {
  return {
    getEducation: (id) => dispatch(getEducation(id))
  }
}


export default connect(null, mapStateToDispatch)(EducationSubSection);

//export default EducationSubSection
