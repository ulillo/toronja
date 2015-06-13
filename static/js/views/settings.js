fun.views.settings = Backbone.View.extend({

	/**
	* Bind the event functions to the different HTML elements
	*/
	// click events missing
	events: {

	},
	
	/**
	* Class constructor
	*/
	initialize: function(options){
		fun.containers.settings = this.$el;
		this.accountProfile = localStorage.getItem("profile");

		console.log(this.accountProfile);
	},

	/**
	* Render view
	*/
	render: function(account){
		console.log('render settings view');

		var template = _.template(fun.utils.getTemplate(fun.conf.templates.settings))({'account':account});

		this.$el.html(template);
        this.$el.removeClass("hide").addClass("show");
	},

	/**
	* Set profile information
	*/
	setProfileInformation: function(model){
		console.log('setting profile information');
		localStorage.setItem("profile", JSON.stringify(model.toJSON()));
	}
});