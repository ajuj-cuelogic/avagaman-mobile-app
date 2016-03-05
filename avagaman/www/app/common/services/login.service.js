angular.module('login.service', [])

.service('LoginService', function(webService) {
    var service = {};
    service.login = login;
    return service;
    function login(username , password , callback) {

        webService.post('user/login' , {username : username, password : password} , callback);
    }
    
})