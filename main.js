var app = angular.module("myApp", ['ngRoute', 'ngMessages', 'ngStorage']);

app.config(function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl : 'faculty/login/index.login.html',
      controller : 'Login.IndexController',
      controllerAs : 'lg'
    })
    //route to the Faculty account registration page
    .when('/register', {
        templateUrl : 'faculty/register/index.register.html',
        controller : 'Index.RegisterController',
        controllerAs : 'rg'
      })
      //route which displays a page to create/generate question paper
      .when('/home', {
          templateUrl : 'faculty/dashboard/index.home.html',
          controller : 'Home.IndexController',
          controllerAs : 'hm'
          
      })
      //route which displays the History of the exams/tests created
      .when('/dashboard', {
        templateUrl : 'faculty/dashboard/index.dashboard.html',
        controller : 'Dashboard.IndexController',
        controllerAs : 'dsh'
        
    })
    //route to displays a page to show the detailed view of a particular test
    .when('/details/:keyw', {
      templateUrl : 'faculty/dashboard/index.details.html',
      controller : 'Details.IndexController',
      controllerAs : 'dtl'
      
  })
  //route which displays a page for editing/updating question paper
  .when('/update/:keyw', {
    templateUrl : 'faculty/dashboard/index.update.html',
    controller : 'Update.IndexController',
    controllerAs : 'upd'    
  })
  //page which displays a list of available question banks
  .when('/admin-home-dashboard', {

    templateUrl : 'admin/home-dashboard/index.admin-home-dashboard.html',
    controller : 'AdminDashboard.HomeController',
    controllerAs: 'admDshHm'

  })
  //page which is used to insert or update a question bank
  .when('/manage-qb/:qb_name', {
    templateUrl : 'faculty/question-bank/index.manage-qb.html',
    controller : 'Manage.QuestionBankController',
    controllerAs : 'manageQB'
  })
  //if none of the above, then route the user to Login Page
  .otherwise('/');    
})

.run(run);
function run($rootScope, $http, $location, $localStorage) {
        $rootScope.URLs = {
        "ip" : "http://192.168.43.206"
        //"ip"  : "http://10.10.2.219"
        //"ip" : "http://10.10.3.160"
        }


        //comment the below block of code during development/testing
        //START: code to disable INSPECT ELEMENT, 
         $(document).keydown(function(e){
          if(e.which === 123){
             return false;
          }
          else if ((e.ctrlKey && e.shiftKey && e.keyCode == 73) 
          || (e.ctrlKey && e.shiftKey && e.keyCode == 74) 
          || (e.ctrlKey && e.keyCode == 85) //code to prevent user from switching between Browser tabs
          || (e.ctrlKey && e.keyCode == 49)
          || (e.ctrlKey && e.keyCode == 50) 
          || (e.ctrlKey && e.keyCode == 51)
          || (e.ctrlKey && e.keyCode == 52)
          || (e.ctrlKey && e.keyCode == 53)
          || (e.ctrlKey && e.keyCode == 54)
          || (e.ctrlKey && e.keyCode == 55)
          || (e.ctrlKey && e.keyCode == 56)
          || (e.ctrlKey && e.keyCode == 57)) {
            
            return false;
        }
      }); 
      //END: code to disable INSPECT element

        // keep user logged in after page refresh
        if ($localStorage.currentUser) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
        }
        // redirect to login page if not logged in and trying to access a restricted page
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
        var publicPages = ['#!', '#!register']; //dashboard is temporary
        
        var restrictedPage = publicPages.indexOf(window.location.href)===-1;

        if (restrictedPage && !$localStorage.currentUser) {
            //$location.path('/register');
            window.location.href ='#!/';
        }
        });



        
      
    };




















    

