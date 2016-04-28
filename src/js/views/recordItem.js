var app = app || {};

app.RecordItemView = Backbone.View.extend({

	tagName: 'tr',

	className: 'food-item record-item',

	events: {
		'click .delete': 'delete'
	},

	// Cache the template function for a search item.
    template: _.template( $('#record-item-template').html() ),

    render: function() {
		this.$el.html( this.template( this.model.attributes ) );
		return this;
    },

    delete: function() {
    	this.model.destroy();
    }

});