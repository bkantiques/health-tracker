var app = app || {};

SearchView = Backbone.View.extend({
	el: '#search-view',

	events: {
		'keyup #search-input': 'search'
	},

	initialize: function() {
		this.$input = this.$('#search-input');
		this.$foodList = this.$('#search-food-list');
		this.$errorMessage = this.$('.search-error-message');
		this.$loadingIndicator = this.$('.loading-indicator');

		// Hide loading indicator
		this.$loadingIndicator.hide();

		// Render when search results collection changes
		this.listenTo(app.SearchItems, 'reset', this.render);
	},

	// Clear search items and display error message
	errorMessage: function(message) {
		this.$foodList.html('');
		this.$errorMessage.text(message);
	},

	clearErrorMessage: function() {
		this.$errorMessage.text('');
	},

	// Add a search item view for each search item in the collection
	render: function() {
		var self = this;

		// Clear old search items and error message
		this.clearErrorMessage();
		this.$foodList.html('');

		app.SearchItems.forEach(function(searchItem) {

			var view = new app.SearchItemView({model: searchItem});
			self.$foodList.append(view.render().el);

		});

	},

	/*
	When input value is changed, query Nutritionix API for matching
	food items and send data to collection to be rendered
	*/
	search: function() {

		var self = this;
		var prevSearchTerm = this.prevSearchTerm || '';
		prevSearchTerm = prevSearchTerm.trim();

		var searchTerm = this.$input.val().trim();

		// Only search if new trimmed search term is different from previous
		// trimmmed search term
		if(searchTerm != prevSearchTerm) {

			// Clear error message
			this.clearErrorMessage();

			// Save search term
			this.prevSearchTerm = searchTerm;

			if(searchTerm === '') {
				// If field is blank, just clear list and hide loading gif
				this.$foodList.html('');
				this.$loadingIndicator.hide();
			}
			else {

				// Show loading gif
				this.$loadingIndicator.show();

				// Construct query url
				var url = 'https://api.nutritionix.com/v1_1/search/' +
					encodeURIComponent(searchTerm) +
					'?fields=item_name%2Cbrand_name%2Cnf_calories&appId=a68270a3&appKey=874d07a3488cc8c3aa70968ce89aacf0';

				// Query Nutritionix
				fetch(url, {method: 'GET'})
				.catch(function(error) {
					return Promise.reject('There was a problem getting search results');
				})
				.then(function(response) {
					if(response.ok) {
						return response.json();
					}
					else {
						// Problem with response
						return Promise.reject('There was a problem with the search response');
					}
				})
				.then(function(response) {
					var results = response.hits;

					// If search term is the most recent search term, update collection
					if(searchTerm === self.prevSearchTerm) {

						// Hide loading gif
						self.$loadingIndicator.hide();

						if(results.length > 0) {

							// Clear old search items from search items collection
							app.SearchItems.reset();

							var resultsData = [];

							// Add each result to search items collection
							results.forEach(function(result) {

								var data = {
									name: result.fields.item_name,
									brand: result.fields.brand_name,
									calories: result.fields.nf_calories
								};

								resultsData.push(data);
								//app.SearchItems.create(data);

							});

							app.SearchItems.reset(resultsData);

						}
						else {
							// If no matching results
							return Promise.reject('No results found.');
						}
					}

				})
				.catch(function(error) {

					// Hide loading gif
					self.$loadingIndicator.hide();

					self.errorMessage(error);
				});

			}
		}
	},

	// Clear search results by clearing input and re-rendering
	clear: function() {
		this.$input.val('');
		this.$foodList.html('');
	}
});