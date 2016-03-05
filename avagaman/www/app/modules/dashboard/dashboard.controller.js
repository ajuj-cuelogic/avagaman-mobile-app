angular.module('dashboard.controller', [])

.controller('dashboardCtrl', function($scope , DashboardService) {
    
    $scope.dashboardData = {};
    
    $scope.getDashboardData = function() {
        
        DashboardService.getDashboardData(function(data) {
            if(data.status == 200) {
                $scope.dashboardData = data.data.data;
            }
        });
    }
    
    $scope.getDashboardData();
    
})