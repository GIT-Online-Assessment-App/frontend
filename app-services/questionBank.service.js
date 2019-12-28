app.factory("QuestionBankService", Service);

function Service($http, $localStorage, $rootScope){
    var service = {};

    service.inserUpdateQuestionBank = inserUpdateQuestionBank;
    service.viewQuestionBank = viewQuestionBank;
    return service;

    function viewQuestionBank(qb_name, callback){
        $http({
            method : "POST",
            url : $rootScope.URLs.ip+":5059/get_qb_questions",
            data : {
                "qb_name" : qb_name
            }

        }).then(function successCallback(response){
            callback(response.data);
        }, function errorCallback(response){
            callback("Error connecting Server");
        })
    }

    function inserUpdateQuestionBank(data, callback){
        $http({
            method : "POST",
            url : $rootScope.URLs.ip+":5059/insert_update_qb",
            data : data

        }).then(function successCallback(response){
            callback(response.data);
        }, function errorCallback(response){
            var errData = {
                "status" : 'failed',
                "error"  : "NETWORK_ERROR"
            }
            callback(errData);
        })
    }

    

}