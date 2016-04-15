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

		// Clear inputs on user logged in
		this.listenTo(app.User, 'loggedIn', this.clearFields);
	},

	register: function() {
		var email = this.$email.val();
		var password = this.$password.val();


		app.User.register(email, password);

	},

	// Clear email and password fields
	clearFields: function() {
		this.$email.val('');
		this.$password.val('');
	}
});