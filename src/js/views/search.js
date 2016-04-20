var app = app || {};

SearchView = Backbone.View.extend({
	el: '#search-view',

	events: {
		'keyup #search-input': 'search'
	},

	initialize: function() {
		this.$input = this.$('#search-input');
		this.$foodList = this.$('#search-food-list');
	},

	/*
	When input value is changed, query Nutritionix API for matching
	food items and send data to collection to be rendered
	*/
	search: function() {
		var prevSearchTerm = this.prevSearchTerm || '';
		prevSearchTerm = prevSearchTerm.trim();

		var searchTerm = this.$input.val().trim();

		// Only search if new trimmed search term is different from previous
		// trimmmed search term
		if(searchTerm != prevSearchTerm) {

			// Construct query url
			var url = 'https://api.nutritionix.com/v1_1/search/' +
				encodeURIComponent(searchTerm) +
				'?fields=item_name%2Cbrand_name%2Cnf_calories&appId=a68270a3&appKey=874d07a3488cc8c3aa70968ce89aacf0';

			fetch(url, {method: 'GET'})
			.then(function(response) {
				if(response.ok) {
					console.log(response);
				}
			})
			.catch();

		}
	}
});