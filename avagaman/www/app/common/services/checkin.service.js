angular.module('checkin.service', [])

.service('CheckinService', function(getGeo) {
    
    var DEFAULT_VAL = {};
        DEFAULT_VAL.LAT = 18.5335588,  // cuelogic lat 
        DEFAULT_VAL.LONG = 73.8781422;  // cuelogic long 
        DEFAULT_VAL.RADIUS = 5;  // in meters
        DEFAULT_VAL.STATUS_CHECKIN = '1'; 
        DEFAULT_VAL.STATUS_CHECKOUT = '0';  
    var service = {};
    service.DEFAULT_VAL = DEFAULT_VAL;
    service.check = check;
    service.checkIn = checkIn;
    service.checkOut = checkOut;
    service.clearGeoIntervelTime = clearGeoIntervelTime;
    service.checkIntimeDifference = checkIntimeDifference;
    service.getDistanceInMeter = getDistanceInMeter;
    return service;
    
    
    function getDistanceInMeter(lat1,lon1)
    {
        return getDistanceFromLatLonInMeter(DEFAULT_VAL.LAT,DEFAULT_VAL.LONG,lat1,lon1);
    }
    function getDistanceFromLatLonInMeter(lat1,lon1,lat2,lon2) 
   {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2-lat1);  // deg2rad below
        var dLon = deg2rad(lon2-lon1); 
        var a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2)
          ; 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c * 1000; // Distance in meter
        return d;
   }
  
    function deg2rad(deg) {
        return deg * (Math.PI/180)
    }
    
    function check(setIntervelvalue , callback) {
        
         getDistance(setIntervelvalue , function(currLat, currLng, dist) {
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
    
    function getDistance(setIntervelvalue , callback) {
        
        getGeo.begin(DEFAULT_VAL.LAT,DEFAULT_VAL.LONG, setIntervelvalue , callback);
    }
    function clearGeoIntervelTime() {
        
        getGeo.end();
    }
    
    function checkIntimeDifference (inTime , outTime){
       
        var difference = outTime - inTime ;
       
        var daysDifference = Math.floor(difference/1000/60/60/24);
        difference -= daysDifference*1000*60*60*24

        var hoursDifference = Math.floor(difference/1000/60/60);
        difference -= hoursDifference*1000*60*60

        var minutesDifference = Math.floor(difference/1000/60);
        difference -= minutesDifference*1000*60
        
      return  hoursDifference + ':' + minutesDifference;
   }
})