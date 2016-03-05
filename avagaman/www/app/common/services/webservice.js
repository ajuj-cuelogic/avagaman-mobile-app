angular.module('webservice.service',[])
       .service('webService',['$http' , webserviceService]);


/*
 * all ajax's call in app goes from here, currently we are using only get method to get data from server 
 */
function webserviceService($http) {

    var webServiceUrl = 'http://192.168.10.65:3001/';  // Api base URL
    var service = {};
    service.get = get;
    service.post = post;
    service.jsonp = jsonp;
    return service;

    
    function ajaxCall(method , url , data,  callback) {
        
        try {
            $http({
                method: method,
                url:webServiceUrl + url,
                data : data,
                headers: {
                    'Content-type': 'application/json'
                }
            }).
            then(function(data) {
                    callback(data);
            }, function(status) {
                 throw "invalid server error";
            });  
        } catch (e) {
            
            console.log("Got an error!",e);
        }
    }
    
    function get(url ,data , callback) {
        ajaxCall('get' , url ,data, callback);
    }
    function post(url , data , callback) {
        ajaxCall('post' , url , data,  callback);
    }
    function jsonp(url ,data, callback) {
        ajaxCall('jsonp' , url ,data, callback);
    }
    function put(url , callback,data) {
        ajaxCall('put' , url ,data, callback);
    }
  
};