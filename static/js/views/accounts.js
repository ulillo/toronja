fun.views.accounts = Backbone.View.extend({

    /*
    * Bind the event functions to the different HTML elements
    */
    events: {

        'click #create-account-btn': 'createAccount',

    },
    
    /*
    * Class constructor
    */
    initialize: function(options) {
        fun.containers.accounts = this.$el;
    },
    
    /*
    * Render the cubes view
    */
    render: function(){
        if (!this.$el.html()){
            var template = _.template(fun.utils.getTemplate(fun.conf.templates.accounts));
            this.$el.html(template);
        }
        this.$el.removeClass("hide").addClass("show");
    },

    /*
    * create account 
    */
    createAccount: function(event){
        'use strict';
        event.preventDefault();
        console.log('create account');
    }

});