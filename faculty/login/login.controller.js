app.controller('Login.IndexController', Controller);

function Controller($location, AuthenticationService){
  var lg = this;
  lg.login = login; 

  initController();
  function initController(){
    AuthenticationService.Logout();
  };
  function login(){
    lg.loading = true;
    AuthenticationService.Login(lg.email, lg.password, function(result){
      console.log(result);
      if(result.status == 'success'){        
        
        alert('Welcome '+result.username+'!');
        window.location.href = '#!dashboard';

      }else if(result.status =='failed'){
          lg.error = 'username or password is incorrect';
          lg.msg = 'hello';
          lg.loading = false;
          alert(result.error);
          lg.aa = result;
      }else{
        alert('Error logging in!');
        lg.loading = false;
      }
      lg.loading = false;
    });
  };
}

function resetPassword(){
  alert("Contact Your Admin!");
}