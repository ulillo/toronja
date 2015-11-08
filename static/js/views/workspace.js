fun.views.workspace = Backbone.View.extend({

    /*
    * Bind the event functions to the different HTML elements
    */
    events : {

    },
    
    /*
    * Class constructor
    */
    initialize : function(options) {
        fun.containers.workspace = this.$el;
    },
    
    /*
    * Render the workspace view
    */
    render : function(){
        if (!this.$el.html()){
            var template = _.template(fun.utils.getTemplate(fun.conf.templates.workspace));
            this.$el.html(template);
        }
        console.log('RUNNING MODAL!!');
        $('#prescriptionFormModal').modal('show');
        this.$el.removeClass("hide").addClass("show");
    }

});
