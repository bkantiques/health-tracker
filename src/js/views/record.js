var app = app || {};

RecordView = Backbone.View.extend({

	el: $('#record-view'),

	events: {
		'change #datepicker': 'render'
	},

	initialize: function() {
		this.$recordList = this.$('#record-list');
		this.$datepicker = this.$('#datepicker');

		this.$datepicker.datepicker();


	},

	getDate: function() {

		return this.$datepicker.datepicker('getDate');

	},

	// Add a search item view for each search item in the collection
	render: function() {
		var self = this;

		// Clear old record items and error message
		this.$recordList.html('');

		var date = this.getDate();

		// Check if date from datepicker is valid and collection exists
		if(app.FoodRecords && date && !isNaN(date.getTime())) {

			// Function to tell if the date of a record matches the datepicker date
			function matchesSelectedDate(recordItem) {
				var recordDate = new Date(recordItem.get('date'));

				return recordDate.getFullYear() === date.getFullYear() && 
				recordDate.getMonth() === date.getMonth() && 
				recordDate.getDay() === date.getDay();
			};

			app.FoodRecords.filter(matchesSelectedDate).forEach(function(recordItem) {

				var view = new app.RecordItemView({model: recordItem});
				self.$recordList.append(view.render().el);

			});

		}

	}

}); 