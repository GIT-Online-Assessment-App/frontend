app.controller('Update.IndexController', Controller);

function Controller($location,$localStorage,DashboardService,$routeParams, AuthenticationService){
    var upd = this;
    upd.goToHome = goToHome; 
    upd.goToDashboard = goToDashboard  
    upd.addNewColumn = addNewColumn;
    upd.removeColumn = removeColumn;
    upd.submit = submit;
    
    upd.logout = logout;
    initController();
    function initController(){
        if($localStorage.currentUser){
            upd.uname = $localStorage.currentUser.username;
            if( $localStorage.currentUser.item_array.includes($routeParams.keyw)){            
                upd.itempass = $routeParams.keyw;
                DashboardService.getQuestionPaper(upd.itempass, function(result){
                    if(result.status=='success'){
                        upd.responses = result;
                        upd.positive_marks = result.positive_marks;
                        upd.negative_marks = result.negative_marks;
                        upd.time_limit = result.time_limit;
                        upd.questions = result.questions;
                        upd.success1 = true;
                        console.log(upd.responses);
                        
                    }
                    upd.editStatus = result.editable.status;
                    console.log('editable: '+ upd.editStatus)
                    if(!upd.editStatus){
                        upd.errMsgs = result.editable.error;
                        $(document).ready(function() {
                            
                            $('.readonly').find('input, textarea, select, button').attr('disabled', 'disabled');
                            
                        });
                    }
                });
                
            }else{
                alert('error code');
                window.location.href = "#!dashboard";
            }
            
        }
    };
    
    //updates the quiz
    function submit(){
        //alert('from submit');
        var len = upd.questions.length;
        for(let i = 1; i<=len; i++){
            upd.questions[i-1].qno = i.toString();
        }
        console.log(upd.questions);
        upd.data = {
            "item_password":upd.itempass, 
            "questions" : upd.questions,                   
            "time_limit":upd.time_limit,
            "negative_marks" : upd.negative_marks,
            "positive_marks" : upd.positive_marks                      
        }
        
        
        
        DashboardService.updateQuestionPaper(upd.data, function(result){
            
            if(result.status =='success'){
                console.log('done');
                alert("Question Paper Updated Successfully!");
                /*$(document).ready(function() {
                    
                    $('.readonly').find('input, textarea, select, button').attr('disabled', 'disabled');
                    
                });*/
            }else
            if(result.error=='exam_key not unique'){
                alert("Exam key not unique!");
            }else{
                alert("Failed to Update question paper!");
                console.log(result);
            }
            
            
        });
        
    }
    
    function addNewColumn() {
        //alert(hm.questions.options);
        if(upd.questions.length !== 0  && upd.questions[upd.questions.length-1].answer !== ''){
            var newItemNo = upd.questions.length+1;
            
            upd.questions.push({qno:'', question:'', options:[], answer:''});
            
            console.log(upd.questions.length);
        }
        //alert('Please choose the correct answer for this question');      
    };      

    function removeColumn(index) {
        
        if(confirm("Delete this question?")){
            // remove the row specified in index
            if(upd.questions.length > 1)
            upd.questions.splice( index, 1);
            // if no rows left in the array create a blank array
            if ( upd.questions.length === 0 || upd.questions.length == null){
                alert('no rec');
                upd.questions.push = [{}];
            }
            
            
        }   
    }; 
    
    
    
    function goToHome(){
        window.location.href = "#!home";
    }
    
    function goToDashboard(){
        window.location.href = "#!dashboard";
    }
    
    function logout(){
        AuthenticationService.Logout();        
    } 
    
}