var app = app || {};

app.SearchItemView = Backbone.View.extend({

	tagName: 'li',

	// Cache the template function for a search item.
    template: _.template( $('#search-item-template').html() ),

    render: function() {
		this.$el.html( this.template( this.model.attributes ) );
		return this;
    }

});