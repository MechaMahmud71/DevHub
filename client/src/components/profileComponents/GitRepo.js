import React from 'react';
import Repo from './Repo';

function GitRepo({ data }) {
  //console.log(data);

  const domRepo = data.map((el, index) => <Repo value={el} key={index} />)


  return (
    <div className="container github-repo-container">
      <h1>Github Repository</h1>
      <div className="github-repo-main">
        {domRepo}
      </div>
    </div>
  )
}

export default GitRepo
