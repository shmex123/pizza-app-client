


angular.module('menu').controller('MenuCtrl', ['$scope', '$rootScope', '$http', 'Protocol', 
	function($scope, $rootScope, $http, Protocol) {
		$scope.newMenuItem = {};

		$scope.init = function(shown) {
			$scope.shown = shown;
			$scope.list();
		};
		$scope.list = function() {
			$http.get(Protocol.server + '/menu')
			.then(function(response) {
				$scope.menu = response.data;
			});
		};

		$scope.create = function(newMenuItem) {
			if(!newMenuItem.name || !newMenuItem.price) return;
			$http.post(Protocol.server + '/menu', newMenuItem)
			.then(function(response) {
				newMenuItem.price = undefined;
				newMenuItem.name = undefined;
				$scope.list();
			});
		};

		$scope.delete = function(menuItem) {
			$http.delete(Protocol.server + '/menu/' + menuItem.id, menuItem)
			.then(function(response) {
				$scope.list();
			});
		};

		$scope.toggleInStock = function(menuItem) {
			menuItem.inStock = !menuItem.inStock;
			$http.put(Protocol.server + '/menu/' + menuItem.id, menuItem)
			.then(function(response) {
			});
		};

		$scope.setInStock = function(menuItem, val) {
			menuItem.inStock = val;
			$http.put(Protocol.server + '/menu/' + menuItem.id, menuItem)
			.then(function(response) {

			});
		};

		$scope.setSpecial = function(menuItem, val) {
			menuItem.isSpecial = val;
			$http.put(Protocol.server + '/menu/' + menuItem.id, menuItem)
			.then(function(response) {

			});
		};

		$scope.addToOrder = function(menuItem) {
			$rootScope.$broadcast(Protocol.addMenuItemEvent, { item: menuItem });
		};
	}
]);
