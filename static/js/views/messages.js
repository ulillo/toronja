fun.views.messages = Backbone.View.extend({

    /*
    * Bind the event functions to the different HTML elements
    */
    events: {

        'click #create-message-btn': 'createMessage',

    },
    
    /*
    * Class constructor
    */
    initialize: function(options) {
        fun.containers.messages = this.$el;
    },
    
    /*
    * Render the cubes view
    */
    render: function(){
        if (!this.$el.html()){
            var template = _.template(fun.utils.getTemplate(fun.conf.templates.messages));
            this.$el.html(template);
        }
        this.$el.removeClass("hide").addClass("show");
    },

    /*
    * create message 
    */
    createMessage: function(event){
        'use strict';
        event.preventDefault();
        console.log('create message');
    }

});