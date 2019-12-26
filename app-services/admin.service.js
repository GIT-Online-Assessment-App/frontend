app.factory("AdminService", Service);

function Service($http, $localStorage, $rootScope){

    var service = {};

    service.getQBankList = getQBankList;
    service.new_qb = new_qb;

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

    function new_qb(name, desc, callback){
        $http({
            method : "POST",
            url: $rootScope.URLs.ip+":5058/new_qb",
            data : {
                "qb_name" : name,
                "description" : desc
            }

        }).then(function successCallback(response){
            callback(response.data);
        }, function errorCallback(response){
            callback('Network Error!');
        });
        
    }


}