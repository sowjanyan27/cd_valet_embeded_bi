/// <summary>
/// File Name : fetchWrapper.js
/// Created By : 
/// Purpose :   Handling the response in  different methods
/// </summary>
/// <returns></returns>  
import { PowerBIService } from "../api/powerbiapi";
export const fetchWrapper = {
    get,
    post,
    gettoken,
    put,
    getpost,
    postget,
    delete: _delete,
  
  };
  // get method used to get the  response
  async function get(url) {
    const requestOptions = {
      method: "GET",
    };
    const response = await fetch(url, requestOptions);
    return handleResponse(response);
  }
  //the method is set to post , to  request fetch api using url
  async function post(url, body) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    const response = await fetch(url, requestOptions);
    return handleResponse(response);
  }
  //the method is set to “PUT”, and the body of the request is a JSON stringified
  async function put(url, body) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    const response = await fetch(url, requestOptions);
    return handleResponse(response);
  }
  
  // prefixed with underscored because delete is a reserved word in javascript
  async function _delete(url) {
    const requestOptions = {
      method: "DELETE",
    };
    const response = await fetch(url, requestOptions);
    return handleResponse(response);
  }
  
  // helper functions to get the reponse and parse to json
  
  function handleResponse(response) {
    return response.text().then((text) => {
      const data = text && JSON.parse(text);
  
      if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }
      return data;
    });
  }


  async function getpost(url) {
    const requestOptions = {
      method: "GET",
      headers: { "authtoken" : localStorage.getItem('id_token') },
      // body: JSON.stringify(body),
    };
    const response = await fetch(url, requestOptions);
    return handleResponse(response);

  }

  async function gettoken() {
    try {
      const url = await PowerBIService.gettoken();
      const response = url;
      localStorage.setItem('list_token',response.token)
      console.log(response, 'response');
      return response.token;
    } catch (error) {
      console.error(error);
    }
  }

  async function postget(url) {
     const token = await gettoken()

    const requestOptions = {
      method: "GET",

      headers: { "Authorization" : token},
      // body: JSON.stringify(body),
    };
    const response = await fetch(url, requestOptions);
    return handleResponse(response);

  }