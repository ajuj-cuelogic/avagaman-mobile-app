angular.module('index.controller', [])

.controller('indexCtrl', function($scope,$rootScope,storageService,$location,CheckinService,webService,$cordovaGeolocation) {
    var getTimestamp = function () {
       return  new Date().getTime();
    }
    
    $scope.position = {};
    $scope.distance = 0;
    $scope.count = 0;
    $scope.isBackground = 0;
    $scope.user = storageService.getSession();
    $scope.currentState = $scope.user.logState;;
    $scope.position.checkStatus = $scope.currentState;
    $scope.CheckinService_DEFAULT_VAL = CheckinService.DEFAULT_VAL;
    $scope.lastCheckTime = getTimestamp();
    var DEFAULT_VAL_DIFFERENCE_BETWEEN_TWO_CHECKINS = 10; // in secound
    var isFirstCheck = 1;
    
    
    if(!$scope.user) {
        $location.path('/login');
    }
    $scope.logout = function (){
        $scope.user = null;
        CheckinService.clearGeoIntervelTime();
        storageService.logout();
        $location.path('/login');
    }
    
    $rootScope.$on('unauthorized', function() {
        $scope.logout();
    });
    
    $scope.getDistance = function(setIntervelvalue){
         CheckinService.check(setIntervelvalue , function(currLat, currLng, dist , checkStatus){
                $scope.position.lat  = currLat;
                $scope.position.long = currLng;
                $scope.position.distance =  dist;
                $scope.position.checkStatus =  checkStatus;
                $scope.$apply();
        });
    }
    
    $scope.check = function() {
       
        if($scope.user && $scope.position.checkStatus)
        {
                if( 
                    (parseInt($scope.currentState) !== parseInt($scope.position.checkStatus))
                )
                {
                       webService.post('user/activity/add' , { username : $scope.user.username , logState  : $scope.position.checkStatus } , function (){
                           $scope.lastCheckTime = getTimestamp();
                           $scope.currentState = $scope.position.checkStatus;
                           isFirstCheck = 0;
                           $scope.count++;
                       });

                }
        }
       
   }
   
   
   $scope.timeDifference = function(){
       
        var difference = getTimestamp() - $scope.lastCheckTime ;
       
        var daysDifference = Math.floor(difference/1000/60/60/24);
        difference -= daysDifference*1000*60*60*24

        var hoursDifference = Math.floor(difference/1000/60/60);
        difference -= hoursDifference*1000*60*60

        var minutesDifference = Math.floor(difference/1000/60);
        difference -= minutesDifference*1000*60

        var secondsDifference = Math.floor(difference/1000);
        
      return  secondsDifference;
   }
   $scope.checkIntimeDifference = function(inTime , outTime){
       
        return CheckinService.checkIntimeDifference(inTime , outTime);
   }
   
   
   document.addEventListener('deviceready', function () {
       
      cordova.plugins.backgroundMode.enable();
      
      cordova.plugins.backgroundMode.onactivate = function() {
          
            $scope.isBackground = 1 ;
             setInterval(function() {
                        $scope.getDistance(false);
                        $scope.check();
            }, 3000);
      }
      
      
}, true );

    
    var callagain = setInterval(function() {
            $scope.getDistance(false);
            $scope.check();
    }, 3000);
    
})