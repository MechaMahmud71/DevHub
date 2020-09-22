import React from 'react'

function Repo({ value }) {
  //console.log(value)
  return (
    <div className="repo-container">
      <div className="repo-upper">
        <div className="repo-heading">
          <i className="fas fa-book"></i><span className="repo-heading-text">{value.name}</span>
        </div>
      </div>
      <div className="repo-middle">
        <p className="repo-description">{value.description}</p>
      </div>
      <div className="repo-bottom">
        <div className="repo-strat">
          <div className="language">{value.language}</div>
          <div className="star"><i className="fas fa-star"></i><span className="github-repo-star">{value.stars}</span></div>
          <div className="fork-count"><i className="fas fa-code-branch"></i><span className="github-repo-fork">{value.forks}</span></div>
        </div>
        <div className="repo-link">
          <a href={`${value.link}`} target="_blank" rel="noopener noreferrer" className="github-repo-link"><i className="fas fa-external-link-alt" id="link"></i></a>
        </div>
      </div>

    </div>
  )
}

export default Repo
