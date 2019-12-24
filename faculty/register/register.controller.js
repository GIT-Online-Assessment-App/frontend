app.controller('Index.RegisterController', Controller);

function Controller($location, $rootScope, RegistrationService){
  $rootScope.flag = 1;

  var rg = this;
  rg.pwdRegEx = "/^(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,10}$/";

  //  /^(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,10}$/

  rg.signup = signup;
  function signup(){
    rg.loading = true;
    RegistrationService.Signup(rg.username, rg.email, rg.password, function(result){
      if(result.status=='success'){

        confirm("Registration Successfull!");
        rg.loading = false;
        
        //console.log(result.message.status);
        window.location.href = "#!/";
        
      }else if(result.error){
        alert(result.error);
        rg.loading = false;
      }
      
    })





    

  }

//window.location.href = "#!/dashboard";

}
