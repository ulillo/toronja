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
    * Render all messages list
    */
    renderAllRecordingsList: function(messages){
        'use strict';
        var template,
            allMessages;
        console.log('render all messages list');
        if (messages) {
            this.messages = messages;
        }

        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.messagesAllTab)
        );

        allMessages = this.$('#all-messages-tab');

        allMessages.html(template);

        this.tbody = this.$('#all-messages-list > tbody');

        this.$el.removeClass("hide").addClass("show");
        this.renderAllMessagesRows();
    },

    /*
    * Render now messages rows
    */
    renderAllMessagesRows: function(){
        'use strict';
        var length,
            i = 0,
            rows,
            data,
            template;
        // tasks length
        length = this.messages.length;

        console.log('all messages length: ',length);

        if (length > 0){
            rows = this.tbody.html('');
            for (i; i < length; ++i) {
                data = _.extend(this.messages.at(i).toJSON(), {i:i});

                template = _.template(
                    fun.utils.getTemplate(fun.conf.templates.messagesRow)
                )(data);

                rows.append(template);
            }
        } else {
            this.noAllMessages();
        }
    },

    /*
    * No now messages
    */
    noAllMessages: function(){
        'use strict';
        var template,
            noAllRecordings;
        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.warning)
        )({message:'noDataAvailable'});

        noAllRecordings = this.$('#no-all-messages');

        noAllRecordings.html(template);
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