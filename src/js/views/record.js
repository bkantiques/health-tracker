var app = app || {};


var dateUtility = {
	// Return whether 2 dates have the same year, month and day, i.e. are on the same day
	sameDay: function sameDay(date1, date2) {
			return date1.getFullYear() === date2.getFullYear() &&
			date1.getMonth() === date2.getMonth() &&
			date1.getDate() === date2.getDate();
		}
};

RecordView = Backbone.View.extend({

	el: $('#record-view'),

	events: {
		'change #datepicker': 'renderList'
	},

	initialize: function() {
		this.$recordList = this.$('#record-list');
		this.$datepicker = this.$('#datepicker');
		this.$dayTotalCalories = this.$('#day-total-calories');

		// Initialize datepicker, set to today's date to start
		this.$datepicker.datepicker();
		this.$datepicker.datepicker('setDate', '+0d');

	},

	getDate: function() {

		return this.$datepicker.datepicker('getDate');

	},

	// Add a record item view for each record item in the collection
	// and display total calories for the day
	renderList: function() {
		var self = this;

		// Clear old record items and error message
		this.$recordList.html('');
		this.$dayTotalCalories.text('');

		var date = this.getDate();

		// Check if date from datepicker is valid and collection exists
		if(app.FoodRecords && date && !isNaN(date.getTime())) {

			var records = app.FoodRecords.getRecordsByDate(date);

			records.forEach(function(recordItem) {

				var view = new app.RecordItemView({model: recordItem});
				self.$recordList.append(view.render().el);

			});

			this.$dayTotalCalories.text('Total calories: ' + app.FoodRecords.getCaloriesOnDate(date));

		}

	},

	renderCalendar: function() {
		// Get array of date strings from records without repetitions, then turn each into a date object
		var dates = app.FoodRecords.getDates();

		function beforeShowDay(calendarDate) {
			// Find index of date in dates that is on same day as calendar date
			var index = _.findIndex(dates, function(recordDate) {
				return dateUtility.sameDay(calendarDate, recordDate);
			});

			// If index not found, don't add a css class to that calendar date and add a tooltip saying
			// no recorded food
			if(index === -1) {
				return [true, '', 'No recorded food on this date'];
			}
			// If index is found, add a css class and add a tooltip saying there is recorded food
			else {
				return [true, 'has-record', 'You recorded food on this date'];
			}
		}

		// Refresh datepicker against new set of dates
		this.$datepicker.datepicker('option', 'beforeShowDay', beforeShowDay);

		this.$datepicker.datepicker('refresh');

	}

});