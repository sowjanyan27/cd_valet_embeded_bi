
/// <summary>
/// File Name : App.js
/// Created By : 
/// Purpose : root  component  for the application 
/// </summary>
/// <returns></returns>
import React, { useEffect, useState } from 'react';
import ReportDetails from './ReportDetails';
import ReportList from './ReportList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './login';
const App = () => {
//useState that allows you to add state to a functional component
  const [reports1, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState([]);

//  used to return the  response of  elements depending on where it is used.
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/list" exact element={<ReportList />} /> 
        <Route path="/report" element={<ReportDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;



