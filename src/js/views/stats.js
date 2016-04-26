var app = app || {};

StatsView = Backbone.View.extend({
	el: '#stats-view',

	events: {
		'click .log-out': 'logout',
		'click #7-stats': 'render7Days',
		'click #30-stats': 'render30Days',
		'click #90-stats': 'render90Days',
		'click #365-stats': 'render365Days',
	},

	initialize: function() {
		this.$statsData = this.$('#stats-data');
	},

	logout: function() {
		app.User.logout();
	},

	// Cache the template function for stats view
    template: _.template( $('#stats-template').html() ),

    renderNDays: function(numDays) {

    	// Get the total and average number of calories from last n days
    	var data = {
    		total: app.FoodRecords.getLastNDaysTotalCalories(numDays),
    		average: app.FoodRecords.getLastNDaysAverageCalories(numDays)
    	};

    	// Render data
		this.$statsData.html( this.template( data ) );

    },

    render7Days: function() {
    	this.renderNDays(7);
    },

    render30Days: function() {
    	this.renderNDays(30);
    },

    render90Days: function() {
    	this.renderNDays(90);
    },

    render365Days: function() {
    	this.renderNDays(365);
    }

});