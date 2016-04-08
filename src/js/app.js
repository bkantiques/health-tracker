var app = app || {};

// Firebase database
var firebaseRef = new Firebase('https://torrid-fire-530.firebaseio.com/');

// Startup
$(function() {

	// Check authorization and create user
	app.User = new User({authData: firebaseRef.getAuth()});

	/*if(app.User.get('authData')) {

	}*/

	app.LoginView = new LoginView();
	app.RegisterView = new RegisterView();
	app.MainView = new MainView();

	app.Router.navigate('login', {trigger: true})
});