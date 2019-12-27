app.controller("AdminDashboard.HomeController", Controller);

function Controller($localStorage,$location, DashboardService,AdminService, $interpolate, AuthenticationService){
    var admDshHm = this;
    admDshHm.logout = logout;
    admDshHm.newQBank = newQBank;
    admDshHm.goToManageQBankPage = goToManageQBankPage;
    
    admDshHm.success = {        
        "background" : "#c0f0cd"
    }
    admDshHm.failure = {
        "background" : "#fff"
    }
    

    initController();
    function initController(){
        
        if($localStorage.currentUser){
            admDshHm.uname = $localStorage.currentUser.username;
            admDshHm.email = $localStorage.currentUser.email_id;
            admDshHm.type = $localStorage.currentUser.type;

            AdminService.getQBankList(admDshHm.email, function(result){
                admDshHm.QBankList = result.qb_names;
                $localStorage.currentUser.qb_names = [];
                
                for(i = 0; i < result.qb_names.length; i++ ){
                    $localStorage.currentUser.qb_names[i] = result.qb_names[i].name;
                }
                
            });


        }
    }

    function newQBank(){
        AdminService.new_qb(admDshHm.name, admDshHm.description, function(result){
            if(result.status=='success'){
                admDshHm.status = "success";
                
                admDshHm.description="";
                admDshHm.msg = "Saved Successfully";
                $localStorage.currentUser.qb_names.push(admDshHm.name);
                admDshHm.name = "";
                console.log($localStorage.currentUser.qb_names);
                admDshHm.QBankList = result.new_list;


            }else if(result.status=='failed'){
                if(result.error=='qb_name_repeat_error'){
                    admDshHm.failure['background'] = "#f7c6c6";
                    admDshHm.msg = "Error! QBank already exists!";
                }
            }
        });
    }

    function goToManageQBankPage(qb_name){
        //handle details url interpolation
        console.log($localStorage.currentUser.qb_names);
        if(qb_name != '' && $localStorage.currentUser.qb_names.includes(qb_name)){
            admDshHm.qb_name = qb_name
            admDshHm.url  = $interpolate('/manage-qb/{{qb_name}}')(admDshHm);
            
            $location.path(admDshHm.url);
        }else{
            alert(qb_name+' Not found!!');
        }

    }

    function logout(){
        AuthenticationService.Logout();        
    } 


}