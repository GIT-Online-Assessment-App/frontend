app.controller("AdminDashboard.HomeController", Controller);

function Controller($localStorage,DashboardService,AdminService, AuthenticationService){
    var admDshHm = this;
    admDshHm.logout = logout;
    admDshHm.newQBank = newQBank;

    initController();
    function initController(){
        if($localStorage.currentUser){
            admDshHm.uname = $localStorage.currentUser.username;
            admDshHm.email = $localStorage.currentUser.email_id;
            admDshHm.type = $localStorage.currentUser.type;

            AdminService.getQBankList(admDshHm.email, function(result){
                admDshHm.QBankList = result.qb_names;
                console.log(admDshHm.QBankList);
            });


        }
    }

    function newQBank(){
        AdminService.new_qb(admDshHm.name, admDshHm.description, function(result){
            if(result.status=='success'){
                admDshHm.name = "";
                admDshHm.description="";
                admDshHm.msg = "Saved Successfully";

                admDshHm.QBankList = result.new_list;


            }else if(result.status=='failed'){
                if(result.error=='qb_name_repeat_error'){
                    admDshHm.msg = "Error! QBank already exists!";
                }
            }
        });
    }

    function logout(){
        AuthenticationService.Logout();        
    } 


}