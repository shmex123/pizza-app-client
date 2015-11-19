


angular.module('menu').directive('paMenu', function() {
	return {
		scope: {
			shown: '=editable'
		},
		templateUrl: 'menu/menu.client.view.html'
	};
});
