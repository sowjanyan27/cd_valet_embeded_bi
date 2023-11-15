
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
const ReportList = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const username = window.sessionStorage.getItem('username');
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

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const url = await PowerBIService.getAll(); // Assuming this function returns the URL
//         const response=url
//         console.log(response,'response');
//         if(Array.isArray(response.reports) && response.reports.length>2 && username==="cdvaletuser"){
//             response.reports= JSON.parse(JSON.stringify(response.reports.slice(0,2)));
//         }else{
//             response.reports = JSON.parse(JSON.stringify(response.reports));
//         }
//         setResponseConfig(response);
//         setLoading(false);
//       } catch (error) {
//         console.error(error);
//       }
//     }
  
//     fetchData();
//   }, []); 

  useEffect(() => {
    async function fetchData() {
      try {
        const url = await PowerBIService.getAll();
        const response = url;
        console.log(response, 'response');
  
        if (Array.isArray(response.reports) && response.reports.length > 2 && username === 'cdvaletuser') {
          response.reports = JSON.parse(JSON.stringify(response.reports.slice(0, 2)));
        } else {
          response.reports = JSON.parse(JSON.stringify(response.reports));
        }
  
        setResponseConfig(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Set loading to false when done (whether successful or not)
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
// return(
// <div className="header-view">
//         <nav className="navbar navbar-expand-lg bg-light">
//             <div className="container-fluid">
//                 <a className="navbar-brand" href="#"><Image className="" style={{width:"140px"}} src="Logo.png"/><span className="sub-span">Intelligence Tool</span></a>
//                 <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//                 <span className="navbar-toggler-icon"></span>
//                 </button>
//                 <div className="collapse navbar-collapse" id="navbarSupportedContent">
//                     <div className="nav-end">
//                         <ul className="list-inline" style={{margin:"0px"}}>
//                             <li className="list-inline-item"  style={{position:'relative'}}>
//                                 <i className="fa fa-bell-o bell-icon" aria-hidden="true"></i>
//                                 <span className="notification">2</span>
//                             </li>
//                             <li className="list-inline-item">
//                                 <i className="fa fa-cog bell-icon" aria-hidden="true"></i>
//                             </li>
//                             <li className="list-inline-item">
//                                 <div className="d-flex align-items-center">
//                                     <div className="flex-shrink-0">
//                                     <div className="user-log">
//                                             <Image className="user-img cursor" src="images.jpeg" alt="..."/>
//                                             <div className="logout-view">
//                                                 <i className="fa fa-caret-up logout-up-icon"  aria-hidden="true"></i>
//                                                 <div className="list-items-sign">
//                                                     <ul  className="list-unstyled">
//                                                         <li className="cursor"><i className="fa fa-sign-out" aria-hidden="true"></i>
//                                                         <a className="login-href" onClick={handleLogout}>
//                                                             <span>Logout</span>
//                                                         </a>
//                                                         </li>
//                                                     </ul>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                     </div>
//                                     <div className="flex-grow-1 ms-3">
//                                     {username}
//                                     </div>
//                                 </div>
//                             </li>
//                         </ul>
//                     </div>
                
                
//                 </div>
//             </div>
//         </nav>

//         <div className="body-main">
//             <div className="banner-sec">
//                 <div className="container-fluid">
//                     <div className="row">
//                         <div className="col-md-6 col-lg-6 col-sm-6">
//                             <div className="banner-text ps-2">
//                                 <h4> Hi {username},</h4>
//                                 <h3>Welcome Back</h3>
//                             </div>
//                         </div>
//                         <div className="col-md-6 col-lg-6 col-sm-6 text-end">
//                             <div className="img-john">
//                                 <Image className="img-back" src="banner-img1.png"/>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="bottom-cards">
//   <div className="container-fluid">
//     <div className="row">
//       {loading ? ( // Display the loader when 'loading' is true
//         <div className="loader">Loading...</div>
//       ) : (
//         responseConfig.reports.map((report, index) => (
//           <div className="col-md-12 col-lg-2 col-sm-6 w-20" key={index}>
//             <div className="card">
//               <div className="header mb-2">
//                 <span className="icon">
//                   <Image className="" style={{ width: "30px" }} src="Digital.png" />
//                 </span>
//               </div>
//               <Link
//                 to={`/report?reportId=${report.Id}&embedUrl=${report.EmbedUrl}&token=${responseConfig.token}&reportname=${report.Name}&username=${username}`}
//               >
//                 <a className="message" style={{ width: '200px' }}>
//                   {report.Name}
//                 </a>
//               </Link>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   </div>
// </div>

//         </div>
//     </div>

// )
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
            <div className="container-fluid">
              <a className="navbar-brand" href="#">
                <Image className="" style={{ width: "140px" }} src="Logo.png" />
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
                          <div className="user-log relative">
                            <Image
                              className="user-img cursor"
                              src="images.jpeg"
                              alt="..."
                            />
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
                        <div className="flex-grow-1 ms-3">{username}</div>
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
                  <div className="col-md-6 col-lg-6 col-sm-6">
                    <div className="banner-text ps-2">
                      <h4> Hi {username},</h4>
                      <h3>Welcome Back</h3>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-6 col-sm-6 text-end center-img">
                    <div className="img-john">
                      <Image className="img-back" src="banner-img1.png" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bottom-cards">
              <div className="container-fluid">
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
                              src="Digital.png"
                            />
                          </span>
                        </div>
                        <Link
                          to={`/report?reportId=${report.Id}&embedUrl=${report.EmbedUrl}&token=${responseConfig.token}&reportname=${report.Name}&username=${username}`}
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
