
/// <summary>
/// File Name : ReportDetails.js
/// Created By : 
/// Purpose : To display   the content of the reports
/// </summary>
/// <returns></returns>
import { Image} from "react-bootstrap";
import React, { useEffect } from 'react';
import {  models } from 'powerbi-client';//power bi component 
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import { PowerBIEmbed } from 'powerbi-client-react';// power bi  component  to connect to react need to install the package
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './index.css';
import { login_redirect_url } from './config/indexapi';
const ReportDetails = (props) => {
//Dependencies//
//useLocation is a hook provided by the react-router-dom library that returns the location object that represents the current URL
//useNavigate  to navigate to different url
//methods to work with the query string of a URL
//querParams --- Accessing the parameters from  different component
  const location = useLocation();
  const isLoading = location.state === 'loading';
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const hashParams = new URLSearchParams(window.location.hash.slice(1));
const reports_token = hashParams.get('#id_token');
console.log(reports_token, 'reportstoken');
  const reportId = queryParams.get('reportId');
  const embedUrl = queryParams.get('embedUrl');
  const token = queryParams.get('token');
  const name = queryParams.get('reportname');
  const username=queryParams.get('username')
  console.log(username,'name')
  const authtoken=localStorage.getItem("id_token")
//  function to access the powerbi report template
  let  embedConfig= {
    type: 'report',
    id: reportId,
    embedUrl:embedUrl ,
    accessToken: token,
    tokenType: models.TokenType.Embed,
    settings: {
      panes: {
        filters: {
          expanded: false,
          visible: false
        }
      },
    }
  };
  console.log(embedConfig,'embedConfig')
  //It is used to handle  the  fetching data, updating the DOM
  useEffect(() => {
    console.log(reportId, embedUrl, token);
    const embedContainer = embedConfig
        console.log(embedContainer,'embedcontainer')
  }, [reportId, embedUrl, token]);
  
 // method to get back to the list where list of reports are there
  const handleBackToList = () => {
    console.log(username)
    navigate(`/list#${authtoken}`);
  };
  const handleLogout = () => {
    // Then navigate to the login page
    localStorage.removeItem('username')
    localStorage.removeItem('list_token')
    localStorage.removeItem('id_token')
    // Then navigate to the login page
    // window.open('https://account.cdvalet.com/cdvaletconsumer.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_Sign-in&client_id=0cccdb9a-36f3-4d61-a0ef-ad518b362af3&nonce=defaultNonce&redirect_uri=https://cdvaletembeddedui.azurewebsites.net/list&scope=openid&response_type=id_token&prompt=login', '_self', 'noreferrer');
    // navigate('/');
    window.open(`${login_redirect_url}`, '_self', 'noreferrer');
  };
//  used to return the  response of  elements depending on where it is used.
  return (
    <div>
 <nav className="navbar navbar-expand-lg bg-light bottom-border">
            <div className="container-fluid left-right-pad">
                <a className="navbar-brand" href="#"><Image className="logo-size" onClick={handleBackToList} src="Logo.png"/><span className="sub-span">Intelligence Tool</span></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="nav-end">
                        <ul className="list-inline" style={{margin:"0px"}}>
                           
                            {/* <li className="list-inline-item" style={{ position: "relative" }}>
                                <i className="fa fa-bell-o bell-icon" aria-hidden="true"></i>
                                <span className="notification">2</span>
                            </li>
                            <li className="list-inline-item">
                                <i className="fa fa-cog bell-icon" aria-hidden="true"></i>
                            </li> */}
                            <li className="list-inline-item">
                                <div className="d-flex align-items-center">
                                    <div className="flex-shrink-0">
                                    <div className="user-log relative">
                                            <Image className="user-img cursor" src="/user-icon.png" alt="..."/>
                                            {/* <span className="user-letter">{startingLetter}</span> */}
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
                                    <div className="flex-grow-1 ms-2">
                                    <p className="userprofile-name">{username}</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                
                
                </div>
            </div>
        </nav>
<div className="consumer-analysis bottom-border">

  
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-10">
                            <div>
                                <ul class="list-inline ul-zero pt-1">
                                    <li class="list-inline-item ver-middle right-lined right-line"><i class="fa fa-home arrow-backs cursor" aria-hidden="true" onClick={handleBackToList} ></i></li>
                                    <li class="list-inline-item ver-middle ps-2"> <p className="market-text">{name}</p></li>
                                </ul>
                            </div>
                            <span></span>
                        </div>
                        <div className="col-md-2">
                            <div className="w-125" style={{float: 'right'}}>
                                <p className="maximum-view"><i class="fa fa-expand pe-1" aria-hidden="true"></i> Maximize</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  
      <div className="container custome-container">
        <div className="row">
          {/* <div className="col-md-8">
          <h2 className="pb-3 title-card pt-5">{name}</h2>
          </div> */}
          <div className="col-md-12">
            <div style={{textAlign:'end'}}>

            {/* <button className=" backtolist mt-5 mb-2" onClick={handleBackToList}>Back to List</button> */}
            </div>

          </div>
        </div>
      </div>
     
      <div>
      </div>
        <div id="embedContainer"  className="reportContainer">
        <PowerBIEmbed // powerbi component to display 
          embedConfig={embedConfig}
          cssClassName={"reportClass"}
          
        />
      
  
  </div>
    </div>
  );
};

export default ReportDetails;

