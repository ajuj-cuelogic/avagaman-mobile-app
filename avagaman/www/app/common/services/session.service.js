angular.module('session.service', [])
 
 .service('sessionService', function($rootScope, storageService) {
    var service = this;

    service.request = function(config) { 
        
        var currentUser = storageService.getSession(),
            access_token = currentUser ? currentUser.__s : null;
        console.log(currentUser);
        if (access_token) {
            config.headers.authorization = access_token;
            console.log(config);
        } else {
            $rootScope.$broadcast('unauthorized');
        }
        return config;
    };

    service.response = function(response) {
        return response;
    };
    
    service.responseError = function(response) {
        return response;
    };
})