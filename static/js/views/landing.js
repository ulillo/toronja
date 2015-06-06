fun.views.landing = Backbone.View.extend({

    /**
    * Bind the event functions to the different HTML elements
    */

    events : {
        'click #landing-signup-btn': 'signup'
    },
    
    /**
    * Class constructor
    */
    initialize: function(options){
        fun.containers.landing = this.$el;
    },

    /**
    * Render view
    */
    render: function(){
        'use strict';
        var template;
        if (!this.$el.html()){
            template = _.template(fun.utils.getTemplate(fun.conf.templates.landing));
            this.$el.html(template);

            // Cache the DOM stuff
            this.signupError = this.$('#landing-alert');
            // Form inputs
            this.account = this.$('#landing_username');
            this.newAccount = this.account;
            this.email = this.$('#landing_email');
            this.password = this.$('#landing_password');
        }
        this.$el.show();
    },

    signup: function(event){
    	'use strict';
        var signupError,
            account,
            password,
            email,
            view,
            rules,
            validationRules,
            callbacks,
            validForm;
        event.preventDefault();
        signupError = this.signupError;
        account = this.account.val();
        password = this.password.val();
        email = this.email.val();
        // check if this view stuff is really needed
        view = this;
        // form validation rules
        rules = {
            rules: {
                landing_username: {
                    minlength: 2,
                    required: true
                },
                landing_email: {
                    required: true,
                    email: true
                },
                landing_password: {
                    minlength: 6,
                    required: true
                }
            }
        }
        validationRules = $.extend (rules, fun.utils.validationRules);

        $('#langing-signup-form').validate(validationRules);
        
        // new user account callbacks
        callbacks = {
            success: function(){
                // Clear the stuff from the inputs ;)
                view.$('#landing_username').val('');
                view.$('#landing_email').val('');
                view.$('#landing_password').val('');
                signupError.hide();
                // login the created user
                fun.utils.login(account, password,
                    {
                        success : function(xhr, status){
                            fun.utils.redirect(fun.conf.hash.dashboard);
                        },
                        error : function(xhr, status, error){
                            // aqui es donde tiene sentido 
                            // enviar al dude a login con un error.
                            fun.utils.redirect(fun.conf.hash.login);
                        }
                    }
                );
            },

            error: function(model, error){
                // Catch duplicate errors or some random stuff
                signupError.show();
                // TODO: on error add class error and label to the input field
                if (error.responseText.indexOf('account') != -1){
                    signupError.find('p').html('Username is already taken.');
                }
                else if (error.responseText.indexOf('email') != -1){
                    signupError.find('p').html('Email is invalid or already taken.');
                }
                else {
                    signupError.find('p').html('what daa!?');
                }
                
            }
        };
        
        // check for a valid form and create the new user account
        validForm = $('#langing-signup-form').valid();
        if (validForm){
            //event.preventDefault();
            this.model = new fun.models.Account();
            this.model.save(
                {
                    account: account,
                    password: password,
                    email: email
                },
                callbacks
            );
        }
    }
});