fun.views.help = Backbone.View.extend({

    /*
    * Bind the event functions to the different HTML elements
    */
    events : {
        "click #help-query-btn": "sendTask",
    },
    
    /*
    * Class constructor
    */
    initialize : function(options) {
        fun.containers.help = this.$el;
    },
    
    /*
    * Render the help view
    */
    render : function(){
        if (!this.$el.html()){
            var template = _.template(fun.utils.getTemplate(fun.conf.templates.help));
            this.$el.html(template);
        }
        this.$el.removeClass("hide").addClass("show");
        //this.$el.show();
    },

    sendTask: function(event) {
        'use strict';
        event.preventDefault();
        console.log('ninja');
    }

});
