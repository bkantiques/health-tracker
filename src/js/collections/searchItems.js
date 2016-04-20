var app = app || {};

// SearchItem Collection

var SearchItems = Backbone.Collection.extend({

	model: app.SearchItem

});

app.SearchItems = new SearchItems();