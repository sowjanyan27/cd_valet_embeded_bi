



// import React, { useState, useEffect,useRef } from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import ReportList from './ReportList';
// import ReportDetails from './ReportDetails';
// import RedirectURL from './RedirectURL';
// import Login from './login';
// import { PowerBIService } from './api/powerbiapi'; // importing the service  
// const TokenExtractor = ({ children }) => {
//   const [token, setToken] = useState('');
//   const [userDetails, setUserDetails] = useState(null);
//   const tokenFromUrlRef = useRef(null);
//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.hash);
//     const tokenFromUrl = urlParams.get('#id_token');
//     localStorage.setItem('id_token',tokenFromUrl)
//     tokenFromUrlRef.current = tokenFromUrl;
//     // Check if token is present in the URL
//     if (tokenFromUrl) {
//       // Token is present, set it in the state
//       setToken(tokenFromUrl);

//       async function fetchUserDetails() {
//         try {
//           const url = await PowerBIService.postdata();
//           const response = url;
//           const data =  response.data;
//           console.log(response)
//           console.log(data, 'data');
//           setUserDetails(data);
//           // Store user details in local storage
//           // localStorage.setItem('userDetails', JSON.stringify(data));
//           // localStorage.setItem('username',data.name)
//            // Store user details in local storage
//             if (data.name) {
//               localStorage.setItem('username', data.name);
//             }
//         } catch (error) {
//           console.error(error);
//           window.open('https://account.cdvalet.com/cdvaletconsumer.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_Sign-in&client_id=0cccdb9a-36f3-4d61-a0ef-ad518b362af3&nonce=defaultNonce&redirect_uri=https://cdvaletembeddedui.azurewebsites.net/list&scope=openid&response_type=id_token&prompt=login', '_self', 'noreferrer');

       
//         } finally {
//           // Set loading to false when done (whether successful or not)
//         }
//       }
//       async function gettoken() {
//         try {
//           const url = await PowerBIService.gettoken();
//           const response = url;
//           localStorage.setItem('list_token',response.token)
//           console.log(response, 'response');
//         } catch (error) {
//           console.error(error);
//         }
//       }
//       fetchUserDetails();
//       gettoken();
//       // Call the function to fetch user details
    
//     } else {
//       // Token is not present, redirect to an external URL
//       window.open('https://account.cdvalet.com/cdvaletconsumer.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_Sign-in&client_id=0cccdb9a-36f3-4d61-a0ef-ad518b362af3&nonce=defaultNonce&redirect_uri=https://cdvaletembeddedui.azurewebsites.net/list&scope=openid&response_type=id_token&prompt=login', '_self', 'noreferrer');
//     }
//   }, []); // No dependencies to avoid unnecessary re-renders


//   return children(tokenFromUrlRef.current);
// };

// const App = () => {
//   return (


//     // <BrowserRouter>
//     // <ToastContainer /> {/* Add this line to include the ToastContainer */}
//     //   <Routes>
//     //     <Route path="/" exact element={<Login />} />
//     //     <Route path="/list/" exact element={<ReportList />} /> 
//     //     <Route path="/report" element={<ReportDetails />} />
//     //     <Route path="/RedirectURL" element={<RedirectURL/>} />
//     //   </Routes>
//     // </BrowserRouter>
    
//     <BrowserRouter>
//       <TokenExtractor>
//         {(token) => (
//           <>
//             <ToastContainer />
//             <Routes>
//             <Route path="/" exact element={<Login />} />
//               {/* <Route path="/" element={<Navigate to="/list" />} /> */}
//               <Route path="/list/" element={<ReportList token={token} />} />
//               <Route path="/report" element={<ReportDetails />} />
//               <Route path="/RedirectURL" element={<RedirectURL/>} />
//             </Routes>
//           </>
//         )}
//       </TokenExtractor>
//     </BrowserRouter>
//   );
// };

// export default App;





import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReportList from './ReportList';
import ReportDetails from './ReportDetails';
import RedirectURL from './RedirectURL';
import Login from './login';
import { PowerBIService } from './api/powerbiapi'; // importing the service  
import { login_redirect_url } from './config/indexapi';
const App = () => {
  const [token, setToken] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  const tokenFromUrlRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.hash);
    const tokenFromUrl = urlParams.get('#id_token');
    localStorage.setItem('id_token', tokenFromUrl);
    tokenFromUrlRef.current = tokenFromUrl;
    if (tokenFromUrl) {
      // Token is present, set it in the state
      setToken(tokenFromUrl);
      async function fetchUserDetails() {
        try {
          const url = await PowerBIService.postdata();
          const response = url;
          const data =  response.data;
          console.log(response)
          console.log(data, 'data');
          setUserDetails(data);
            if (data.name) {
              localStorage.setItem('username', data.name);
              localStorage.setItem('toolRoles',data.toolRoles)
            }

        } catch (error) {
          console.error(error);
          window.open(`${login_redirect_url}`, '_self', 'noreferrer');
        } finally {
          // Set loading to false when done (whether successful or not)
        }
      }
      fetchUserDetails();
    
    } else {
      // Token is not present, redirect to an external URL
      window.open(`${login_redirect_url}`, '_self', 'noreferrer');
    }
  
  }, []); // No dependencies to avoid unnecessary re-renders

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        {/* <Route path="/" exact element={<Login />} /> */}
        <Route path="/" element={<Navigate to="/list" />} />
        <Route path="/list/" element={<ReportList token={token} />} />
        <Route path="/report" element={<ReportDetails />} />
        <Route path="/RedirectURL" element={<RedirectURL />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
