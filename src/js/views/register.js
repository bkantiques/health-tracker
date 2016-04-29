var app = app || {};

RegisterView = Backbone.View.extend({
	el: '#register-view',

	// Attach register function to click of register button
	events: {
		'click .register-button': 'register'
	},

	initialize: function() {
		// Cache email and password inputs
		this.$email = this.$('.register-email');
		this.$password = this.$('.register-password');
		this.$errorMessage = this.$('.error-message');

		// Clear inputs on user logged in
		this.listenTo(app.User, 'loggedIn', this.clearFields);
		this.listenTo(app.User, 'regError', this.errorMessage);
		this.listenTo(app.User, 'loginError', this.errorMessage);
	},

	register: function() {
		var email = this.$email.val();
		var password = this.$password.val();

		this.clearError();


		app.User.register(email, password);

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
				message = 'Please enter a valid password';
				break;
			case 'EMAIL_TAKEN':
				message = 'That email is already taken';
				break;
			case 'NETWORK_ERROR':
				message = 'A network error occurred';
				break;
			default:
				message = 'Error registering user';
		}

		this.$errorMessage.text(message);
	},

	// Clear error message
	clearError: function() {
		this.$errorMessage.text('');
	}

});