angular.module('login.service', [])

.service('LoginService', function() {
    var service = {};
    service.login = login;
    return service;
    function login(username , password , callback) {

        var data = 'error';
        if(username == 'mukul' && password == 'password'){
            data = 'success';
        }
        callback(data);
    }
    
})