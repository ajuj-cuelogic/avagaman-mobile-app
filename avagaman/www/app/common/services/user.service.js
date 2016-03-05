angular.module('user.service', [])


.service('UserService', function(webService,storageService) {
    var user = storageService.getSession();
    var service = {};
    
    service.getUsersData = getUsersData;
    service.notifyUser = notifyUser;
    
    return service;
    
    
    function getUsersData( callback ) {
        
        webService.get('get/all/users' ,{} , callback);
        
    }
    function notifyUser( toUser , callback ) {
        
        console.log(typeof(toUser.logState));
        
        webService.post('user/notify' ,{    username: user.username,
                                            toUserId: toUser._id,
                                            isNotified: toUser.logState.toString()
                                        } , callback);
        
    }
})