


angular.module('order').controller('OrderCtrl', ['$scope', '$http', 'Protocol',
	function($scope, $http, Protocol) {

		$scope.restoreOrder = function() {
			//localStorage.removeItem('orderId');
			if(!!localStorage.orderId) {
				$http.get(Protocol.server + '/orders/' + localStorage.orderId)
				.then(function(response) {
					$scope.order = response.data;
				});
			}
		};

		$scope.list = function() {
			$http.get(Protocol.server + '/orders')
			.then(function(response) {
				$scope.orders = response.data;
			});	
		};

		$scope.create = function() {
			if(!localStorage.orderId) {
				$http.post(Protocol.server + '/orders', {})
                                .then(function(response) {
                                        $scope.order = response.data;
                                        localStorage.orderId = $scope.order.id;
                                });
			}
		};

		$scope.update = function() {
			$http.put(Protocol.server + '/orders/' + $scope.order.id, $scope.order)
			.then(function(response) {
				$scope.order = response.data;
			});
		};

		$scope.delete = function() {
			$http.delete(Protocol.server + '/orders/' + $scope.order.id)
			.then(function(response) {
				$scope.clearOrder();
			});
		};


		$scope.$on(Protocol.addMenuItemEvent, function(event, args) {
			var menuItem = args.item;
			if(!$scope.order) {
				$http.post(Protocol.server + '/orders', {})
				.then(function(response) {
					$scope.order = response.data;
					localStorage.orderId = $scope.order.id;
					$scope.updateMenuItems(menuItem);
				});
			} else {
				$scope.updateMenuItems(menuItem);
			}
		});

		$scope.updateMenuItems = function(menuItem) {
			var itemExists = false;
                        for(var li in $scope.order.lineItems) {
                                if($scope.order.lineItems[li].itemId == menuItem.id) {
                                        $scope.order.lineItems[li].quantity += 1;
                                        itemExists = true;
                                        break;
                                }
                        }
                        if(!itemExists) {
                                var newLineItem = {
                                        itemId: menuItem.id,
                                        item: menuItem,
                                        quantity: 1
                                };
                                $scope.order.lineItems.push(newLineItem);
                        }
                        $http.put(Protocol.server + '/orders/' + $scope.order.id, $scope.order)
                        .then(function(response) {
                                $scope.order = response.data;
                        });	
		};

		$scope.getTotal = function() {
			var total = 0.0;
			if(!!$scope.order) {
				for(var li in $scope.order.lineItems) {
					total += ($scope.order.lineItems[li].quantity * $scope.order.lineItems[li].item.price);
				}
			}
			return total;
		};

		$scope.orderEmpty = function() {
			if(!!$scope.order) {
				if($scope.order.lineItems.length > 0) return false;
			}
			return true;
		};

		$scope.orderNull = function() {
			return !$scope.order;
		};

		$scope.increment = function(lineItem) {
			lineItem.quantity += 1;
			$scope.update();
		};
		$scope.decrement = function(lineItem) {
			if(lineItem.quantity <= 0) {
				lineItem.quantity = 0;
				return;
			}
			lineItem.quantity -= 1;
			if(lineItem.quantity == 0) {
				$scope.remove(lineItem);
			} else {
				$scope.update();
			}
		};
		$scope.remove = function(lineItem) {
			if(!!$scope.order) {
				for(var li in $scope.order.lineItems) {
					if($scope.order.lineItems[li].id == lineItem.id) {
						$scope.order.lineItems.splice(li, 1);
					}
				}
				$scope.update();
			}
		};

		$scope.submitOrder = function() {
			$scope.isPaying = true;
		};
		$scope.cancelOrder = function() {
			$scope.isPaying = false;
		};

		$scope.completeOrder = function(order) {
			$http.put(Protocol.server + '/orders/' + order.id, order);
			$scope.clearOrder();
		};
		
		$scope.clearOrder = function() {
			localStorage.removeItem('orderId');
			$scope.isPaying = false;
			$scope.order = null;
		};
	}
]);
