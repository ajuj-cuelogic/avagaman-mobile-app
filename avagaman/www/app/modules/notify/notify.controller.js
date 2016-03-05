angular.module('notify.controller', [])

.controller('notifyCtrl', function($scope,UserService,$ionicPopup) {
    
   
    $scope.usersData = [];
    $scope.search = '';
    
    $scope.getUsersData = function() {
        
        UserService.getUsersData(function(data) {
            
            console.log(data);
            if(data.status == 200) {
                $scope.usersData = data.data.user;
            }
        });
    }
    
    $scope.notifyUser = function(user) {
        UserService.notifyUser(user , function(data){
            $ionicPopup.alert({
                        title: 'Success!!',
                        template: data.data.message
        });
            console.log(data);
        });
    }
    
    $scope.getUsersData();
})