var app = app || {};

// Firebase database
var firebaseRef = new Firebase('https://torrid-fire-530.firebaseio.com/');

// Startup
$(function() {

	// Check authorization and create user
	app.User = new User({authData: fireBaseRef.getAuth()});
});