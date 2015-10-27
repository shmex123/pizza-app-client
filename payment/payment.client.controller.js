



angular.module('payment').controller('PaymentCtrl', ['$scope', '$http', 'Protocol',
	function($scope, $http, Protocol) {
		$scope.init = function() {
			if(!!$scope.order) {
				$scope.paymentTypes = ['Credit Card', 'Cash'];

				$scope.resetPayment = function() {
					$scope.newPayment = {};
					$scope.newPayment.paymentType = $scope.paymentTypes[0];
				};

				$scope.resetPayment();

				$scope.addPayment = function(payment) {
					$scope.order.transactions.push(payment);
					$scope.update();
					$scope.resetPayment();
				};

				$scope.removePayment = function(payment) {
					for(var i = 0; i < $scope.order.transactions.length; i++) {
						if($scope.order.transactions[i].id === payment.id) {
							$scope.order.transactions.splice(i, 1);
							break;
						}
					}
					$scope.update();
				};

				$scope.getDifference = function() {
					var payed = 0.0;
					for(var t in $scope.order.transactions) {
						payed += $scope.order.transactions[t].amount;
					}
					return $scope.getTotal() - payed;
				};

				$scope.paymentTip = function() {
					var tip = $scope.getDifference();
					if(tip < 0) tip = -tip;
					else tip = 0.0;
					return tip;
				};

				$scope.paymentBalance = function() {
					var bal = $scope.getDifference();
					if(bal < 0) bal = 0.0;
					return bal;
				};
			}
		};
	}
]);
