fun.views.settings = Backbone.View.extend({

    /*
    * Bind the event functions to the different HTML elements
    */
    events: {
        "click #user-update-btn": "updateUserAccount",
        "click #user-delete-btn": "deleteUserAccount"
    },
    
    /**
    * Class constructor
    */
    initialize: function(options){
        fun.containers.settings = this.$el;
    },

    /**
    * Render view
    */
    render: function(account){
        'use strict';
        //view cache
        var view = this,
            accountProfile = JSON.parse(localStorage.getItem("profile")),
            email,
            firstName,
            lastName,
            location,
            company,
            url,
            template;

        console.log('render settings view');

        this.accountProfile = accountProfile;

        if (account === null){
            account = 'username';
        }

        template = _.template(fun.utils.getTemplate(fun.conf.templates.settings))({'account':account});

        
        this.$el.html(template);


        this.email = this.$('#user_email');
        this.firstName = this.$('#user_first_name');
        this.lastName = this.$('#user_last_name');
        this.location = this.$('#user_location');
        this.company = this.$('#user_company');
        this.url = this.$('#user_url');      

        
        this.firstName.val(this.accountProfile['first_name'] || '');
        this.lastName.val(this.accountProfile['last_name'] || '');
        this.location.val(this.accountProfile['location'] || '');
        this.company.val(this.accountProfile['company'] || '');
        this.url.val(this.accountProfile['url'] || '');

        this.email.val(this.accountProfile['email'] || '');


        this.$el.removeClass("hide").addClass("show");
    },

    /*
    * Set profile information
    */
    setProfileInformation: function(model){
        console.log('setting profile information');
        localStorage.setItem("profile", JSON.stringify(model.toJSON()));
    },

    updateUserAccount: function(event){
        'use strict';
        event.preventDefault();
        var accountInformation,
            email, 
            first_name,
            last_name,
            location,
            company,
            confirm,
            url;

        console.log('update user account settings');

        confirm = new fun.models.User({
            'uuid': this.accountProfile['uuid'],
            'account': this.accountProfile['account']
        });

        email = this.email.val();
        first_name = this.firstName.val();
        last_name = this.lastName.val();
        location = this.location.val();
        company = this.company.val();
        url = this.url.val();

        accountInformation = {
            'first_name': first_name,
            'last_name': last_name,
            'email': email,
            'company': company,
            'location': location,
            'url': url
        };

        confirm.save(accountInformation, {patch: true});

        // display a confirmation message or alert the user that something was wrong.
    },

    deleteUserAccount: function(event){
        'use strict'
        event.preventDefault();
        console.log('delete account');

        var confirm = new fun.models.User({'account':this.accountProfile['account']});
        confirm.destroy();
    }

});