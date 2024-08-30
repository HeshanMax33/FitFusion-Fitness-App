import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './NavigationBarB.css';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import UserContext from "../ContextComponent/ContextComponent";

export default function NavigationBarB(props) {

    const location = useLocation()
    const navigate = useNavigate()
    const params = useParams();
    const id = props.id

    const { user } = useContext(UserContext);
    console.log(user)

    //   const MyWorkouts = () => {
    //     let path = `/MyWorkouts`;
    //     navigate(path);
    //   };

    //   const Home = () => {
    //     let path = `/`;
    //     navigate(path);
    //   }

    const hideHeader = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/add' || location.pathname === '/';

    if (hideHeader) {
        return null; // Render nothing if header should be hidden
    }

    //Log out function
    function logOut() {
        localStorage.clear();
    }

    //Home pages Control
    const HomepagesHandle = async () => {
        if (user.Fullname) {
            if (user.UserType === "Unregistered User") {
                window.location.href = `/`;
            }
            else if (user.UserType === "Registered User") {
                window.location.href = `/`;
            }
           
        }

    }

    return (
        <>
            <div className='NavigationBarB'>
                <nav className="NavigationBarB navbar navbar-expand-lg bg-body-tertiary">
                    <div className="NavigationBarB container-fluid">
                        <a className="NavigationBarB navbar-brand" onClick={HomepagesHandle}><h1 className='firfheader'>FitFusion</h1></a>
                        <button className="NavigationBarB navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="NavigationBarB navbar-toggler-icon"></span>
                        </button>
                        <div className="NavigationBarB collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="NavigationBarB navbar-nav">
                                <li className="NavigationBarB nav-item">
                                    <a className="NavigationBarB nav-link" onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href = `/home`
                                    }}>HOME</a>
                                </li>
                                <li className="NavigationBarB nav-item">
                                    <a className="NavigationBarB nav-link" onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href = `/workoutPlan`
                                    }}>WORKOUT PLAN</a>
                                </li>
                                <li className="NavigationBarB nav-item">
                                    <a className="NavigationBarB nav-link" onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href = `/currentWorkout`
                                    }}>CURRENT WORKOUT</a>
                                </li>
                                <li className="NavigationBarB nav-item">
                                    <a className="NavigationBarB nav-link" onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href = `/viewmealplan`
                                    }}>MEAL PLANS</a>
                                </li>
                            </ul>
                            <ul className="NavigationBarB navbar-nav ms-auto">
                                <li className="NavigationBarB nav-item">
                                    <div className="NavigationBarBarDropdown dropdown">
                                        <button className="NavigationBarB btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            {user.Username}
                                        </button>
    
                                        <ul className="NavigationBarB dropdown-menu dropdown-menu-dark">
                                            <li><a className="NavigationBarB dropdown-item" onClick={(e) => {
                                                e.preventDefault();
                                                window.location.href = `/profile/${user._id}`
                                            }}>My Profile</a></li>
                                            <li><a className="NavigationBarB dropdown-item" href="/login">Log out</a></li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
    
}    

