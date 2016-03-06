angular.module('notification.service', [])


.service('NotificationService', function(webService , storageService) {
    var user = storageService.getSession();
    var service = {};
    
    
    service.getNotification = getNotification;
    
    return service;
    
    
    function getNotification( callback ) {
        
         webService.post('user/notifications' ,{username : user.username} , callback);
       
    }
})