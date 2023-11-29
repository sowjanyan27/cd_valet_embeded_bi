/// <summary>
/// File Name : PowerBIService.js
/// Created By : 
/// Purpose :  Accessing the url  to get the data
/// </summary>
/// <returns></returns>
import { API_URLS } from '../constants';
import { fetchWrapper } from '../helpers/fetch-wrapper';
// function to pass the methods as parameters
export const PowerBIService = {
    getAll,
    postdata,
    gettoken,
    getAllReports,
};

const baseUrl = API_URLS.getpowerbireports;
const baseUrl1=API_URLS.getuserdetails;
const baseUrl2=API_URLS.gettokenforuserdetails


//get function to get the all the data
function getAll() {
    return fetchWrapper.get(baseUrl);
}
function postdata() {
    console.log(baseUrl1)
    return fetchWrapper.getpost(baseUrl1);
}

 function gettoken(){
    return fetchWrapper.get(baseUrl2);
 }
 function getAllReports() {
    return fetchWrapper.postget(baseUrl);
}





