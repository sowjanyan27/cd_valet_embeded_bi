
/// <summary>
/// File Name : login.js
/// Created By : 
/// Purpose : dashborad page once application has been run login page will be displayed 
/// </summary>
/// <returns></returns>
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { Image} from "react-bootstrap";
import './index.css';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: '', password: '' });
    const { username, password } = formData;
//click event for the login
    // const handleLogin = () => {
    //     // If login is successful, set the user data as query parameters and navigate to the list page
    //     // const userData = { username: 'password', email: 'user@example.com' };
    //     // navigate(`/list?username=${userData.username}&email=${userData.email}`);
    //     navigate(`/list?username=${username}&password=${password}`);
    //     console.log(username,password)
    //   }
// login function to  with username and password
    const handleLogin = () => {
        // If login is successful, set the user data as query parameters and navigate to the list page
        const userData = { password: 'powerbi', username: 'powerbi' };
        navigate(`/list?username=${userData.username}`);
      }
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        console.log(name,'name')
        setFormData({ ...formData, [name]: value });
        console.log(formData,'formdata')
      }
  return (
   <div className="login-from">
    <div className="container-fluid p-0">
        <div className="row">
            <div className="col-md-6 pe-0">
                <div className="login-gradient h-100 height-100">
                    <div className="intelligence-right">
                        <h2 className="intelligence-text">Intelligence Tool</h2>
                        <Image className="" src="login-banner.png"/>
                    </div>
                </div>
            </div>
            <div className="col-md-6 relative ps-0">
                <div className="form center-from">
                    <Image style={{width: "180px"}} className="" src="Logo.png"/><span className="sub-span">Intelligence Tool</span>
                    <span className="logined">Login</span>
                    <p className="common-p">Enter your credentials to access your account</p>
                    <label className="label-input">Username</label>
                    <input type="email" 
                    name="username" 
                    placeholder="Enter Username" 
                    className="form--input" 
                    // value={formData.username}
                    // onChange={handleInputChange}
                    />
                    <label className="label-input">Password</label>
                    <input type="password" name="password" placeholder="Enter Password" className="form--input"
                    // value={formData.password}
                    // onChange={handleInputChange}
        />
                    
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form--marketing">
                                <input id="okayToEmail" type="checkbox"/>
                                <label htmlFor="okayToEmail" className="checkbox">
                                Remember information
                                </label>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="text-end">
                            <a className="forgot" style={{color:"#47b7cd"}} href="#">Forgot Password?</a>  
                            </div>
                        </div>
                    </div>
                    <button className="form--submit" onClick={handleLogin}>
                        Login
                    </button>
                </div>
                <p className="copy-right">2023 CD Valet, All right Reseved</p>
            </div>
        </div>
    </div>
   </div>

    
    

  );
}

export default Login;


