app.controller('Index.RegisterController', Controller);

function Controller($location, $rootScope, RegistrationService){
  $rootScope.flag = 1;

  var rg = this;
  rg.pwdRegEx = "/^(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,10}$/";

  //  /^(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,10}$/

  rg.signup = signup;
  function signup(){
    RegistrationService.Signup(rg.username, rg.email, rg.password, function(result){
      if(result.status=='success'){

        confirm("Registration Successfull!");
        alert(result.message.status);
        //console.log(result.message.status);
        window.location.href = "#!/";
        
      }else if(result.error){
        alert(result.error);
      }
      
    })





    //window.location.href = "#!/dashboard";

  }



}
