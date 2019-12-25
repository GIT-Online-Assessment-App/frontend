app.controller("AdminDashboard.HomeController", Controller);

function Controller($localStorage,DashboardService,$routeParams, AuthenticationService){
    var admDshHm = this;

    initController();
    function initController(){
        if($localStorage.currentUser){
            admDshHm.uname = $localStorage.currentUser.username;
        }
    }



}