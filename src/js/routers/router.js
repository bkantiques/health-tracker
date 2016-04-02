var Workspave = Backbone.Router.extend({
	routes: {
		'login': 'setLoginView',
		'register': 'setRegisterView',
		'main': 'setMainView'
	},

	setLoginView: function() {
		// If logged in
		if(app.User.get('authData')) {

		}
		// If not logged in
		else {

		}
	},

	setRegisterView: function() {

	},

	setMainView: function() {

	}
});