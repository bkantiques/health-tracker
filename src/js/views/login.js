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
		this.$errorMessage = this.$('.error-message');

		// Clear inputs on user logged in
		this.listenTo(app.User, 'loggedIn', this.clearFields);
		this.listenTo(app.User, 'loginError', this.errorMessage);
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
	},

	// Catch error message from registering or logging in after registering
	// and print
	errorMessage: function(error) {
		var message;

		switch (error.code) {
			case 'INVALID_EMAIL':
				message = 'Please enter a valid email';
				break;
			case 'INVALID_PASSWORD':
				message = 'Incorrect password';
				break;
			case 'INVALID_USER':
				message = 'That account does not exist';
				break;
			case 'NETWORK_ERROR':
				message = 'A network error occurred';
				break;
			default:
				message = 'Error logging in user';
		}

		this.$errorMessage.text(message);
	},

	// Clear error message
	clearError: function() {
		this.$errorMessage.text('');
	}
});