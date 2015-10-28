


angular.module('summary').controller('SummaryCtrl', ['$scope', '$http', 'Protocol',
	function($scope, $http, Protocol) {

		$scope.list = function() {
			$http.get(Protocol.server + '/orders')
			.then(function(response) {
				$scope.orders = response.data;
			});
		};
	}
]);
