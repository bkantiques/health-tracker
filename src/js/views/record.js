var app = app || {};

RecordView = Backbone.View.extend({

	el: $('#record-view'),

	initialize: function() {
		this.$datepicker = this.$('#datepicker');

		this.$datepicker.datepicker();


	},

	getDate: function() {

		return this.$datepicker.datepicker('getDate');

	}

});