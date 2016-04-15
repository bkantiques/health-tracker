var app = app || {};

MainView = Backbone.View.extend({
	el: '#main-view',

	events: {
		'click .log-out': 'logout'
	},

	logout: function() {
		app.User.logout();
	}
});