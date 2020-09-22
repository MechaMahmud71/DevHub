import React, { Fragment } from 'react'
import Hero from './landingComponent/Hero'
import Content from './landingComponent/Content';
import '../styles/landing.css'
import Nav from "./Nav";

function Landing() {
  return (
    <Fragment>
      <Nav prop="landing" />
      <Hero />
      <Content />

    </Fragment>
  )
}

export default Landing
