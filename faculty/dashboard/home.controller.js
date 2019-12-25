app.controller('Home.IndexController', Controller);

function Controller($localStorage,QuestionPaperService, AuthenticationService) {
    var hm = this;
    
    hm.create = create;
    hm.success = false;
    hm.logout = logout;
    hm.positive_marks = 4;
    hm.negative_marks = -1;
    hm.goToDashboard = goToDashboard;
    if($localStorage.currentUser){        
        hm.uname = $localStorage.currentUser.username;
        hm.email = $localStorage.currentUser.email;
        hm.submit = submit;
        hm.events = ["QUIZ"];
        hm.sems = [1,2,3,4,5,6,7,8];
        hm.assessments = ["Data Structures",
                        "Operating Systems",
                        "Computer Networks",
                        "Object Oriented",
                        "C",
                        "C++",
                        "Python",
                        "Java",
                        "Mobile Computing",
                        "DBMS",
                        "Computer Organization",
                        "Micro processors & Micro controllers",
                        "Web Programming"];

    }

        function create(){
            hm.ok = confirm('Once Submitted you cannot change this inoformation!');
            if(hm.ok){
                //alert(hm.success);
                QuestionPaperService.getCode(hm.uname, hm.item_type, hm.subject,hm.ia_no, hm.semester, function(result){
                    
                    if(result.item_name){

                        alert(result.item_name);
                        hm.itemname = result.item_name;
                        hm.success = true;
                        hm.test_code = result.item_name;
                    }else{
                        alert("failed submission");

                    }//if else ends here
                });           
            
            }                  

        }//end of create function


    hm.addNewColumn = addNewColumn;
    hm.removeColumn = removeColumn;   
    hm.questions = [{qno:'', question:'', options:[], answer:''}];
    function addNewColumn() {
        //alert(hm.questions.options);
        if(hm.questions.length !== 0  && hm.questions[hm.questions.length-1].answer !== ''){
            var newItemNo = hm.questions.length+1;

            hm.questions.push({qno:'', question:'', options:[], answer:''});

            console.log(hm.questions.length);
        }
        //alert('Please choose the correct answer for this question');      
    };         
    function removeColumn(index) {
        // remove the row specified in index
        if(hm.questions.length > 1)
            hm.questions.splice( index, 1);
        // if no rows left in the array create a blank array
        if ( hm.questions.length === 0 || hm.questions.length == null){
            alert('no rec');
            hm.questions.push = [{}];
        }    
    };       
    function submit(){

        var len = hm.questions.length;
        for(let i = 1; i<=len; i++){
            hm.questions[i-1].qno = i.toString();
        }
        console.log(hm.questions);
        hm.data = {"item_name" : hm.itemname,
                    "item_password":hm.securitykey, 
                    "questions" : hm.questions, 
                    "subject":hm.subject,
                    "positive_marks" : hm.positive_marks,
                    "negative_marks" : hm.negative_marks,
                    "ia":hm.ia_no,
                    "time_limit":hm.time_limit,
                    "semester":hm.semester,
                    "email_id" : hm.email,
                    "gate" : '__close__'               
                };
        console.log(hm.data);

        QuestionPaperService.submitQuestions(hm.data, function(result){

            if(result.status =='success'){
                alert("Question Paper Uploaded Successfully!");
                $(document).ready(function() {

                    $('.readonly').find('input, textarea, select, button').attr('disabled', 'disabled');
        
                });
            }else
            if(result.error=='exam_key not unique'){
                alert("Exam key not unique!");
            }else{
                alert("Failed to upload question paper!");
                console.log(result);
            }


        });



    }


    function goToDashboard(){
        window.location.href = "#!dashboard";
    }


    function logout(){
        AuthenticationService.Logout();        
    }    


    }//end of Controller



