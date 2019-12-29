app.controller("Manage.QuestionBankController", Controller);

function Controller($location,$localStorage,QuestionBankService,$routeParams, AuthenticationService){

    var manageQB = this;
    manageQB.levels=[1, 2, 3, 4, 5];


    manageQB.addNewColumn = addNewColumn;
    manageQB.removeColumn = removeColumn;
    manageQB.submit = submit;
    manageQB.test = test;
    function test(ab){
        console.log("manageQB level type: "+ typeof ab);
    }



    initController();
    function initController(){
        if($localStorage.currentUser){
            manageQB.uname = $localStorage.currentUser.username;
            if($localStorage.currentUser.qb_names.includes($routeParams.qb_name)){
                manageQB.qb_name  = $routeParams.qb_name;

                QuestionBankService.viewQuestionBank(manageQB.qb_name, function(result){
                    if(result.status == 'success'){
                        manageQB.description = result.description;
                        //check if questions exist in the question bank
                        if(result.questions.length <= 0){
                            //initialize the array of object
                            manageQB.questions = [{qno:'', question:'', options:[], answer:'', level:''}];
                        }else{
                            manageQB.questions = result.questions;
                            for(let i = 0; i < manageQB.questions.length; i++){
                                manageQB.questions[i].level = manageQB.questions[i].level.toString();
                            }
                        }

                    }else{
                        //error establishing connection with server
                        alert(result);
                    }
                })



            }
            else{
                window.location.href = "#!admin-home-dashboard";
            }

        }

    }

    function submit(){
        
        var len = manageQB.questions.length;
        for(let i = 1; i<=len; i++){
            manageQB.questions[i-1].qno = i.toString();
            manageQB.questions[i-1].level = parseInt(manageQB.questions[i-1].level);
        }
        console.log(" testing final data "+ typeof manageQB.questions[0].level);
        manageQB.data = {
            "qb_name":manageQB.qb_name, 
            "questions" : manageQB.questions                                 
        }
        QuestionBankService.inserUpdateQuestionBank(manageQB.data, function(result){
            console.log(result);
            if(result.status=='success'){
                alert("Question Banl Updated Successfully!");
                $(document).ready(function() {
                    
                    $('.readonly').find('input, textarea, select, button').attr('disabled', 'disabled');
                    
                });
            }else if(result.status=='failed'){
                if(result.error == "QB_NOT_MODIFIED"){
                    alert("No changes made in Question Bank");
                }
                if(result.error == "NETWORK_ERROR")
                    alert("Error establishing connection to Server");
            }

        });

    }

    function addNewColumn() {
        //alert(hm.questions.options);
        if(manageQB.questions.length !== 0  
            && manageQB.questions[manageQB.questions.length-1].answer !== '' 
            && manageQB.questions[manageQB.questions.length-1].level !== ''){
            var newItemNo = manageQB.questions.length+1;

            console.log("type of this is :"+ typeof manageQB.questions[manageQB.questions.length-1].level );
            
            manageQB.questions.push({qno:'', question:'', options:[], answer:'', level:''});
            
            console.log(manageQB.questions.length);
        }
        //alert('Please choose the correct answer for this question');      
    };      

    function removeColumn(index) {
        
        if(confirm("Delete this question?")){
            // remove the row specified in index
            if(manageQB.questions.length > 1)
            manageQB.questions.splice( index, 1);
            // if no rows left in the array create a blank array
            if ( manageQB.questions.length === 0 || manageQB.questions.length == null){
                alert('no rec');
                manageQB.questions.push = [{}];
            }
            
            
        }   
    }; 

}