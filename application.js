

var appName = 'Pizza App';
var app = angular.module(appName, [
	'ui.bootstrap',
	'menu',
	'order',
	'payment'
]);

app.factory('Protocol', function() {
	return {
		server: 'http://montpelier.cs.colostate.edu:10105',
		addMenuItemEvent: 'add-menu-item-event'
	};
});

angular.element(document).ready(function() {
	angular.bootstrap(document, [appName]);
});
