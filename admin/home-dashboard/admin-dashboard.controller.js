app.controller("AdminDashboard.HomeController", Controller);

function Controller($localStorage,DashboardService,$routeParams, AuthenticationService){
    var admDshHm = this;
    admDshHm.logout = logout;

    initController();
    function initController(){
        if($localStorage.currentUser){
            admDshHm.uname = $localStorage.currentUser.username;
            admDshHm.type = $localStorage.currentUser.type;
        }
    }

    function logout(){
        AuthenticationService.Logout();        
    } 


}