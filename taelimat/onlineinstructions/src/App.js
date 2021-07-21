import { Provider } from "./Context";
import Login from "./components/Login";
import UserList from "./components/UserList";
import { Actions } from "./Actions";
import Logo from "./components/Rustics_logo"
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import TitleBlock from './components/TitleBlock';
import Mask_Image from './components/Mask_Image';
import SupplyList from './components/SupplyList';
import GeometricMacraweave from './pages/GeometricMacraweave';
import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, NavLink, Route, Switch, Redirect, withRouter} from 'react-router-dom';

function App() {
  const [user, setUser] = useState({});
  const [navBackground, setNavBackground] = useState('navBarTransparent')

  const navRef = React.useRef()
  navRef.current = navBackground

  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 10
      if(show) {
        setNavBackground('navBarSolid')
      } else {
        setNavBackground('navBarTransparent')
      }
    }  
      document.addEventListener('scroll', handleScroll)
      return () => {
        document.removeEventListener('scroll', handleScroll)
      }
  },[])

  return (
    <div className="App">
      <Router>
        <div className={navRef.current}>
            <HomeNavbar setUser={setUser} user={user}></HomeNavbar>
        </div>
        <div>
          <Main setUser={setUser} user={user}/>
        </div>
      </Router>
    </div>
  );
}

function HomeNavbar(props) {
    function logOut() {
      props.setUser({})
      localStorage.clear()
      window.location = 'https://Milliondollarmac.com'
    }
  const user = localStorage.getItem("user")
  return(
    <nav className="navbar navbar-expand">
      <div className='container'>
        <ul className="navbar-nav mr-auto">
        <a className="navbar-brand text-white" href="#">Rustics by TL</a>
          {localStorage.getItem("user") ? "" : <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/">Home</NavLink></li>}
          {localStorage.getItem("user") ? "" : <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/About">Profile</NavLink></li>}
        </ul>
        {
          localStorage.getItem("user") ?
          <ul className="navbar-nav ml-auto">
            <li className="navbar-brand text-white">{user}</li>
            <li className="nav-item"><a className="nav-link" href="javascript:void(null);" onClick={logOut}>Log out</a></li>
            <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/Delete">Delete account</NavLink></li>
          </ul>
          : ""
          // <ul className="navbar-nav ml-auto">
          // <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/Login">Log in to Spotify</NavLink></li>
          // </ul> 
          
        }
      </div>
    </nav>
  );
}

function Main(props) {
  return(
    <Switch>
      {/* <Route exact path="/" render={(p) => <Home {...p} user={props.user} setUser={props.setUser}/>} /> */}
      <Route exact path="/About" component={GeometricMacraweave} />
      <Route exact path="/Login" render={(p) => <Login {...p} user={props.user} />} />
    </Switch>
  );
}

export default App;