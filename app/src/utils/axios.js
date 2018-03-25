import axios from 'axios';

let axiosOptions = {
  baseURL:'http://localhost:4000/api/'
};



var instance = axios.create(axiosOptions);

instance.interceptors.request.use(function (config) {
  let userSession = JSON.parse(sessionStorage.getItem('userSession'));

  if(userSession){
    config.headers = {
      'Authorization': `Bearer ${userSession.jwt}`
    }
  }
  return config;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});


instance.interceptors.response.use(function (response) {
    // Do something with response data
    return response.data;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });

export default instance;