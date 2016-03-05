angular.module('storage.service', [])


.service('storageService', function(localStorageService) {
    
    var session_store_key = 'app_access_session';
    var service = {};
    service.setSession = setSession;
    service.getSession = getSession;
    service.logout = logout;
    return service;
    
    function setSession(user) {
        var currentUser = {
            user : user
        };
        return localStorageService.set(session_store_key, currentUser);
    }

    function getSession() {
        return localStorageService.get(session_store_key);
    }
    
    function logout() {
        if(getSession()) {
            return localStorageService.remove(session_store_key);
        }
    }
    
})
