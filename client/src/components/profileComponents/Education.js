import React from 'react'
import EducationSubSection from "./EducationSubSection";
function Education({ data, id }) {

  const eduDivs = data.map(el => <EducationSubSection data={el} key={el._id} id={id} />)


  return (
    <>
      <div className="education-container">
        {eduDivs}

      </div>
      <div className="education-add-education">
        <a href={`/profile/${id}/addeducation`} className="add-education-button" >
          <i className="fas fa-plus-circle" id="add-education-plus-icon"></i>
          <p className="add-education-link-text">Add Education</p>
        </a>
      </div>
    </>
  )
}

export default Education
