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
        this.$chartCtx = this.$('#calorie-chart');
        this.$7Link = this.$('#7-stats');
        this.$30Link = this.$('#30-stats');
        this.$90Link = this.$('#90-stats');
        this.$365Link = this.$('#365-stats');
        this.$customLink = this.$('#custom-stats');
        this.$statRangeLinks = this.$('.stat-range');

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

        this.$statRangeLinks.removeClass('stat-range-selected');
        this.$('#' + numDays + '-stats').addClass('stat-range-selected');


        // Get the total and average number of calories from last n days and render
        var total = app.FoodRecords.getLastNDaysTotalCalories(numDays);
        var average = app.FoodRecords.getLastNDaysAverageCalories(numDays);

    	var data = {
    		total: total,
    		average: average
    	};

    	// Render data
		this.$statsData.html( this.template( data ) );

        // Render chart
        var caloriesData = app.FoodRecords.getLastNDaysCalories(numDays);

        this.renderChart(caloriesData);

    },

    // Render a chart with the calories data
    renderChart: function(caloriesData) {

        // Create array of numbers for labels
        var dataLength = caloriesData.length;
        var labels = [];

        for(var i = 0; i < dataLength; i++) {
            labels[i] = i + 1;
        }

        // Chart data
        var chartData = {
            labels: labels,
            datasets: [
                {
                    label: 'Calories',
                    data: caloriesData,
                    fill: false,
                    borderColor: 'orange',
                    backgroundColor: 'orange'
                }
            ]
        };

        // Draw chart
        var lineChart =  new Chart(this.$chartCtx, {
            type: 'line',
            data: chartData,
            options: {}
        });

    },

    // Clear chart
    clearChart: function() {

        var ctx = this.$chartCtx[0].getContext('2d');

        ctx.clearRect(0, 0, this.$chartCtx.width(), this.$chartCtx.height());



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
        // Add selected class to link
        this.$statRangeLinks.removeClass('stat-range-selected');
        this.$customLink.addClass('stat-range-selected');

        // Clear old data
        this.$statsData.html('');
        this.clearCustomRangeError();
        this.clearChart();

        // Show view
        this.$customRange.show();
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

            // Render chart
            this.renderChart(app.FoodRecords.getCaloriesBetweenDates(minDate, maxDate));
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