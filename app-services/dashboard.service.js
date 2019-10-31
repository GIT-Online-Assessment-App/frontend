app.factory("DashboardService", Service);

function Service($http, $localStorage, $rootScope){
  var service = {};

  service.getResponses = getResponses;
  service.getList = getList;
  service.getQuestionPaper = getQuestionPaper;
  service.changeExamGate = changeExamGate;
  service.updateQuestionPaper = updateQuestionPaper;
  return service;

  function getList(email, callback){

    $http({
      method : "POST",
      url : $rootScope.URLs.ip+':5054/faculty_dashboard',
      data : {
        "email_id" : email
      }

    }).then(function successCallback(response){
        callback(response.data);
    }, function errorCallback(response){
        callback('errCode:400 Network Error');
    });

  }

  function getResponses(item_password, callback){
    $http({
          method : "POST",
          url    : $rootScope.URLs.ip+':5054/get_response_list',
          data : {
            "item_password":item_password
          }
    }).then(function successCallback(response){
        callback(response.data);
    }, function errorCallback(response){
        callback('Error Try Again');
    });

  }

  function getQuestionPaper(item_password, callback){

    $http({
        method : "POST",
        url    :  $rootScope.URLs.ip+":5056/show_item_details",
        data   : {
          "item_password" : item_password
        }
    }).then(function successCallback(response){
        callback(response.data);
    }, function errorCallback(response){
        callback('Check your connection and try again!');
    });

  }

  //this method is used to send the updated question pape
  function updateQuestionPaper(packedData, callback){
    console.log('sending this to you');
    console.log(packedData);
    
    $http({
      method : "POST",
      url    :  $rootScope.URLs.ip+":5056/edit_quiz",
      data   : packedData
    }).then(function successCallback(response){
      
      callback(response.data);

    }, function errorCallback(response){

    });
  }

  function changeExamGate(item_password, changed_gate, callback){
    $http({
      method : "POST",
      url    : $rootScope.URLs.ip+':5054/change_item_gate',
      data   : {
        "item_password" : item_password,
        "gate"          : changed_gate
      }

    }).then(function successCallback(response){
        callback(response.data);
        
    }, function errorCallback(response){
        callback('Network Error, try again!');
    });
  }



}//end of service method