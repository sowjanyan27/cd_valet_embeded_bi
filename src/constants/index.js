/// <summary>
/// File Name : index.js
/// Created By : 
/// Purpose :    global component  to access all the endpoints from the application
/// </summary>
/// <returns></returns>
import { dev_url } from "../config/indexapi"
import { azure_cd_valet } from "../config/indexapi"
export const API_URLS = {
    getpowerbireports: `${dev_url}api/Reports/GetReportsList`, //  used to get the  list of reports
    getuserdetails:`${azure_cd_valet}/api/v1/getUserDetails`,
    gettokenforuserdetails:`${dev_url}get-token`

}