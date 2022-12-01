import React from 'react';
import './App.css';
import Home from "./containers/Home/Home";
import AddPost from "./containers/AddFormPost/AddPost";
import About from "./containers/About/About";
import Contacts from "./containers/Contacts/Contacts";
import {NavLink, Route, Routes} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: 'lightgray'}}>
      <h3 style={{padding: "0px 16px", margin: '0'}}>My blog</h3>
      <ul className="nav">
        <li className="nav-item">
          <NavLink to={"/"} className={({ isActive }) => isActive ? 'nav-link disabled' : 'nav-link'}>Menu</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to={"/Add"} className={({ isActive }) => isActive ? 'nav-link disabled' : 'nav-link'}>Add</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to={"/About"} className={({ isActive }) => isActive ? 'nav-link disabled' : 'nav-link'}>About</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to={"/Contacts"} className={({ isActive }) => isActive ? 'nav-link disabled' : 'nav-link'}>Contacts</NavLink>
        </li>
      </ul>
      </div>
      <Routes>
        <Route path="/" element={(
          <Home/>
        )}/>
        <Route path="Add" element={(
          <AddPost/>
        )}/>
        <Route path="About" element={(
          <About/>
        )}/>
        <Route path="Contacts" element={(
          <Contacts/>
        )}/>
      </Routes>
    </div>
  );
}

export default App;
