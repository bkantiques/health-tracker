var app = app || {};

// Firebase database
var firebaseRef = firebaseRef || new Firebase('https://torrid-fire-530.firebaseio.com/');

// Startup
$(function() {

	// Initialize user
	app.User = new User();

	// Initialize views
	app.LoginView = new LoginView();
	app.RegisterView = new RegisterView();
	app.MainView = new MainView();
	app.SearchView = new SearchView();
	app.RecordView = new RecordView();
	app.StatsView = new StatsView();
	// Check authorization and save
	app.User.set('authData', firebaseRef.getAuth());

	// Initialize router
	app.Router = new Workspace();

	// Start history/ run matching route of current address
	if(!Backbone.history.start()) {
		// If no matching route found, run login route
		// Will go to login if not lgged in or main if logged in
		app.Router.navigate('login', {trigger: true});
	}

	// Have authorization views clear error messages when navigated to
	app.LoginView.listenTo(app.Router, 'loginView', app.LoginView.clearError);
	app.RegisterView.listenTo(app.Router, 'regView', app.RegisterView.clearError);


	// Listen to auth changes
	firebaseRef.onAuth(function(authData) {
		if(authData) {
			// On login

			// Save user's authData
			app.User.set('authData', authData);

			// Go to main view
			app.Router.navigate('main', {trigger: true});

			// Initialize firebase collection
			app.FoodRecords = new FoodRecords();

			// Have record view listen to changes in recorded food collection and render on change
			app.RecordView.listenTo(app.FoodRecords, 'all', app.RecordView.renderList);
			app.RecordView.listenTo(app.FoodRecords, 'all', app.RecordView.renderCalendar);


			// Clear search results when a search result is clicked
			app.SearchView.listenTo(app.FoodRecords, 'add', app.SearchView.clear);
		}
		else {
			// On logout

			// Unset user's authData
			app.User.unset('authData');

			// On logout
			app.Router.navigate('login', {trigger: true});
		}
	});


});