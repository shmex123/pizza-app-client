


angular.module('work').controller('WorkCtrl', ['$scope', '$http', 'Protocol',
	function($scope, $http, Protocol) {
		$scope.list = function() {
			$http.get(Protocol.server + '/orders')
			.then(function(response) {
				$scope.orders = [];
				for(var d in response.data) {
					if(response.data[d].status == 'PAYED')
						$scope.orders.push(response.data[d]);
				}
			});
		};

		$scope.markComplete = function(order) {
			order.status = 'FULFILLED';
			$http.put(Protocol.server + '/orders/' + order.id + '/fulfilled', order)
			.then(function(response) {
				$scope.list();
			});
		};
	}
]);
