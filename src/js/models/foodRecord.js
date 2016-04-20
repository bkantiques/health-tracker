app = app || {};

// FoodRecord model
// Model for food items user wants to record and save in Firebase-
// includes date

app.FoodRecord = Backbone.Model.extend({
	defaults: function() {
		return {
			name: '',
			brand: '',
			calories: 0,
			date: new Date()
		};
	}
});