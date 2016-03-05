angular.module('index.controller', [])

.controller('indexCtrl', function($scope,$rootScope,storageService,$location) {
    
    $scope.user = storageService.getSession();
    
    if(!$scope.user) {
        $location.path('/login');
    }
    $scope.logout = function (){
        $scope.user = null;
        storageService.logout();
        $location.path('/login');
    }
    
    $rootScope.$on('unauthorized', function() {
        $scope.logout();
    });
    
})