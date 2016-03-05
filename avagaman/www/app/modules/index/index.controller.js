angular.module('index.controller', [])

.controller('indexCtrl', function($scope,$rootScope,storageService,$location,CheckinService,webService,$cordovaGeolocation) {
    
    $scope.position = {};
    $scope.distance = 0;
    $scope.count = 0;
    $scope.isBackground = 0;
    $scope.currentState = CheckinService.DEFAULT_VAL.STATUS_CHECKOUT;
  
    $scope.user = storageService.getSession();
    
    console.log($scope.user);
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
    
    $scope.check = function() {
       
     CheckinService.check(function(currLat, currLng, dist , checkStatus){
         
            $scope.position.lat  = currLat;
            $scope.position.long = currLng;
            $scope.distance =  dist;
            $scope.count++;
            
         if($scope.currentState !== checkStatus) {
             
                
                webService.post('user/activity/add' , { username : $scope.user.username , logState  : checkStatus } , function (){
                    $scope.currentState = checkStatus;
                });

             console.log(checkStatus);
            
         }
          $scope.$apply();
         
     });
    
       
   }
   
   
   document.addEventListener('deviceready', function () {
       
        // Enable background mode while track is playing
      cordova.plugins.backgroundMode.enable();
 
      // Called when background mode has been activated
      cordova.plugins.backgroundMode.onactivate = function() {
          
            $scope.isBackground = 1 ;
            setInterval(function() {
                $scope.check();
            }, 3000);
      }
      
      cordova.plugins.backgroundMode.ondeactivate = function() {
          
          $scope.isBackground = 2 ;
          
      };
      
      
 
} );

    
    $scope.check();
    
    
})