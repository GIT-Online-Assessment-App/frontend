var app = angular.module("myApp", ['ngRoute', 'ngMessages', 'ngStorage', 'tld.csvDownload']);

app.config(function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl : 'faculty/login/index.login.html',
      controller : 'Login.IndexController',
      controllerAs : 'lg'
    })
    .when('/register', {
        templateUrl : 'faculty/register/index.register.html',
        controller : 'Index.RegisterController',
        controllerAs : 'rg'
      })
      .when('/home', {
          templateUrl : 'faculty/dashboard/index.home.html',
          controller : 'Home.IndexController',
          controllerAs : 'hm'
          
      })
      .when('/dashboard', {
        templateUrl : 'faculty/dashboard/index.dashboard.html',
        controller : 'Dashboard.IndexController',
        controllerAs : 'dsh'
        
    })
    .when('/details/:keyw', {
      templateUrl : 'faculty/dashboard/index.details.html',
      controller : 'Details.IndexController',
      controllerAs : 'dtl'
      
  })
  .when('/update/:keyw', {
    templateUrl : 'faculty/dashboard/index.update.html',
    controller : 'Update.IndexController',
    controllerAs : 'upd'    
  })
  .when('/admin-home-dashboard', {

    templateUrl : 'admin/home-dashboard/index.admin-home-dashboard.html',
    controller : 'AdminDashboard.HomeController',
    controllerAs: 'admDshHm'

  })

    .otherwise('/');    //this thing has to be FIXED
})

.run(run);
function run($rootScope, $http, $location, $localStorage) {
        $rootScope.URLs = {
        "ip" : "http://192.168.43.206"
        //"ip"  : "http://10.10.2.219"
        //"ip" : "http://10.10.6.41"
        }


        //code to disable INSPECT ELEMENT
        /* $(document).keydown(function(e){
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
      }); */

        // keep user logged in after page refresh
        if ($localStorage.currentUser) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
        }
        // redirect to login page if not logged in and trying to access a restricted page
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
        var publicPages = ['#!', '#!register', '#!dashboard']; //dashboard is temporary
        
        var restrictedPage = publicPages.indexOf(window.location.href)===-1;

        if (restrictedPage && !$localStorage.currentUser) {
            //$location.path('/register');
            window.location.href ='#!/';
        }
        });



        
      
    };




















    

