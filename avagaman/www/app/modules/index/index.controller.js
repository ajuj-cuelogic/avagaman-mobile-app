angular.module('index.controller', [])

.controller('indexCtrl', function($scope,$rootScope,storageService,$location) {
    
    var main = this;
    main.user = storageService.getSession();
    
    if(!main.user) {
        $location.path('/login');
    }
    main.logout = function (){
        main.user = null;
        storageService.logout();
        $location.path('/login');
    }
    
    $rootScope.$on('unauthorized', function() {
        main.logout();
    });
    
})