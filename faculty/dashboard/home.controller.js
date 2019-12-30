app.controller('Home.IndexController', Controller);

function Controller($localStorage,QuestionPaperService,QuestionBankService,AdminService,AuthenticationService) {
    var hm = this;
    
    hm.create = create;
    hm.success = false;
    hm.showForm = false;
    hm.showButton = true;
    hm.logout = logout;
    hm.getQuestions = getQuestions;
    hm.toggleForm = toggleForm;
    hm.toggleButton = toggleButton;
    hm.getQuestionBanks = getQuestionBanks;
    hm.dispNoOfQuestions = dispNoOfQuestions;
    hm.sync = sync;
    hm.positive_marks = 4;
    hm.negative_marks = -1;
    hm.goToDashboard = goToDashboard;
    hm.levelsArray = [1,2,3,4,5];
    hm.requiredLevels = [];
    hm.nQuestionsGenerated = 0;
    
    hm.showQRequirement = true;
    hm.showQPDetail = false;
    hm.toggleModalItem = toggleModalItem;
    hm.createQPaper = createQPaper;
    
    if($localStorage.currentUser){        
        hm.uname = $localStorage.currentUser.username;
        hm.email = $localStorage.currentUser.email;
        hm.type = $localStorage.currentUser.type;
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
            
            
            hm.questions.push({qno:'', question:'', options:[], answer:''});            
            
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
        
        hm.data = {
            "item_name" : hm.itemname,
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
                
            }
            
            
        });
        
        
        
    }
    function toggleForm(){
        hm.showForm = !hm.showForm;
    }
    function toggleButton(){
        hm.showButton = !hm.showButton;
    }
    function getQuestionBanks(){
        
        AdminService.getQBankList(hm.email, function(result){
            hm.qb_list = result.qb_names;
            
            
        });
        
    }
    function toggleModalItem(){
        hm.showQRequirement = !hm.showQRequirement;
        hm.showQPDetail = !hm.showQPDetail;    
    }
    
    function dispNoOfQuestions(name){
        hm.qb_len = hm.qb_list.length;
        for(let i = 0; i < hm.qb_len; i++){
            if(hm.qb_list[i].name == name){
                hm.totalQuestions = hm.qb_list[i].no_of_questions;
            }
        }
        
        hm.tname = name;
    }
    function sync(level, bool){
        
        if(bool){
            // add item
            hm.requiredLevels.push(level);
        } else {
            // remove item
            for(var i=0 ; i < hm.requiredLevels.length; i++) {
                if(hm.requiredLevels[i] == level){
                    hm.requiredLevels.splice(i,1);
                }
            }      
        }
    }
    
    function getQuestions(){
        if(hm.requiredLevels.length > 0){
            hm.requestData = {
                "qb_name": hm.qb_name,
                "levels": hm.requiredLevels,
                "no_of_questions": hm.nRequiredQuestions
            }
            
            
            QuestionBankService.getGeneratedQuestions(hm.requestData, function(result){
                
                hm.generated_questions = result.generated_questions;
                hm.nQuestionsGenerated = hm.generated_questions.length;
                hm.notes = result.note;
            
            })
        }else{
            alert("please select levels");
        }
    }
    
    function createQPaper(){
        var len = hm.generated_questions.length;
        for(let i = 1; i<=len; i++){
            hm.generated_questions[i-1].qno = i.toString();
        }
        
        hm.data = {
            "item_name" : "QUIZ",
            "item_password":hm.qb_securitykey, 
            "questions" : hm.generated_questions, 
            "subject":hm.qb_subject,
            "positive_marks" : hm.positive_marks,
            "negative_marks" : hm.negative_marks,
            "ia":hm.qb_ia_no,
            "time_limit":hm.qb_time_limit,
            "semester":hm.qb_semester,
            "email_id" : hm.email,
            "gate" : '__close__'               
        };
        
        QuestionPaperService.submitQuestions(hm.data, function(result){        
            if(result.status =='success'){
                alert("Question Paper Uploaded Successfully!");
                $('#myModal').modal('hide');
                hm.goToDashboard();
            }else
            if(result.error=='exam_key not unique'){
                alert("Exam key not unique!");
            }else{
                alert("Failed to upload question paper!");
        
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



