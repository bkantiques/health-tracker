var app = app || {};

app.SearchItemView = Backbone.View.extend({

	tagName: 'li',

    className: 'food-item search-item',

	events: {
		'click': 'recordModel'
	},

	// Cache the template function for a search item.
    template: _.template( $('#search-item-template').html() ),

    render: function() {
		this.$el.html( this.template( this.model.attributes ) );
		return this;
    },


    recordModel: function() {
    	// If record view and collection are initialized
    	if(app.RecordView && app.FoodRecords) {

    		var date = app.RecordView.getDate();

    		// Check if date from datepicker is valid
    		if(date && !isNaN(date.getTime())  && date.toJSON()) {

    			var data = this.model.attributes;
    			data.date = date.toJSON();

    			// Create record with model
    			app.FoodRecords.create(data);

    		}


    	}

    }

});