angular.module('session.service', [])



 .service('sessionService', function($rootScope, storageService) {
    var service = this;

    service.request = function(config) { 
        
        var currentUser = storageService.getSession();
        var access = currentUser ? currentUser.user : null;
        if (typeof(access) == 'undefined')
        {
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