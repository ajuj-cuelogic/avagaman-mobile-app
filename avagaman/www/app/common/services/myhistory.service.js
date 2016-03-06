angular.module('myhistory.service', [])


.service('MyhistoryService', function(webService , storageService ) {
    
    var user = storageService.getSession();
    var service = {};
    service.getMyhistory = getMyhistory;
    
    return service;
    
    
    function getMyhistory( callback ) {
        
        webService.post('user/history' ,{ username : user.username} , callback);
    }
    
    
})