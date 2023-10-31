
/// <summary>
/// File Name : ReportList.js
/// Created By : 
/// Purpose : To display the  list of  report names
/// </summary>
/// <returns>  gives the  json data (reports(array-object) and token)</returns>
import React, { useState, useEffect } from 'react';
import { Image} from "react-bootstrap";
import { useLocation } from 'react-router-dom';
import { Link ,useNavigate} from 'react-router-dom';// third part package need ti install(npm install react-router-dom@latest)
import { PowerBIService } from './api/powerbiapi'; // importing the service  
const ReportList = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const username = queryParams.get('username');
  console.log(username,'username')
  // useNavigate used to navigate to different component
  const navigate = useNavigate();
  const [responseConfig, setResponseConfig] = useState({
    reports: [],
    EmbedToken: '',
  });
  //useState that allows you to add state to a functional component
  // ex:reports is the current state and setReports() is the function that updates the state.
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [loading, setLoading] = useState(false);
  //It is used to handle  the  fetching data, updating the DOM

  useEffect(() => {
    async function fetchData() {
      try {
        const url = await PowerBIService.getAll(); // Assuming this function returns the URL
        const response=url
        console.log(response,'response')
        setResponseConfig(response);
      } catch (error) {
        console.error(error);
      }
    }
  
    fetchData();
  }, []); 


// logout function   after logout it redirects to  dashboard
const handleLogout = () => {
  // Then navigate to the login page
  navigate('/');
};
//  used to return the  response of  elements depending on where it is used.
return(
<div className="header-view">
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#"><Image className="" style={{width:"140px"}} src="Logo.png"/><span className="sub-span">Intelligence Tool</span></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="nav-end">
                        <ul className="list-inline" style={{margin:"0px"}}>
                            <li className="list-inline-item">
                                <i className="fa fa-bell-o bell-icon" style={{position:'relative'}} aria-hidden="true"></i>
                                <span className="notification">2</span>
                            </li>
                            <li className="list-inline-item">
                                <i className="fa fa-cog bell-icon" aria-hidden="true"></i>
                            </li>
                            <li className="list-inline-item">
                                <div className="d-flex align-items-center">
                                    <div className="flex-shrink-0">
                                    <div className="user-log">
                                            <Image className="user-img cursor" src="images.jpeg" alt="..."/>
                                            <div className="logout-view">
                                                <i className="fa fa-caret-up logout-up-icon"  aria-hidden="true"></i>
                                                <div className="list-items-sign">
                                                    <ul  className="list-unstyled">
                                                        <li><i className="fa fa-sign-out" aria-hidden="true"></i>
                                                        <a className="login-href" onClick={handleLogout}>
                                                            <span>Logout</span>
                                                        </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                    {username}
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                
                
                </div>
            </div>
        </nav>

        <div className="body-main">
            <div className="banner-sec">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="banner-text ps-2">
                                <h4> Hi {username},</h4>
                                <h3>Welcome Back</h3>
                            </div>
                        </div>
                        <div className="col-md-6 text-end">
                            <div className="img-john">
                                <Image className="img-back" src="banner-img1.png"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottom-cards">
                <div className="container-fluid">
                    <div className="row">
                    {responseConfig.reports.map((report, index) => (
                        <div className="col-md-2 w-20">
                            <div>
                                <div className="card">
                                    <div className="header mb-2">
                                        <span className="icon">
                                            <Image className="" style={{width:"30px"}} src="Digital.png"/>
                                        </span>
                                    </div>
                                    <Link key={index} to={`/report?reportId=${report.Id}&embedUrl=${report.EmbedUrl}&token=${responseConfig.token}&reportname=${report.Name}&username=${username}`}>
                                    <a className="message" style={{width:'200px'}}>
                                        {report.Name}
                                    </a>
                                    </Link>
                                    {/* <span className="reports">5 Reports </span> */}
                                    
                                </div>
                            </div>
                        </div>
                         ))}
                    </div>
                </div>
            </div>
        </div>
    </div>

)
};

export default ReportList;
