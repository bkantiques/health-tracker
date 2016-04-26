var app = app || {};

// SearchItem Collection

var FoodRecords = Backbone.Firebase.Collection.extend({

	model: app.FoodRecord,

	url: function() {
		return 'https://torrid-fire-530.firebaseio.com/users/' + app.User.get('authData').uid
	},

	// Get records from given date
	getRecordsByDate: function(date) {

		// Check that date is valid
		if(date && !isNaN(date.getTime())) {

			// Function to tell if the date of a record matches the given date
			function matchesSelectedDate(recordItem) {
				var recordDate = new Date(recordItem.get('date'));

				return recordDate.getFullYear() === date.getFullYear() &&
				recordDate.getMonth() === date.getMonth() &&
				recordDate.getDate() === date.getDate();
			};

			return this.filter(matchesSelectedDate);

		}

	},

	// Get calories consumed on a given date
	getCaloriesOnDate: function(date) {

		var totalCalories = 0;

		// Check that date is valid
		if(date && !isNaN(date.getTime())) {

			var records = this.getRecordsByDate(date);

			records.forEach(function(record) {
				var recordCalories = record.get('calories');

				// If recordCalories is a number, add to tota calories
				if(!isNaN(recordCalories)) {
					totalCalories += record.get('calories');
				}
			});

		}

		return totalCalories;
	},

	// Get array of dates objects with records on those dates
	getDates: function() {
		// Get array of date json strings from records without repetitions, then turn each into a date object
		return _.union(this.pluck('date'))
			.map(function(dateString) {
				return new Date(dateString);
			});
	},

	// Get array of calories on dates starting on minDate and going to maxDate
	getCaloriesBetweenDates: function(minDate, maxDate) {
		// Only proceed if parameters are dates and minDate less than maxDate
		if(!isNaN(minDate.getTime()) && !isNaN(maxDate.getTime()) && minDate.getTime() <= maxDate.getTime()) {
			
			var indexDate = minDate;
			var numDays = 0;
			var caloriesArray = [];

			// Loop through days between minDate and maxDate
			while(indexDate.getTime() <= maxDate.getTime()) {

				// Add number of calories to array
				caloriesArray[numDays] = this.getCaloriesOnDate(indexDate);

				// Set index date to next day
				indexDate = new Date(indexDate.getTime() + (24 * 60 * 60 * 1000));

				numDays++;
			}

			return caloriesArray;

		}

	},

	// Get calories array from last given number of days
	getLastNDaysCalories: function(numDays) {
		var maxDate = new Date();
		var minDate = new Date(maxDate.getTime() - (numDays - 1) * (24 * 60 * 60 * 1000));

		return this.getCaloriesBetweenDates(minDate, maxDate);
	}
});