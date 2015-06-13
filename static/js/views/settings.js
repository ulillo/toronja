fun.views.settings = Backbone.View.extend({

    /**
    * Bind the event functions to the different HTML elements
    */
    // click events missing
    events: {
        "click #user-update-btn": "updateUserAccount",
    },
    
    /**
    * Class constructor
    */
    initialize: function(options){
        fun.containers.settings = this.$el;
        this.accountProfile = JSON.parse(localStorage.getItem("profile"));
    },

    /**
    * Render view
    */
    render: function(account){
        'use strict';
        //view cache
        var view = this,
            email,
            firstName,
            lastName,
            location,
            company,
            url,
            template;

        console.log('render settings view');

        template = _.template(fun.utils.getTemplate(fun.conf.templates.settings))({'account':account});

        
        this.$el.html(template);


        email = this.$('#user_email');
        firstName = this.$('#user_first_name');
        lastName = this.$('#user_last_name');
        location = this.$('#user_location');
        company = this.$('#user_company');
        url = this.$('#user_url');      

        
        firstName.val(this.accountProfile['first_name'] || '');
        lastName.val(this.accountProfile['last_name'] || '');
        location.val(this.accountProfile['location'] || '');
        company.val(this.accountProfile['company'] || '');
        url.val(this.accountProfile['url'] || '');

        email.val(this.accountProfile['email'] || '');

        //var raton = email.val();

        //console.log('got this sutff up', raton);


        this.$el.removeClass("hide").addClass("show");
    },

    /**
    * Set profile information
    */
    setProfileInformation: function(model){
        console.log('setting profile information');
        localStorage.setItem("profile", JSON.stringify(model.toJSON()));
    },

    updateUserAccount: function(event){
        'use strict';
        event.preventDefault();
        console.log('like a ninja');
    }
});