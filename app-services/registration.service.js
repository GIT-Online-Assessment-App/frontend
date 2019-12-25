app.factory("RegistrationService", Service);

function Service($http, $localStorage,$rootScope){
  var service = {};
  service.Signup = Signup;

  return service;

  function Signup(username, email, password, callback){
    $http({
      method : "POST",
          
          url : $rootScope.URLs.ip+":5050/sign_up",
      data : {
        "username" : username,
        "email_id" : email,
        "password" : password,
        "type" : (email == "j@g.c") ? "admin" : "faculty" 
      }
    }).then(function successCallback(response){
      //handling success
      if (response.data.status == 'success') {
        
            $localStorage.currentUser = {
              message : response.data,
              status : 'success'
            };
            callback($localStorage.currentUser);

          }
          else if(response.data.status){

            callback(response.data);
          }
    }, function errorCallback(response){
      //handle error here
      data = {
        "status" : 'network error'
      }
      callback(data);
    });
  }
}