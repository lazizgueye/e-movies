﻿
routeAppControllers.controller('loginCtrl', ['$scope', '$location', '$routeParams', '$http', '$rootScope', 'ngDialog', '$timeout', 'UserService', 'AuthenticationService',
    function($scope, $location, $routeParams, $http, $rootScope, ngDialog, $timeout, UserService, AuthenticationService){	
        $scope.user = false;
		initController();
		
		/** tester si l'utilisateur est connecté ou pas ***/		
		function initController() {
			if($rootScope.globals.currentUser){
				loadCurrentUser();
			}
        }
		
		// charger l'identifiant du user qui s'etait connecté et qui ne s'est pas déconnecté
        function loadCurrentUser() {
            UserService.userManage().GetByUsername($rootScope.globals.currentUser.email)
                .then(function (user) {
					$scope.user = user;
					//location.reload();
					alert($scope.user.email);
                });
        }
		
		$scope.deconnexion=function(){
			AuthenticationService.Authentication().ClearCredentials();
			$scope.$apply();
			$location.path("/home");
		}
		
        /*$scope.dialogLogin = function () {
            ngDialog.open({ template: 'dialogLogin' });
        }; */       
        
		/*$scope.dialogSign_up = function () {
            ngDialog.open({ template: 'dialogSign_up' });
        };*/
        /*$rootScope.$on('ngDialog.setPadding', function (event, padding){
            angular.element( document.querySelector('.paddingHeader') ).css('padding-right', padding + 'px');
        });*/

		// deconnexion
	   $scope.searchAction2 = function(){
            $location.path("/search/"+ $scope.queryIndex);
    	} 
		
		// bouton back de la navigation
		$scope.back = function () {
            window.history.back();
        };  
    }
]);   

routeAppControllers.controller('panierCtrl', ['$scope', '$location', '$routeParams', '$http', '$rootScope', 'ngDialog', '$timeout',
    function($scope, $location, $routeParams, $http, $rootScope, ngDialog, $timeout){	
        /** tester dialogue ***/
        $scope.dataPanier1=dataPanier;
        $scope.dansPanier=dansPanier;
        

        $scope.dataAchat1=dataAchat;
        $scope.dataAvis1=dataAvis;
        $scope.dataPanierTotal=dataPanierTotal;


        
        // fonction ajout avis
        /*$scope.addAvis = function (id,titre,annee) {
              dataAvis.push(new Array(titre));
        };*/

        $scope.updateQuantite = function (index, qte){                     
            $scope.dataPanier1[index][4]=qte;
			
			$scope.dataPanierTotal[0]=0;
			for(i=0;i<$scope.dataPanier1.length;i++){
				$scope.dataPanierTotal[0]=$scope.dataPanierTotal[0]+($scope.dataPanier1[i][4]*$scope.dataPanier1[i][5]);
			}
        };
		
        $scope.clearPanier=function(){
            while(dataPanier.length){                
                dataPanier.shift();                
            }
            dansPanier.shift();
            dataPanierTotal[0]=0;
            dansPanier[0]=false;            
        }
		
        $scope.deletePanier=function(index){                       
            dataPanierTotal[0]= dataPanierTotal[0] - (dataPanier[index][4]*dataPanier[index][5]);
            dataPanier.splice(index, 1); 

            if(dataPanier.length == 0){
                dansPanier.shift();
                dansPanier[0]=false;
            }
        }
    }
]);   

 routeAppControllers.controller('loginValidateCtrl', ['$scope', '$location', '$routeParams', '$http', '$rootScope', 'ngDialog', '$timeout', 'AuthenticationService', 'FlashService', 'UserService',
	function($scope, $location, $routeParams, $http, $rootScope, ngDialog, $timeout, AuthenticationService, FlashService, UserService){   
			
			/*var vm = $scope;
			$scope.login = function(){
				alert(AuthenticationService.Authentication().Login("hh","jj"));
			}
		
			/*var vm = this;
			vm.login = login; 
			(function initController() {
				// reset login status
				AuthenticationService.ClearCredentials();
			})();*/
	 
			$scope.login = function(){
				$scope.vm.dataLoading = true;
				AuthenticationService.Authentication().Login($scope.vm.email, $scope.vm.pwd, function (response) {
					if (response.success) {
						AuthenticationService.Authentication().SetCredentials($scope.vm.email, $scope.vm.pwd);
						//$location.path('#/home');						
						$scope.$apply();
						$location.path('/');
						$scope.vm.dataLoading = false;
					} else {
						FlashService.Error(response.message);
						$scope.vm.dataLoading = false;
						//alert(response.message);
					}
				});
			};	
			
			$scope.signUp = function(){
				var user={"laststname":$scope.user.nom, 
							"firstname":$scope.user.pName, 
							"adress":$scope.user.adress, 
							"zipCode":$scope.user.zipCode, 
							"country":"France", 
							"phone":$scope.user.tel, 
							"email":$scope.user.email, 
							"password":$scope.user.pwd1,
							"notification":$scope.user.notif};
				
				$scope.dataLoadingSign_up = true;
				
				UserService.userManage().Create(user).then(function (response) {
						if (response.success) {							
							FlashService.Success('Registration successful', true);
							alert("good");
							$location.path('/');
							$scope.dataLoadingSign_up = false;
						} else {
							alert("not good");
							FlashService.Error(response.message);
							$scope.dataLoadingSign_up = false;
						}
				});
			};

						
	}    
 ]);   
    
    


