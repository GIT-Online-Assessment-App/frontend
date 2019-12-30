app.controller('Details.IndexController', Controller);


function Controller($localStorage,DashboardService,$routeParams, AuthenticationService) {
    var dtl = this;
    dtl.list=[1,2,3,4,5,6];
    dtl.logout = logout;
    dtl.dispModal = dispModal;
    dtl.dashboard = dashboard;
    dtl.success1 = false;
    dtl.data = {};
    dtl.download = download;
    dtl.exportCSVFile = exportCSVFile;
    dtl.convertToCSV = convertToCSV;
    dtl.deleteResponse = deleteResponse;
    
    dtl.marked = {
        "background-color" : "#fcacac"
    }
    dtl.unmarked = {
        "background-color" : "#fff"
    }
    dtl.sync = sync;
    dtl.deleteResponsesArr = [];    //array which will contain the emails of the responses to be deleted
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
        //check if user is logged in
        if($localStorage.currentUser){
            dtl.uname = $localStorage.currentUser.username;
            //check if the array includes the item_password present in teh route_parameters
            if( $localStorage.currentUser.item_array.includes($routeParams.keyw)){
                dtl.itempass = $routeParams.keyw;
                DashboardService.getResponses(dtl.itempass, function(result){
                    if(result.status=='success'){
                        dtl.responses = result;                   
                        dtl.success1 = true;
                        dtl.downloadCSVData = result;
                        
                        
                        
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
    
    function download(){
        var title = {
            title : "Avg Marks: "+ dtl.downloadCSVData.average,
            subject : "Test Key: " +dtl.downloadCSVData.item_password,
            attendance: "#Students Attended: "+dtl.downloadCSVData.responses_count+ "  \n\n" 

        }
        var headers = {
            
            username: 'Student Name'.replace(/,/g, ''), // remove commas to avoid errors
            usn: "USN",
            score: "Score",
            email_id: "email"
        };
      
        itemsNotFormatted = dtl.downloadCSVData.response_list;
      
        var itemsFormatted = [];
      
        // format the data
        itemsNotFormatted.forEach((item) => {
            itemsFormatted.push({
                username: item.username, // remove commas to avoid errors,
                usn: item.usn,
                score: item.score,
                email_id: item.email_id
            });
        });
      
        var fileTitle = 'QUIZ_Results_'+dtl.downloadCSVData.item_password; // or 'my-unique-title'
      
        exportCSVFile(headers,title, itemsFormatted, fileTitle); // call the exportCSVFile() function to process the JSON and trigger the download
      }

      function exportCSVFile(headers,title, items, fileTitle) {
        if (headers) {
            items.unshift(headers);
        }
        if (title) {
            items.unshift(title);
        }
    
        // Convert Object to JSON
        var jsonObject = JSON.stringify(items);
    
        var csv = dtl.convertToCSV(jsonObject);
    
        var exportedFilenmae = fileTitle + '.csv' || 'export.csv';
    
        var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, exportedFilenmae);
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", exportedFilenmae);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }
    function convertToCSV(objArray) {
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        var str = '';
    
        for (var i = 0; i < array.length; i++) {
            var line = '';
            for (var index in array[i]) {
                if (line != '') line += ','
    
                line += array[i][index];
            }
    
            str += line + '\r\n';
        }
    
        return str;
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


function download_responses(item_pass){
    alert(item_pass);
    
    
    
    
}