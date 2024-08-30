import React, {useEffect, useState, useContext} from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import '../login_page/login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserContext from '../ContextComponent/ContextComponent';


export default function Login(){

    const history = useNavigate();
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [UserType, setUserType] = useState("");

    async function submit(e){
        e.preventDefault();

        //Users
        let result = await fetch("http://localhost:8070/login", {
            method: 'post',
            body: JSON.stringify({Email, Password, UserType}),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        result = await result.json();
        console.log(result)
        setUser(result);
        console.warn(result)
        if (result.Fullname) {
            localStorage.setItem('newUser', JSON.stringify(result))
            if (result.UserType === "Seller") {
                history(`/SellerHome/${result._id}`, { state: { id:result.Fullname } })
                // window.location.href = `/seller_home/${result._id}`;
            }
            else if (result.UserType === "Registered User") {
                history(`/home/${result._id}`, { state: { name:result.Fullname } })
                // window.location.href = `/home/${result._id}`;
            }
            else if (result.UserType === "Trainer") {
                history(`/trainer_home/${result._id}`, { state: { id:result.Fullname } })
                // window.location.href = `/trainer_home/${result._id}`;
            }else if (result.UserType === "Admin") {
                history(`/adminHome`)
                // window.location.href = `/adminHome`;
            }
        } else {
            toast.warn('Please enter correct details..!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            console.log(e);
        }

    }

    return(
        <div className="login_page">
           
        </div>
    )
}