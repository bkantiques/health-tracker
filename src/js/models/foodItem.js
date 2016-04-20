var app = app || {};

// FoodItem model
// Model for selectable food items from Nutritionix API

app.FoodItem = Backbone.Model.extend({

	defaults: {
		name: '',
		brand: '',
		calories: 0
	}

});