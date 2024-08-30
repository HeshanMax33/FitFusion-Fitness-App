import React from "react";
import '../index/index.css';

export default function Index(){
    return(
        <div className= "index_bg">
            <div>
                <h1 className="name">FitFusion</h1>
                <ul className="nav justify-content-end nav-underline">
                    <li className="nav-item1">
                        <a className="nav-link" href="/createmeal">LOGIN</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/login">SIGNUP</a>
                    </li>
                </ul>
            </div>
            <div className="he1">
                <p>GROW</p>
            </div>
            <div className="he2">
                <p>YOUR FITNESS</p>
            </div>
            <div className="he3">
                <p>TRANSFORM YOUR SELF</p>
            </div>
            <div className="he4">
                <p align="left">EMPOWERING FITNESS ENTHUSIASTS TO SHARE THEIR JOURNEY<br></br>
                FOR THE BEST WORKOUT YOURSELF AS YOU WANT</p>
            </div>
            {/* <div className="button-container">
                <a href="/login" className="btn login-btn">LOGIN</a>
                <a href="/add" className="btn signup-btn">SIGNUP</a>
            </div> */}
        </div>
    )
}
