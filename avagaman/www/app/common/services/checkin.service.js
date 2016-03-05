angular.module('checkin.service', [])

.service('CheckinService', function(getGeo) {
    
    var DEFAULT_VAL = {};
        DEFAULT_VAL.LAT = 18.5335588,  // cuelogic lat 
        DEFAULT_VAL.LONG = 73.8781422;  // cuelogic long 
        DEFAULT_VAL.RADIUS = 15;  // in meters
        DEFAULT_VAL.STATUS_CHECKIN = '1'; 
        DEFAULT_VAL.STATUS_CHECKOUT = '0';  
    var service = {};
    service.DEFAULT_VAL = DEFAULT_VAL;
    service.check = check;
    service.checkIn = checkIn;
    service.checkOut = checkOut;
    return service;
    
    
    function check(callback) {
        
         getDistance(function(currLat, currLng, dist) {
             if(dist <= DEFAULT_VAL.RADIUS) {
                 checkIn(currLat, currLng, dist, callback );
             } else {
                 checkOut(currLat, currLng, dist, callback );
             }
         });
    }
    
    function checkIn( currLat, currLng, dist , callback ) {
       callback(currLat, currLng, dist , DEFAULT_VAL.STATUS_CHECKIN);
//        webService.post('user/activity/add' , {username : currentUser.username , logState  : '1' } , callback(currLat, currLng, dist , DEFAULT_VAL.STATUS_CHECKIN));
    }
    function checkOut(currLat, currLng, dist, callback ) {
        callback(currLat, currLng, dist , DEFAULT_VAL.STATUS_CHECKOUT);
//        webService.post('user/activity/add' , {username : currentUser.username , logState  : '0' } , callback(currLat, currLng, dist , DEFAULT_VAL.STATUS_CHECKOUT));
    }
    
    function getDistance(callback) {
        
        getGeo.begin(DEFAULT_VAL.LAT,DEFAULT_VAL.LONG, callback);
    }
})