import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from "./redux/store";
import './styles/App.css';
import Landing from './components/Landing';
import Signup from './components/Signup';
import SingIn from './components/SingIn';
import Dashboard from './components/Dashboard';
import ForgetPassword from './components/ForgetPassword';
import Profile from './components/Profile';
import EditPost from './components/EditPost';
import PersonProfile from "./components/PersonProfile"
import AddSocial from "./components/createProfile/AddSocial";
import AddEducation from "./components/createProfile/AddEducation";


function App() {
  return (

    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/signin" component={SingIn} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/" exact component={Landing} />
          <Route path="/forgetpassword" exact component={ForgetPassword} />
          <Route path="/editpost/:id" component={EditPost} />
          <Route path="/create-profile" exact component={Profile} />
          <Route path="/profile/:id" exact component={PersonProfile} />
          <Route path="/profile/:id/updateprofile" exact component={Profile} />
          <Route path="/profile/:id/addsociallinks" exact component={AddSocial} />
          <Route path="/profile/:id/editsociallinks" exact component={AddSocial} />
          <Route path="/profile/:id/addeducation" exact component={AddEducation} />
          <Route path="/profile/:id/editeducation/:educationId" exact component={AddEducation} />

        </Switch>
      </Router>
    </Provider>

  );
}

export default App;










