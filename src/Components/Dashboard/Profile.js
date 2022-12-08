import React, { useState, useContext, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DashNav from "./DashNav";

import yoga from "../../public/yoga-stance.png" 
import salad from "../../public/salad.png" 
import spa from "../../public/spa.png" 
import { retrieveToken } from "../../Firebase/firebase";


import "./Profile.css";

const API = process.env.REACT_APP_API_URL;

function Profile({ existingUser, setExistingUser }) {
  const [userPreferences, setUserPreferences] = useState(null);
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
 

  useEffect(() => {
    if (!user) {
      alert("No user, re-routing to the login page!");

      navigate("/login")
    }else{
      retrieveToken()
   
      if(!existingUser.email){
 

        axios
          .get(`${API}/users/${user.uid}`)
          .then((res) => setExistingUser(res.data.payload));
      }
    }
  }, [user]);

  return (
    <div className="profile-page">
      <DashNav existingUser={existingUser} setExistingUser={setExistingUser} />
      <div className="profile-main">
        <div className="profile-title">
          <h1>{existingUser.firstname}'s Profile</h1>
        </div>
        <div className="user-info">
          <div className="user-profile-left">
            <div className="user-details">
              <img
                className="user-photo"
                src="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-4.jpg"
              />
              <div className="details-list">

                <h5>
                  First Name: {""} {existingUser.firstname}
                </h5>
                <h5>
                  Last Name: {""} {existingUser.lastname}
                </h5>
                <h5>
                  Username: {""} {existingUser.username}
                </h5>
                <h5>
                  Email: {""} {existingUser.email}
                </h5>

              </div>
            </div>
            <div className="reminder-type-blocks">
              <h2>Your WellBell Preferences</h2>
              <div className="reminder-cards">
                <div
                  id="reminder-physical"
                  className={
                    userPreferences.physicalpreferences === true
                      ? "solid"
                      : "transparent"}>
                  <h5>Physical</h5>
                  <img className="physical" alt="self-care-img" src={yoga} />
                </div>
                <div
                  id="reminder-self-care"
                  className={
                    userPreferences.mentalpreferences === true
                      ? "solid"
                      : "transparent"}>
                  <h5>Self-Care</h5>
                  <img className="selfcare" alt="self-care-img" src={spa} />
                </div>
                <div
                  id="reminder-nutrition"
                  className={
                    userPreferences.nutritionalpreferences === true
                      ? "solid"
                      : "transparent"}>
                  <h5>Nutritional</h5>
                  <img
                    className="nutritional"
                    alt="self-care-img"
                    src={salad}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="points-bars"></div>
      </div>
    </div>
  );
}

export default Profile;
