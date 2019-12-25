app.factory("AdminService", Service);

function Service($http, $localStorage, $rootScope){

    var service = {};

    service.getQBankList = getQBankList;

    return service;

    function getQBankList(email, callback){

        $http({
            url: $rootScope.URLs.ip+":5058/question_bank_list",
            method : "GET"            
        }).then(function successCallback(response){
            callback(response.data);

        }, function errorCallback(response){

        });
    }


}