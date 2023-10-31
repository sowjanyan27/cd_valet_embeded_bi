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
  
};

const baseUrl = API_URLS.getpowerbireports;

//get function to get the all the data
function getAll() {
    return fetchWrapper.get(baseUrl);
}




