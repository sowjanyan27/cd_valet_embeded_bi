
/// <summary>
/// File Name : ReportList.js
/// Created By : 
/// Purpose : To display the  list of  report names
/// </summary>
/// <returns>  gives the  json data (reports(array-object) and token)</returns>
import { Spinner } from "react-bootstrap";
import React, { useState, useEffect } from 'react';
import { Image} from "react-bootstrap";
import { useLocation } from 'react-router-dom';
import { Link ,useNavigate} from 'react-router-dom';// third part package need ti install(npm install react-router-dom@latest)
import { PowerBIService } from './api/powerbiapi'; // importing the service  
import {fidev_url} from './config/indexapi';
import { login_redirect_url } from './config/indexapi';
const ReportList = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const username = localStorage.getItem('username');
  const startingLetter = username ? username.charAt(0).toUpperCase() : '';
  console.log(startingLetter,'startingletter')
  const urlParams = new URLSearchParams(window.location.hash);
  const tokenFromUrl = urlParams.get('#id_token');
console.log(username,'username')
const reports_token=localStorage.getItem("id_token")
const fidev_url_with_token = `${fidev_url}#id_token=${(reports_token)}`;
console.log(fidev_url_with_token)
//   sessionStorage.getItem(username);
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
  const [loading, setLoading] = useState(true);
 

  
  //It is used to handle  the  fetching data, updating the DOM
  useEffect(() => {

    async function fetchData() {
      try {
        const url = await PowerBIService.getAllReports();
        const response = url;
        console.log(response, 'response');


        const responseWithImages = {
          ...response,
          reports: response.reports.map((report) => ({
            ...report,
            imageUrl: getImageUrlById(report.Idd),
          })),
        };
        console.log(responseWithImages,'responseWithImages')
        const  roles= (localStorage.getItem('toolRoles'))
        console.log(roles,'roles')
        const filtered = response.reports.filter((obj1) =>
        roles.includes(obj1.Id)
        // roles.some((obj2) => obj2.id === obj1.id)
      );
      console.log(filtered,'arrayfilter')
        response.reports=filtered
        setResponseConfig(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Set loading to false when done (whether successful or not)
      }
    }
  
    // gettoken();
    fetchData();

  }, []);


  const getImageUrlById = (id) => {
    // Define a mapping of ids to image paths
    const idToImagePath = {
      'e6df1fe7-8ae3-4240-b9f9-2b0ff146a060': '/Group1.png', //cd market data
      'b0cd4acd-6ae6-4951-934d-970a1e955d0a': '/Internet.png', // Market and consumer overview
      'c0f68f89-ef0b-454f-ba32-656fa5a4483f': '/seoColor.png', // points in time chart
      'c45b08f4-5ba0-4b2f-a81b-378de161cd34': '/Group.png', // shopper analytics
      '07532612-1331-46fe-9ba1-d7e723765b6b':'/Digital.png', // Market and consumer Details
      '10f1babb-39d2-4436-88f2-2a22beedf63d':'/MarketandConsumerAnalytics-OverviewExternalFI.png'    ,// overview  External fi
      '174afd3f-35dd-4957-a3b8-fb132499143d':'/MarketandConsumerAnalytics-DetailsExternalFI.png',//Details External FI
      '7662b25b-f8f3-4564-9b5d-e25238ab2a04':'/Internet.png' ,//usage metrics
      'd0c07e85-dfcc-4f8d-9ce2-38cbc604483a':'/ReportUsageMetrics.png' ,//Report usage 
      '3ef559ef-937c-4617-b744-792bb2c2bb80':'/PrelimAnalytics.png' // prelims 

      // Add more id-image mappings as needed
    };
  
    // Use the mapped image path based on the report id
    return idToImagePath[id] || '/default.png'; // Adjust the default image path if needed
  };
  
  
  
  const handlebuttonclick=()=>{
    const reports_token=localStorage.getItem("id_token")
const fidev_url_with_token = `${fidev_url}?token=${encodeURIComponent(reports_token)}`;
console.log(fidev_url_with_token)
    window.open(fidev_url_with_token, '_self', 'noreferrer');
    // window.open(` ${fidev_url}`, '_self', 'noreferrer');
  }
// logout function   after logout it redirects to  dashboard
const handleLogout = () => {
  localStorage.removeItem('username')
  localStorage.removeItem('list_token')
  localStorage.removeItem('id_token')
  // Then navigate to the login page
  // window.open('https://account.cdvalet.com/cdvaletconsumer.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_Sign-in&client_id=0cccdb9a-36f3-4d61-a0ef-ad518b362af3&nonce=defaultNonce&redirect_uri=https://cdvaletembeddedui.azurewebsites.net/list&scope=openid&response_type=id_token&prompt=login', '_self', 'noreferrer');
  // navigate('/');
  window.open(`${login_redirect_url}`, '_self', 'noreferrer');
};
return (
    <div className="header-view">
      {loading ? ( // Display the loader for the entire header-view when 'loading' is true
         <div className="loader"> {/* Apply the loader class to the container */}
         <div className="spinner">
           <Spinner animation="border" variant="primary" />
         </div>
       </div>
      ) : (
        <>
          <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid left-right-pad">
              <a className="navbar-brand" href="#">
                <Image className="logo-size"  src="/Logo.png" />
                <span className="sub-span">Intelligence Tool</span>
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <div className="nav-end">
                
           
          
                  <ul className="list-inline" style={{ margin: "0px" }}>
                    {/* <li className="list-inline-item" style={{ position: "relative" }}>
                      <i className="fa fa-bell-o bell-icon" aria-hidden="true"></i>
                      <span className="notification">2</span>
                    </li>
                    <li className="list-inline-item">
                      <i className="fa fa-cog bell-icon" aria-hidden="true"></i>
                    </li> */}
                    {/* <li className="list-inline-item  " >
                    <button  className="user-btn" onClick={handlebuttonclick}>User Details</button>
                    </li>  */}
                    
                    <li className="list-inline-item">
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0">
                          
                          <div className="user-log relative">
                         
                            {/* <Image
                              className="user-img cursor"
                              src="/images.jpeg"
                              alt="..."
                            /> */}
                            <Image className="user-img cursor" src="/user-icon.png" alt="..."/>
                            {/* <span className="user-letter">{startingLetter}</span> */}
                            <div className="logout-view">
                              <i
                                className="fa fa-caret-up logout-up-icon"
                                aria-hidden="true"
                              ></i>
                              <div className="list-items-sign">
                                <ul className="list-unstyled">
                                  <li className="cursor">
                                    <i className="fa fa-sign-out" aria-hidden="true"></i>
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
          <div className="body-main">
            <div className="banner-sec">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-6 col-lg-8 col-sm-6">
                    <div className="banner-text pt-2 ps-2">
                      <h4> Hi {username},</h4>
                      <h3>Welcome Back</h3>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4 col-sm-6 text-end center-img">
                    <div className="img-john">
                      <Image className="img-back" src="/banner-img1.png" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bottom-cards">
              <div className="container-fluid left-right-pad">
                <div className="row">
                  
                    <div
                      className="grid"
                     
                    >
                    {responseConfig.reports.map((report, index) => (
                      <div className="card"  key={index}>
                        <div className="header mb-2">
                          <span className="icon">
                            <Image
                              className=""
                              style={{ width: "30px" }}
                              // src="/Digital.png"
                              src={getImageUrlById(report.Id)}

                            />
                          </span>
                        </div>
                        <span className="cardarrow-right"><i class="fa fa-arrow-right" aria-hidden="true"></i></span>
                        <Link
                          to={`/report?reportId=${report.Id}&embedUrl=${report.EmbedUrl}&token=${responseConfig.token}&reportname=${report.Name}&username=${username}&#id_token=${reports_token}`}
                        >
                          <a className="message">
                            {report.Name}
                          </a>
                        </Link>

                      </div>
                    ))}
                    </div>
                  
                </div>
              </div>
            </div>
          </div>

           
        </>
      )}
    </div>
  );
  
  
};

export default ReportList;
