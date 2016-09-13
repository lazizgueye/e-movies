﻿

// Contrôleur de la page d'accueil
routeAppControllers.controller('homeCtrl', ['$scope', '$location','$routeParams','$http',
	function($scope, $location, $routeParams, $http){
        $scope.message = "Bienvenue sur la page d'accueil";
		$scope.searchAction = function(){
            $location.path("/search/"+ $scope.query);
	}
	//Meilleures ventes :		
	$scope.datasBest = [];
	$http.get('json/jsonListDeFilm2.php').success(function(data){ //get meilleures ventes
		$scope.datasBest = data;
		for(i=0;i<data.length;i++){
			if($scope.datasBest[i].poster == "N/A"){
				$scope.datasBest[i].poster = "images/logos/no-image.jpg";
			}
		}
	});
	//Suggestion :		
	$scope.datasSuggest = [];
	$http.get('json/jsonListDeFilm2.php').success(function(data){ //get suggestions
		$scope.datasSuggest = data;
		for(i=0;i<data.length;i++){
			if($scope.datasSuggest[i].poster == "N/A"){
				$scope.datasSuggest[i].poster = "images/logos/no-image.jpg";
			}
		}
	});	        
	
	
    }
]);

// Contrôleur de la page de search
routeAppControllers.controller('searchCtrl', ['$scope', '$location', '$routeParams', '$http',
    function($scope, $location, $routeParams, $http){
		$scope.query = $routeParams.query;		
		
		$scope.datas = [];
		$http.get('json/jsonListDeFilm.php').success(function(data){
			$scope.datas = data;
			for(i=0;i<data.length;i++){
				if($scope.datas[i].poster == "N/A"){
					$scope.datas[i].poster = "images/logos/no-image.jpg";
				}
			}
		});	
		
		/*alert($location.$$path);*/

		$scope.detailAction = function(){
            $location.path("/detail/rrr");//+ $scope.id);
        }
    }
]);


// Contrôleur de la page detail
routeAppControllers.controller('detailCtrl', ['$scope', '$location', '$routeParams', '$http',
    function($scope, $location, $routeParams, $http){
		//$scope.id = $routeParams.id;	
		$scope.details = [];
		$http.get('json/jsonUnSeulFilm.php').success(function(data){
			//alert(data.movies[0].title);
			$scope.details = data[0];
		});		
    }
]);

