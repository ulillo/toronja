fun.views.recordings = Backbone.View.extend({

	/**
	* Bind the event functions to the different HTML elements
	*/
	// click events missing
	events: {

	},
	
	/**
	* Class constructor
	*/
	initialize: function(options){
		fun.containers.recordings = this.$el;
	},

	/**
	* Render view
	*/
	render: function(){
		console.log('render recordings view');

		var template = _.template(fun.utils.getTemplate(fun.conf.templates.recordings));

		this.$el.html(template);
        this.$el.removeClass("hide").addClass("show");
	},

	/*
    * Render all recordings list
    */
    renderAllRecordingsList: function(recordings){
        'use strict';
        var template,
            allRecordings;
        console.log('render all recordings list');
        if (recordings) {
            this.recordings = recordings;
        }

        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.recordingsAllTab)
        );

        allRecordings = this.$('#all-recordings-tab');

        allRecordings.html(template);

        this.tbody = this.$('#all-recordings-list > tbody');

        this.$el.removeClass("hide").addClass("show");
        this.renderAllRecordingsRows();
    },

    /*
    * Render now task rows
    */
    renderAllRecordingsRows: function(){
        'use strict';
        var length,
            i = 0,
            rows,
            data,
            template;
        // tasks length
        length = this.recordings.length;

        console.log('all recordings length: ',length);

        if (length > 0){
            rows = this.tbody.html('');
            for (i; i < length; ++i) {
                data = _.extend(this.recordings.at(i).toJSON(), {i:i});

                template = _.template(
                    fun.utils.getTemplate(fun.conf.templates.recordingRow)
                )(data);

                rows.append(template);
            }
        } else {
            this.noAllRecordings();
        }
    },

    /*
    * No now tasks
    */
    noNowTasks: function(){
        'use strict';
        var template,
            noAllRecordings;
        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.warning)
        )({message:'noDataAvailable'});

        noAllRecordings = this.$('#no-all-recordings');

        noAllRecordings.html(template);
    },
});