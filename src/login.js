
/// <summary>
/// File Name : login.js
/// Created By : 
/// Purpose : dashborad page once application has been run login page will be displayed 
/// </summary>
/// <returns></returns>
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image } from "react-bootstrap";
import './index.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: '', password: '' });
    const { username, password } = formData;
    //click event for the login
    const handleLogin = () => {
        if (!username) {
          toast.error('Please enter username.');
          return;
        }
      
        if (!password) {
          toast.error('Please enter password.');
          return;
        }
        if(username !== 'cdvaletadmin' && password !== 'apexon'){
            toast.error('Please enter valid username and password.');
            return;
        }
        else if(username !== 'cdvaletuser' && password !== 'apexon'){
            toast.error('Please enter valid username and password.');
            return;
        }
        // If both username and password are provided, you can proceed with the login logic
        navigate(`/list`);
        sessionStorage.setItem('username',username);
      }


 

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        console.log(name, 'name')
        setFormData({ ...formData, [name]: value });
        console.log(formData, 'formdata')
    }
    return (
        // <div className="login-from">
        //     <div className="container-fluid p-0">
        //         <div className="row">
        //             <div className="col-md-6 pe-0">
        //                 <div className="login-gradient h-100 height-100">
        //                     <div className="intelligence-right">
        //                         <h2 className="intelligence-text">Intelligence Tool</h2>
        //                         <Image className="" src="login-banner.png" />
        //                     </div>
        //                 </div>
        //             </div>
        //             <div className="col-md-6 relative ps-0">
        //                 <div className="form center-from">
        //                     <Image style={{ width: "180px" }} className="" src="Logo.png" /><span className="sub-span">Intelligence Tool</span>
        //                     <span className="logined">Login</span>
        //                     <p className="common-p">Enter your credentials to access your account</p>
        //                     <label className="label-input">Username</label>
        //                     <input type="email"
        //                         name="username"
        //                         placeholder="Enter Username"
        //                         className="form--input"
        //                         value={formData.username}
        //                         onChange={handleInputChange}
        //                     />
        //                     <label className="label-input">Password</label>
        //                     <input type="password" name="password" placeholder="Enter Password" className="form--input"
        //                         value={formData.password}
        //                         onChange={handleInputChange}
        //                     />

        //                     <div className="row">
        //                         <div className="col-md-6">
        //                             <div className="form--marketing">
        //                                 <input id="okayToEmail" type="checkbox" />
        //                                 <label htmlFor="okayToEmail" className="checkbox">
        //                                     Remember information
        //                                 </label>
        //                             </div>
        //                         </div>
        //                         <div className="col-md-6">
        //                             <div className="text-end">
        //                                 <a className="forgot" style={{ color: "#47b7cd" }} href="#">Forgot Password?</a>
        //                             </div>
        //                         </div>
        //                     </div>
        //                     <button className="form--submit" onClick={handleLogin}>
        //                         Login
        //                     </button>
        //                 </div>
        //                 <p className="copy-right">2023 CD Valet, All right Reseved</p>
        //             </div>
        //         </div>
        //     </div>
        // </div>


        <section>
        <div className="content">

            <div className="left">
                <div className="intelligence-right">
                    <h2 className="intelligence-text">Intelligence Tool</h2>
                    <Image className="" src="login-banner.png"/>
                </div>
            </div>

            <div className="right">
                <div className="right-width">

                    <div className="">
                        <Image style={{width: "180px"}} className="" src="Logo.png"/><span className="sub-span">Intelligence Tool</span>
                        <span className="logined">Login</span>
                        <p className="common-p">Enter your credentials to access your account</p>
                        <label className="label-input">Username</label>
                        <input type="email"
                                name="username"
                                placeholder="Enter Username"
                                className="form--input"
                                value={formData.username}
                                onChange={handleInputChange}
                            />
                        <label className="label-input">Password</label>
                        <input type="password" name="password" placeholder="Enter Password" className="form--input"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                        
                        <div className="row">
                            <div className="col-7">
                                <div class="form--marketing">
                                    <input id="okayToEmail" type="checkbox"/>
                                    <label for="okayToEmail" className="checkbox">
                                    Remember information
                                    </label>
                                </div>
                            </div>
                            <div className="col-5">
                                <div className="text-end">
                                <a className="forgot" style={{color:"#47b7cd"}} href="#">Forgot Password?</a>  
                                </div>
                            </div>
                        </div>
                        <button className="form--submit" onClick={handleLogin}>
                            Login
                        </button>

                        <p className="copy-right">2023 CD Valet, All right Reseved</p>
                    </div>
                </div>
            </div>

        </div>
        </section>



    );
}

export default Login;



