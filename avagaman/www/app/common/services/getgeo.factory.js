angular.module('getGeo.factory', [])

.factory('getGeo', function() {
    console.log('getGeo service instantiated');
    var interval;
    var duration = 2000;  // in msec / 20sec
    var long, lat;
    var processing = false;
    var callback;
    var minDistance = 10;
     
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
   
    function getCurrentPosition() {
        console.log(' running');
        if(processing) return;
        processing = true;
        navigator.geolocation.getCurrentPosition(function(position) {
            processing = false;
            console.log(lat, long);
            console.log(position.coords.latitude, position.coords.longitude);
            var dist = getDistanceFromLatLonInMeter(lat, long, position.coords.latitude, position.coords.longitude);
            console.log("dist in km is "+dist);
            callback( position.coords.latitude, position.coords.longitude , dist);
        });
    }
   
    return {
      begin:function(lt,lg,setIntervelvalue , cb) {
            long = lg;
            lat = lt;
            callback = cb;
            if(setIntervelvalue)
            {
                interval = window.setInterval(getCurrentPosition, duration);
            }
            getCurrentPosition();
      }, 
      end: function() {
             window.clearInterval(interval);
      },
      setTarget: function(lg,lt) {
         long = lg;
         lat = lt;
      }
    };
   
})
