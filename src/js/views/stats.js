var app = app || {};

StatsView = Backbone.View.extend({
	el: '#stats-view',

	events: {
		'click .log-out': 'logout',
		'click #7-stats': 'render7Days',
		'click #30-stats': 'render30Days',
		'click #90-stats': 'render90Days',
		'click #365-stats': 'render365Days',
        'click #custom-stats': 'switchToCustom',
        'click #custom-range-button': 'renderCustomStats'
	},

	initialize: function() {
		this.$statsData = this.$('#stats-data');
        this.$customRange = this.$('#custom-range');
        this.$minDatepicker = this.$('#min-custom-datepicker');
        this.$maxDatepicker = this.$('#max-custom-datepicker');
        this.$customRangeError = this.$('#custom-range-error');

        this.$minDatepicker.datepicker();
        this.$maxDatepicker.datepicker();

        this.$customRange.hide();
	},

	logout: function() {
		app.User.logout();
	},

	// Cache the template function for stats view
    template: _.template( $('#stats-template').html() ),

    renderNDays: function(numDays) {

        // Get the total and average number of calories from last n days and render
        var total = app.FoodRecords.getLastNDaysTotalCalories(numDays);
        var average = app.FoodRecords.getLastNDaysAverageCalories(numDays);

    	var data = {
    		total: total,
    		average: average
    	};

    	// Render data
		this.$statsData.html( this.template( data ) );

    },

    render7Days: function() {
    	this.renderNDays(7);

        // Clear error message and hide custom range view
        this.$customRange.hide();
        this.clearCustomRangeError();
    },

    render30Days: function() {
    	this.renderNDays(30);
        this.$customRange.hide();
        this.clearCustomRangeError();
    },

    render90Days: function() {
    	this.renderNDays(90);
        this.$customRange.hide();
        this.clearCustomRangeError();
    },

    render365Days: function() {
    	this.renderNDays(365);
        this.$customRange.hide();
        this.clearCustomRangeError();
    },

    // Switch to the custom range
    switchToCustom: function() {
        // Clear old data
        this.$statsData.html('');
        this.$customRange.show();
        this.clearCustomRangeError();
    },

    renderCustomStats: function() {
        // Clear old data
        this.$statsData.html('');
        this.clearCustomRangeError();

        var minDate = this.$minDatepicker.datepicker('getDate');
        var maxDate = this.$maxDatepicker.datepicker('getDate');

        // Check if dates are valid and minDate is before maxDate
        if(!isNaN(minDate.getTime()) && !isNaN(maxDate.getTime()) && minDate.getTime() <= maxDate.getTime()) {

            // Get and render total and average calories from date range
            var total = app.FoodRecords.getTotalCaloriesBetweenDates(minDate, maxDate);
            var average = app.FoodRecords.getAverageCaloriesBetweenDates(minDate, maxDate);

            var data = {
                total: total,
                average: average
            };

            this.$statsData.html( this.template( data ) );
        }
        else {
            // Print error message
            this.customRangeError('Please enter valid date range');
        }

    },

    // Print error message for custom range view
    customRangeError: function(error) {
        this.$customRangeError.text(error);
    },

    clearCustomRangeError: function() {
        this.$customRangeError.text('');
    }

});