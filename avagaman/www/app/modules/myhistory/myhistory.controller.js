angular.module('myhistory.controller', [])

.controller('myhistoryCtrl', function($scope,MyhistoryService,CheckinService) {
    
   $scope.title = "My History";
  
  /*
   * Get All History
   */
   $scope.myHistory = {};
    
    $scope.getMyhistoryData = function() {
        
       MyhistoryService.getMyhistory(function(data) {
            
            console.log(data , 'no');
            if(data.status == 200)
            {
                $scope.myHistory = data.data.data.userOldHistory;
            }
        });
    }
    $scope.checkIntimeDifference = function(inTime , outTime){
       
        return CheckinService.checkIntimeDifference(inTime , outTime);
   }
   
    $scope.getMyhistoryData();
})