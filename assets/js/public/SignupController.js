angular.module('SharpModule').controller('SignupController',  ['$scope', '$http', function($scope, $http){
  // set-up loading state
	$scope.signupForm = {
		loading: false,
    email_taken: false,
    username_taken: false
	};
  $scope.registered_successfully = false;

	$scope.submitSignupForm = function(){

    $scope.registered_successfully = false;
		// Set the loading state (i.e. show loading spinner)
		$scope.signupForm.loading = true;
    $scope.signupForm.email_taken = false;
    $scope.signupForm.username_taken = false;

		// Submit request to Sails.
		$http.post('/user', {
			first_name: $scope.signupForm.first_name,
			last_name: $scope.signupForm.last_name,
      username: $scope.signupForm.username,
			email: $scope.signupForm.email,
			password: $scope.signupForm.password
		})
		.then(function onSuccess(sailsResponse){
			angular.copy({},$scope.signupForm);
      $scope.signup.$setPristine();
      $scope.registered_successfully = true;
		})
		.catch(function onError(sailsResponse){

		// Handle known error type(s).
		var emailAddressAlreadyInUse = sailsResponse["data"]["invalidAttributes"] && sailsResponse["data"]["invalidAttributes"]["email"];
    var flag = false;
		if (emailAddressAlreadyInUse) {
      $scope.signupForm.email_taken = true;
      flag = true;
		}

    var usernameAlreadyInUse = sailsResponse["data"]["invalidAttributes"] && sailsResponse["data"]["invalidAttributes"]["username"];

    if (usernameAlreadyInUse) {
      $scope.signupForm.username_taken = true;
      flag = true;
    }
    if (flag) {
      return;
    }
		})
		.finally(function eitherWay(){
			$scope.signupForm.loading = false;
		})
	};
}]);
