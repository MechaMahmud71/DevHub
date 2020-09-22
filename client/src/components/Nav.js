import React from 'react';

import '../styles/Nav.css'

import NavNotAuth from "./navComponent/NavNotAuth";
import NavAuth from "./navComponent/NavAuth";



function Nav({ prop, avater }) {




  let navContent = prop === "dashboard" ? <NavAuth avater={avater} /> : <NavNotAuth ownProp="dashboard" />
  navContent = prop === "landing" ? <NavNotAuth /> : <NavAuth avater={avater} />



  return (



    <div className="nav">

      <div className="container nav-container">

        {navContent}

      </div>
    </div>

  )
}

export default Nav