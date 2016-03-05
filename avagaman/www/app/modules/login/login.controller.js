angular.module('login.controller', [])

.controller('LoginCtrl', function($scope,LoginService,$state,$ionicPopup,storageService) {
    
    $scope.data = {};
 
    $scope.login = function() {
        if($scope.data.username && $scope.data.password)
        {
            LoginService.login($scope.data.username, $scope.data.password , function (data) {
                
                if(data.status == 200) {
                    storageService.setSession(data.data.data);
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
    
    
})