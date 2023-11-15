
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
  const reportId = queryParams.get('reportId');
  const embedUrl = queryParams.get('embedUrl');
  const token = queryParams.get('token');
  const name = queryParams.get('reportname');
  const username=queryParams.get('username')
  console.log(username,'name')
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
    navigate(`/list?username=${username}`);
  };
  const handleLogout = () => {
    // Then navigate to the login page
    navigate('/');
  };
//  used to return the  response of  elements depending on where it is used.
  return (
    <div>
 <nav className="navbar navbar-expand-lg bg-light bottom-border">
            <div className="container-fluid">
                <a className="navbar-brand ps-2" href="#"><Image className="" onClick={handleBackToList} style={{width:"140px"}} src="Logo.png"/><span className="sub-span">Intelligence Tool</span></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="nav-end">
                        <ul className="list-inline" style={{margin:"0px"}}>
                           
                            <li className="list-inline-item" style={{ position: "relative" }}>
                                <i className="fa fa-bell-o bell-icon" aria-hidden="true"></i>
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
<div className="consumer-analysis bottom-border">

  
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-10">
                            <div>
                                <ul class="list-inline ul-zero pt-1">
                                    <li class="list-inline-item ver-middle right-lined right-line"><i class="fa fa-arrow-left arrow-backs cursor" aria-hidden="true" onClick={handleBackToList} ></i></li>
                                    <li class="list-inline-item ver-middle ps-2"> <p className="market-text">{name}</p></li>
                                </ul>
                            </div>
                            <span></span>
                        </div>
                        {/* <div className="col-md-2">
                            <div className="w-125" style={{float: 'right'}}>
                                <p className="maximum-view"><i class="fa fa-expand pe-1" aria-hidden="true"></i> Maximize</p>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
            {/* <div>
                <div className="bottom-border">
                    <div className="container-fluid padd-left">
                    <div className="row">
                        <div className="col-md-6">
                            <ul className="nav nav-pills tabs-bg w-723 " id="pills-tab" role="tablist">
                                <li className="nav-item right-white" role="presentation">
                                    <button className="nav-link" id="market-data-tab" data-bs-toggle="pill" data-bs-target="#market-data" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Market Data</button>
                                </li>
                                <li className="nav-item right-white" role="presentation">
                                    <button className="nav-link active" id="cunsumer-data-tab" data-bs-toggle="pill" data-bs-target="#cunsumer-data" type="button" role="tab" aria-controls="cunsumer-data" aria-selected="false">Consumer Data</button>
                                </li>
                                <li className="nav-item right-white" role="presentation">
                                    <button className="nav-link" id="historical-tab" data-bs-toggle="pill" data-bs-target="#historical" type="button" role="tab" aria-controls="historical" aria-selected="false">Historical Trends</button>
                                </li>

                                <li className="nav-item right-white" role="presentation">
                                    <button className="nav-link" id="fed-funds-tab" data-bs-toggle="pill" data-bs-target="#fed-funds" type="button" role="tab" aria-controls="fed-funds" aria-selected="false">Fed Funds</button>
                                </li>
                                <li className="nav-item right-white" role="presentation">
                                    <button className="nav-link" id="daily-treasury-tab" data-bs-toggle="pill" data-bs-target="#daily-treasury" type="button" role="tab" aria-controls="daily-treasury" aria-selected="false">Daily Treasury</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="rates-tab" data-bs-toggle="pill" data-bs-target="#rates" type="button" role="tab" aria-controls="rates" aria-selected="false">Rates</button>
                                </li>
                                
                            </ul>
                        </div>
                        <div className="col-md-6">
                            <div className="text-end top-10">
                                <p className="last-refresh"><span className="light-text">Last Refresh</span>:  9/20/2023  &nbsp; 12:16:12pm</p>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                
                 <div className="tab-content" id="pills-tabContent">
                    <div className="tab-pane fade" id="market-data" role="tabpanel" aria-labelledby="market-data-tab" tabindex="0">...</div>
                    <div className="tab-pane fade show active" id="cunsumer-data" role="tabpanel" aria-labelledby="cunsumer-data-tab" tabindex="0">...</div>
                    <div className="tab-pane fade" id="historical" role="tabpanel" aria-labelledby="historical-tab" tabindex="0">...</div>

                    <div className="tab-pane fade" id="fed-funds" role="tabpanel" aria-labelledby="fed-funds-tab" tabindex="0">...</div>
                    <div className="tab-pane fade" id="daily-treasury" role="tabpanel" aria-labelledby="daily-treasury-tab" tabindex="0">...</div>
                    <div className="tab-pane fade" id="rates" role="tabpanel" aria-labelledby="rates-tab" tabindex="0">...</div>
                </div> 
            </div> */}









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

