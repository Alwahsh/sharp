angular.module('SharpModule').controller('LoginController',  ['$scope', '$http', function($scope, $http){
  // set-up loading state
	$scope.loginForm = {
		loading: false,
	};
	$scope.not_confirmed = false;

	$scope.submitLoginForm = function(){

		// Set the loading state (i.e. show loading spinner)
		$scope.loginForm.loading = true;
		$scope.not_confirmed = false;

		// Submit request to Sails.
		$http.post('/auth/local', {
			identifier: $scope.loginForm.username,
			password: $scope.loginForm.password
		})
		.then(function onSuccess(sailsResponse){
			if (sailsResponse["data"]["confirmed_at"]) {
				window.location = "/user/me";
			} else {
				$scope.not_confirmed = true;
			}
		})
		.catch(function onError(sailsResponse){
			alert('wrong information');

		})
		.finally(function eitherWay(){
			$scope.loginForm.loading = false;
		})
	};
}]);
