var app = app || {};

// SearchItem model
// Model for selectable food items from Nutritionix API

app.SearchItem = Backbone.Model.extend({

	defaults: {
		name: '',
		brand: '',
		calories: 0
	},

	// Search items do not have persistence so we override persistence methods
	sync: function() {
		return null;
	},

	fetch: function() {
		return null;
	},

	save: function() {
		return null;
	}

});