angular.module('dashboard.service', [])


.service('DashboardService', function(webService,storageService) {
    var user = storageService.getSession();
    var service = {};
    
    service.getDashboardData = getDashboardData;
    
    return service;
    
    
    function getDashboardData( callback ) {
        
        webService.get('get/user/dashboard/' + user._id ,{} , callback);
        
    }
})