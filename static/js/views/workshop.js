fun.views.workshop = Backbone.View.extend({

    /*
    * Bind the event functions to the different HTML elements
    */
    events : {

    },
    
    /*
    * Class constructor
    */
    initialize : function(options) {
        fun.containers.workshop = this.$el;
    },
    
    /*
    * Render the workshop view
    */
    render : function(){
        if (!this.$el.html()){
            var template = _.template(fun.utils.getTemplate(fun.conf.templates.workshop));
            this.$el.html(template);
        }
        $('#pvtScriptModal').modal('show');
        this.$el.removeClass("hide").addClass("show");
    }

});
