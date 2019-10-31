app.factory("QuestionPaperService", Service);

function Service($http, $localStorage, $rootScope){
  var service = {};

  service.getCode = getCode;
  service.submitQuestions = submitQuestions;
  return service;

  function getCode(username, item_type, subject, ia, semester, callback){
    $http({
      method : "POST",          
        url : $rootScope.URLs.ip+":5051/new_item_name",
      data : {
        "username" : username,
        "item_type" : item_type,
        "subject" : subject,
        "ia"  : ia,
        "semester" : semester
      }
    }).then(function successCallback(response){
      //handling success
      if (response.data.item_name) {
            
            callback(response.data);

          }
          else if(!response.data.item_name){
            callback(response.data);
          }
    }, function errorCallback(response){
      //handle error here
      callback(response.data);
    });
  }

  function submitQuestions(packedData, callback){
    
    $http({
      method : "POST",
      url : $rootScope.URLs.ip+":5051/upload_questions",
      data : packedData

    }).then(function successCallback(response){
        //handle success
        if(response.data.status == 'success'){
          callback(response.data);
        }else{
          callback(response.data);
        }
    }, function errorCallback(response){
        //handle failure
    });
  }
}