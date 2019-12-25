app.factory('AuthenticationService', Service);
function Service($http, $localStorage, $rootScope) {
    var service = {};


    service.Login = Login;
    service.Logout = Logout;

    return service;

    function Login(email, password, callback) {
        $http({
          method : 'POST',
          url : $rootScope.URLs.ip+':5050/login',
          data : {
                  "email_id": email,
                  "password": password }
                })
            .then(function successCallback(response){
                // login successful if there's a token in the response
                if (response.data.token) {
                    // store username and token in local storage to keep user logged in between page refreshes
                    $localStorage.currentUser = {
                            status : response.data.status,
                            username: response.data.username,
                            email:response.data.email_id,                            
                            token: response.data.token,
                            type : response.data.type
                          };
                    // add jwt token to auth header for all requests made by the $http service
                    $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.token;
                    //alert(response.token);
                    // execute callback with true to indicate successful login
                    callback($localStorage.currentUser);
                } else {
                    // execute callback with false to indicate failed login
                    callback(response.data);
                }
            }, function errorCallback(response){
              //error handling code
              
              callback('Network error!');
            });
    }
    function Logout() {
        // remove user from local storage and clear http auth header
        delete $localStorage.currentUser;
        $http.defaults.headers.common.Authorization = '';
        window.location.href ='#!/';
    }
}
