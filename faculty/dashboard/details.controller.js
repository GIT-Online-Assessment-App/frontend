app.controller('Details.IndexController', Controller);

function Controller($localStorage,DashboardService,$routeParams, AuthenticationService) {
    var dtl = this;
    dtl.list=[1,2,3,4,5,6];
    dtl.logout = logout;
    dtl.dispModal = dispModal;
    dtl.dashboard = dashboard;
    dtl.success1 = false;
    dtl.data = {};
    dtl.download_responses = download_responses;
    dtl.deleteResponse = deleteResponse;
    
    dtl.marked = {
        "background-color" : "#fcacac"
    }
    dtl.unmarked = {
        "background-color" : "#fff"
    }
    dtl.sync = sync;
    dtl.deleteResponsesArr = [];
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
                    
                
                }
            });

         }else{
             alert('error code');
             window.location.href = "#!dashboard";
         }
        
     }
    };

    function dashboard(){
        window.location.href = "#!dashboard";
    }

    function dispModal(item){
        dtl.username = item.username;
        dtl.score = item.score;
        dtl.usn = item.usn;
        dtl.question_paper = dtl.responses.question_paper;
        
        dtl.student_response = item.student_response;

    }



    function deleteResponse(){
        if(dtl.deleteResponsesArr.length > 0){
            dtl.confirm = confirm('click OK if you are sure about deleting these '+ dtl.deleteResponsesArr.length+' response(s).' );
            if(dtl.confirm){

                dtl.data = {
                    "item_password" : dtl.responses.item_password,
                    "email_ids" : dtl.deleteResponsesArr
                }
                 DashboardService.deleteResponses(dtl.data, function(result){
                    if(result.status == 'success'){
                        alert('deleted successfully');
                        location.reload();
                    }else{
                        alert(result);
                    }
                }); 
            }



            
        }else{
            alert('Please Select student responses to delete!');
        }
        

        
    }

    function download_responses(item_pass){
        alert(item_pass);

        dtl.data.exportFileName = item_pass+'.csv';
        dtl.data.displayLabel = 'download csv';
        dtl.data.myHeaderData = {
            SlNo : '#Serial',
            usn : 'USN',
            name : 'Student Name',
            score : 'Score'
        };
        dtl.data.myInputArray = dtl.responses.response_list;


    }

    function sync(email, bool){
        if(bool){
            // add item
            dtl.deleteResponsesArr.push(email);
          } else {
            // remove item
            for(var i=0 ; i < dtl.deleteResponsesArr.length; i++) {
              if(dtl.deleteResponsesArr[i] == email){
                dtl.deleteResponsesArr.splice(i,1);
              }
            }      
          }
    }
    


    


    dtl.success = false;
    
    






        //loadTests XXXXXXXXXXXXXXX

      

        //loadTests end XXXXXXXXXX



        


    function logout(){
        AuthenticationService.Logout();        
    }    


}//end of Controller



