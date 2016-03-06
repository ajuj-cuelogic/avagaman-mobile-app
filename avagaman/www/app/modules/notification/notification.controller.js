angular.module('notification.controller', [])

.controller('notificationCtrl', function($scope,NotificationService) {
    
   /*
   * Get All Notification
   */
   $scope.notifications = [];
    
    $scope.getNotificationData = function() {
        
        NotificationService.getNotification(function(data) {
            
            console.log(data , 'no');
            if(data.status == 200)
            {
                $scope.notifications = data.data.userNotifications;
            }
        });
    }
    
    $scope.getNotificationData();
})