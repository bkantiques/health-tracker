var app = app || {};

// Firebase database
var firebaseRef = firebaseRef || new Firebase('https://torrid-fire-530.firebaseio.com/');

var User = Backbone.Model.extend({

	// Register user with firebase
	register: function(email, password) {
		var self = this;

		var userInfo = {
			email: email,
			password: password
		};

		firebaseRef.createUser(userInfo, function(error, userData) {
			if(error) {
				// Registration error
				alert('reg error');
			}
			else {
				// Registration success

				// Login the user
				self.login(email, password);
			}
		});
	},

	// Login user with firebase
	login: function(email, password) {
		var self = this;

		var userInfo = {
			email: email,
			password: password
		};

		firebaseRef.authWithPassword(userInfo, function(error, authData) {
			if(error) {
				// Login error
				alert('login error');

			}
			else {
				// Login success
				self.trigger('loggedIn');
			}
		});
	},

	logout: function() {
		firebaseRef.unauth();
	}

});