


angular.module('menu').controller('MenuItemDropdownCtrl', ['$scope',
	function($scope) {
		$scope.status = {
			isopen: false
		};

		$scope.toggled = function(open) {
		};

		$scope.toggleDropdown = function($event) {
			$event.preventDefault();
			$event.stopPropagation();
			$scope.status.isopen = !$scope.status.isopen;
		};
	}
]);
