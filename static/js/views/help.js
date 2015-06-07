fun.views.help = Backbone.View.extend({

    /*
    * Bind the event functions to the different HTML elements
    */
    events : {
        "click #help-query": "sendTask",
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

            // Form inputs
            this.description = this.$('#help_description');
            this.firstName = this.$('#help_firstname');
            this.lastName = this.$('#help_lastname');
            this.email = this.$('#help_email');
        }
        this.$el.removeClass("hide").addClass("show");
        //this.$el.show();
    },

    sendTask: function(event) {
        'use strict';
        var idVal, description, firstName, lastName, email, resource, task;

        description = this.description.val();
        firstName = this.firstName.val();
        lastName = this.lastName.val();
        email = this.email.val();

        event.preventDefault();

        $('input[name="current_resource"]:checked').each(function() {
            idVal = $(this).attr("id");

            resource = $("label[for='"+idVal+"']").text();
        });

        task = new fun.models.Task({
            'label': resource,
            'first_name': firstName,
            'last_name': lastName,
            'email': email,
            'description': description
        });

        task.save();

        console.log('ninja', resource, description, firstName, lastName, email);
    }

});
