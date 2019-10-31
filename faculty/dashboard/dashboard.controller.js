// Author: Tejas Patkar

app.controller('Dashboard.IndexController', Controller);

function Controller($location,$localStorage,DashboardService,$interpolate, AuthenticationService) {
    var dsh = this;
    dsh.list=[1,2,3,4,5,6];
    dsh.logout = logout;
    dsh.detail = detail;
    dsh.change = change;
    dsh.goToUpdatePage = goToUpdatePage;
    dsh.goToHome = goToHome;
    dsh.switches = []; 
    //dsh.submit = submit;
    initController();
    function initController(){
     if($localStorage.currentUser){
        dsh.uname = $localStorage.currentUser.username;
        DashboardService.getList($localStorage.currentUser.email, function(result){

            if(result.status=='success'){                
                if(result.items.length > 0){
                    dsh.items = result.items;
                    $localStorage.currentUser.item_array=[];
                    dsh.item_size = result.items.length;
                    for(i = 0; i<dsh.item_size; i++){
                        $localStorage.currentUser.item_array[i] = dsh.items[i].item_password;
                        if(dsh.items[i].gate=='__close__'){
                            dsh.switches[i] = false;
                        }else if(dsh.items[i].gate=='__open__'){
                            dsh.switches[i] = true;
                        }
                        
                        console.log(dsh.items[i]);
                    }
                    console.table(dsh.items);
                    console.log($localStorage.currentUser.item_array);
                }else{
                    dsh.errMsg = 'No Activities Yet!';
                    console.log(dsh.errMsg);
                    console.table(dsh.results);
                }
            }            
        });
     }
    };
    
    function detail(item_pass){
        //handle details url interpolation
        if(item_pass != '' && $localStorage.currentUser.item_array.includes(item_pass)){
            dsh.keyw = item_pass
            dsh.url  = $interpolate('/details/{{keyw}}')(dsh);
            console.log(dsh.url);
            $location.path(dsh.url);
        }else{
            alert(item_pass+' Not found!!');
        }
    }

    function goToUpdatePage(item_pass){
        //handle details url interpolation
        if(item_pass != '' && $localStorage.currentUser.item_array.includes(item_pass)){
            dsh.keyw = item_pass
            dsh.url  = $interpolate('/update/{{keyw}}')(dsh);
            console.log(dsh.url);
            $location.path(dsh.url);
        }else{
            alert(item_pass+' Not found!!');
        }
    }









    function goToHome(){
        window.location.href = "#!home";
    }
    
    






        //loadTests XXXXXXXXXXXXXXX

      

        //loadTests end XXXXXXXXXX


    function change(item){
        dsh.status = dsh.switches[item];
        dsh.sendStatus = dsh.status == true ? '__open__' : '__close__'; 
        
        DashboardService.changeExamGate(dsh.items[item].item_password,dsh.sendStatus,  function (result){
            if(result.status=='success'){
                dsh.switches[item] = result.gate == '__open__' ? true : false;
                dsh.dispStatus = dsh.switches[item] == true ? '__open__' : '__close__';
            }else{
                dsh.switches[item] =  dsh.switches[item] == '__open__' ? false : true;
                dsh.dispStatus = dsh.switches[item] == true ? '__open__' : '__close__';
            }
        });
        
    }
        


    function logout(){
        AuthenticationService.Logout();        
    }    


    }//end of Controller



