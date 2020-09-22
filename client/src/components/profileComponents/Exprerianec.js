import React from 'react'


function Exprerianec({ data, skills, company, website }) {
  //console.log(data)
  console.log(skills);

  const skillDom = skills.map((el, index) => <div className="skill" key={index}>{el}</div>)
  console.log(skillDom);
  return (
    <div className="container bio-container">
      <div className="bio-about-container">
        <h1 className="bio-heading">
          About
      </h1>

        <p className="bio-pragraph">
          {data}
          {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse iste officiis accusamus aliquam corrupti iure sit! Vel quibusdam cum adipisci doloremque esse delectus nesciunt? Amet culpa inventore eius, vitae, dolorem cupiditate ipsum earum beatae reiciendis veritatis magnam quos, perferendis pariatur rerum nulla officiis! Sequi illum nulla unde tempora necessitatibus eos laborum deserunt, distinctio vero sed dignissimos ipsam corrupti consectetur doloribus! */}
        </p>
      </div>
      {/* <div className="bio-skills-container">
        <h1 className="skill-heading">Skills</h1>
        <div className="skill-elements">
          {skillDom}
        </div>

      </div> */}
      {company ? (
        <div className="bio-company-conatiner">
          <h1 className="company-heading">Company</h1>
          <a href={`${company}`} className="about-company-link">Visit</a>
        </div>
      ) : null}

      {website ? (
        <div className="bio-website-container">
          <h1 className="website-heading">Website</h1>
          <a href={`${website}`} className="about-website-link" target="_blank">Visit</a>
        </div>
      ) : (
          <div className="bio-website-container">
            <h1 className="website-heading">Website</h1>
            <a href={`${website}`} className="about-website-link" target="_blank">Visit</a>
          </div>
      )}
    </div>
  )
}

export default Exprerianec
