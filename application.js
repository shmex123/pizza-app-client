

var appName = 'Pizza App';
var app = angular.module(appName, [
	'menu'
]);

app.factory('Protocol', function() {
	return {
		server: 'http://keeperteacher.com:10105'
	};
});

angular.element(document).ready(function() {
	angular.bootstrap(document, [appName]);
});
