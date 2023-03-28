/* eslint-disable no-undef */
import React from "react";
import { Outlet } from "react-router-dom";
import "./index.css";
import img from "../../img/Isolation_Mode.png";
import img2 from "../../img/Layer_1.png";
import ImageLayout from '../../Components/ImageLayouts.jsx';
import { useLocation } from "react-router-dom";
const Signinup = () => {
  const location = useLocation();
  return (
    <div className="grid-container">
      <div className="modal">
        <Outlet />
        <ImageLayout
          img={location.pathname === "/login" ? img : img2}
          children="chat with each other anytime, anywhere"
          customStyle="text"
          classname="grid-item"
        />
      </div>
    </div>
  );
};

export default Signinup;
