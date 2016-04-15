var app = app || {};

LoginView = Backbone.View.extend({
	el: '#login-view',

	// Attach login function to click of login button
	events: {
		'click .login-button': 'login'
	},

	initialize: function() {
		// Cache email and password inputs
		this.$email = this.$('.login-email');
		this.$password = this.$('.login-password');

		// Clear inputs on user logged in
		this.listenTo(app.User, 'loggedIn', this.clearFields);
	},

	login: function() {
		var email = this.$email.val();
		var password = this.$password.val();


		app.User.login(email, password);
	},

	// Clear email and password fields
	clearFields: function() {
		this.$email.val('');
		this.$password.val('');
	}
});