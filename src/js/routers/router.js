var app = app || {};

var Workspace = Backbone.Router.extend({
	routes: {
		'login': 'setLoginView',
		'register': 'setRegisterView',
		'main': 'setMainView',
		'stats': 'setStatsView'
	},

	initialize: function() {

	},

	setLoginView: function() {
		// If logged in
		if(app.User.get('authData')) {
			this.navigate('main', {trigger: true});
		}
		// If not logged in
		else {
			app.LoginView.$el.show();
			app.RegisterView.$el.hide();
			app.MainView.$el.hide();
			app.StatsView.$el.hide();
		}
	},

	setRegisterView: function() {
		// If logged in
		if(app.User.get('authData')) {
			this.navigate('main', {trigger: true});
		}
		// If not logged in
		else {
			app.LoginView.$el.hide();
			app.StatsView.$el.hide();
			app.RegisterView.$el.show();
			app.MainView.$el.hide();
		}
	},

	setMainView: function() {
		// If logged in
		if(app.User.get('authData')) {
			app.LoginView.$el.hide();
			app.RegisterView.$el.hide();
			app.StatsView.$el.hide();
			app.MainView.$el.show();
		}
		// If not logged in
		else {
			this.navigate('login', {trigger: true});
		}

	},

	setStatsView: function() {
		// If logged in
		if(app.User.get('authData')) {
			app.LoginView.$el.hide();
			app.RegisterView.$el.hide();
			app.MainView.$el.hide();
			app.StatsView.$el.show();
		}
		// If not logged in
		else {
			this.navigate('login', {trigger: true});
		}

	}
});