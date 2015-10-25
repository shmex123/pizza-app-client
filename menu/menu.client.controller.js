


angular.module('menu').controller('MenuCtrl', ['$scope', '$http', 'Protocol', 
	function($scope, $http, Protocol) {
		$scope.newMenuItem = {};
		$scope.list = function() {
			$http.get(Protocol.server + '/menu')
			.then(function(response) {
				$scope.menu = response.data;
			});
		};

		$scope.create = function(newMenuItem) {
			$http.post(Protocol.server + '/menu', newMenuItem)
			.then(function(response) {
				newMenuItem = {};
				$scope.list();
			});
		};
	}
]);
