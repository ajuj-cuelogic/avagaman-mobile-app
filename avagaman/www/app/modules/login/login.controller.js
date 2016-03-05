angular.module('login.controller', [])

.controller('LoginCtrl', function($scope,LoginService,$state,$ionicPopup) {
    
    $scope.data = {};
 
    $scope.login = function() {
        
        LoginService.login($scope.data.username, $scope.data.password , function (data) {
            console.log(data);
            if(data == 'success') {
                $state.go('index.dashboard');
            }
            else {
                 var alertPopup = $ionicPopup.alert({
                    title: 'Login failed!',
                    template: 'Please check your credentials!'
                });
            }
            
        });
    }
    
    
})