angular.module('login.controller', [])

.controller('LoginCtrl', function($scope,LoginService,$state,$ionicPopup,storageService) {
    
    $scope.data = {};
 
    var user = storageService.getSession();
    
    if(user)
    {
        $state.go('index.dashboard');
    }
    $scope.login = function() {
        if($scope.data.username && $scope.data.password)
        {
            LoginService.login($scope.data.username, $scope.data.password , function (data) {
                if(data.status == 200) {
                    storageService.setSession(data.data.data.user);
                    $state.go('index.dashboard');
                }
                else {
                    $scope.alertPopup('Login failed!' , 'Please check your email and password!');
                }
            });
        }
        else
        {
            $scope.alertPopup('Login failed!' , 'Please enter username and password!!');
        }
    }
    
    $scope.alertPopup = function(title , message) {
        $ionicPopup.alert({
                        title: title,
                        template: message
        });
    }
    
    $scope.$on('event:google-plus-signin-success', function (event,authResult) {
        console.log(event);
        console.log(authResult);
        // Send login to server or save into cookie
    });
    $scope.$on('event:google-plus-signin-failure', function (event,authResult) {
      // Auth failure or signout detected
    });
    
    
    
})