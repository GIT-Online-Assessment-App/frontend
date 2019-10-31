app.controller('Details.IndexController', Controller);

function Controller($localStorage,DashboardService,$routeParams, AuthenticationService) {
    var dtl = this;
    dtl.list=[1,2,3,4,5,6];
    dtl.logout = logout;
    dtl.dispModal = dispModal;
    dtl.success1 = false;
    dtl.correct = {        
        "background" : "#c0f0cd"
    }
    dtl.wrong = {
        "background" : "#f7c6c6"
    }
    dtl.na = {
        "background" : "ccc"
    }
    


    initController();
    function initController(){
     if($localStorage.currentUser){
        dtl.uname = $localStorage.currentUser.username;
         if( $localStorage.currentUser.item_array.includes($routeParams.keyw)){
            dtl.itempass = $routeParams.keyw;
            DashboardService.getResponses(dtl.itempass, function(result){
                if(result.status=='success'){
                    dtl.responses = result;
                    dtl.success1 = true;
                    console.log(dtl.responses);
                
                }
            });

         }else{
             alert('error code');
             window.location.href = "#!dashboard";
         }
        
     }
    };

    function dispModal(item){
        dtl.username = item.username;
        dtl.score = item.score;
        dtl.usn = item.usn;
        dtl.question_paper = dtl.responses.question_paper;

        dtl.student_response = item.student_response;

    }

    


    


    dtl.success = false;
    
    






        //loadTests XXXXXXXXXXXXXXX

      

        //loadTests end XXXXXXXXXX



        


    function logout(){
        AuthenticationService.Logout();        
    }    


}//end of Controller



