

var appName = 'Pizza App';
var app = angular.module(appName, [
	'ui.bootstrap',
	'menu',
	'order',
	'payment',
	'summary',
	'work'
]);

app.factory('Protocol', function() {
	return {
		server: 'http://montpelier.cs.colostate.edu:10105',
		addMenuItemEvent: 'add-menu-item-event'
	};
});

app.controller('MainCtrl', ['$scope',
	function($scope) {
		$scope.userTypes = ['Cashier', 'Cook', 'Customer', 'Manager'];
		$scope.selectedUser = $scope.userTypes[0];
		$scope.setSelectedUser = function(userType) {
			$scope.selectedUser = userType;
		};
	}
]);

angular.element(document).ready(function() {
	angular.bootstrap(document, [appName]);
});
