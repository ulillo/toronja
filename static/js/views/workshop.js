fun.views.workshop = Backbone.View.extend({

    /*
    * Bind the event functions to the different HTML elements
    */
    events : {
        'click #form': 'showHideForm'
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
    },

    showHideForm: function(){
        if($('#formView').hasClass('hide')){
            $('#pills').removeClass('show');
            $('#pills').addClass('hide');
            $('#formView').removeClass('hide');
            $('#formView').addClass('show');
        } else {
            $('#formView').removeClass('show');
            $('#formView').addClass('hide');
            $('#pills').removeClass('hide');
            $('#pills').addClass('show');
        }
    }

});
