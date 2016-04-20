var app = app || {};

// SearchItem Collection

var FoodRecords = Backbone.Firebase.Collection.extend({

	model: app.FoodRecord,

	url: function() {
		return 'https://torrid-fire-530.firebaseio.com/users/' + app.User.get('authData').uid
	}

});