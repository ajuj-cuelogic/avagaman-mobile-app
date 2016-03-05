angular.module('session.service', [])
 
 .service('sessionService', function($rootScope, storageService) {
    var service = this;

    service.request = function(config) { 
        
        var currentUser = storageService.getSession(),
            username = currentUser ? currentUser.username : null;
        if (username) {
//            console.log(config);
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