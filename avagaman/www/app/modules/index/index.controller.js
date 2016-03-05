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
    $scope.CheckinService_DEFAULT_VAL = CheckinService.DEFAULT_VAL;
    $scope.lastCheckTime = getTimestamp();
    var DEFAULT_VAL_DIFFERENCE_BETWEEN_TWO_CHECKINS = 10; // in secound
    var isFirstCheck = 1;
    
    
    
    console.log($scope.lastCheckTime , 'rt');
    
    
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
    
    $scope.check = function() {
       
        if($scope.user)
        {
            CheckinService.check(function(currLat, currLng, dist , checkStatus){


                   $scope.position.lat  = currLat;
                   $scope.position.long = currLng;
                   $scope.distance =  dist;
                   

//                console.log($scope.currentState , checkStatus , 'status');
                if( 
                    (parseInt($scope.currentState) !== parseInt(checkStatus)) && 
                    ( $scope.timeDifference() > DEFAULT_VAL_DIFFERENCE_BETWEEN_TWO_CHECKINS || isFirstCheck )
                )
                {

                        

                       webService.post('user/activity/add' , { username : $scope.user.username , logState  : checkStatus } , function (){
                           $scope.lastCheckTime = getTimestamp();
                           $scope.currentState = checkStatus;
                           isFirstCheck = 0;
                           $scope.count++;
                       });

//                    console.log(checkStatus);

                }
                else if ($scope.timeDifference() <= DEFAULT_VAL_DIFFERENCE_BETWEEN_TWO_CHECKINS)
                {
                    console.log('not call api ' , 'wait for ' + $scope.timeDifference() + ' minutes!!');
                }
                 $scope.$apply();

            });
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
   console.log($scope.timeDifference() , 'difff');
   document.addEventListener('deviceready', function () {
       var backgroundLocationCheck;
        // Enable background mode while track is playing
      cordova.plugins.backgroundMode.enable();
 
      // Called when background mode has been activated
      cordova.plugins.backgroundMode.onactivate = function() {
          
            $scope.isBackground = 1 ;
             backgroundLocationCheck = setInterval(function() {
                $scope.check();
            }, 3000);
      }
      
      cordova.plugins.backgroundMode.ondeactivate = function() {
          
          $scope.isBackground = 2 ;
          clearInterval(backgroundLocationCheck);
          
      };
      
      
 
} );

    
    $scope.check();
    
    
})