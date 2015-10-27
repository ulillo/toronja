fun.views.dashboard = Backbone.View.extend({
   
    /**
    * Bind the event functions to the different HTML elements
    */
    events: {
        'click #today-btn': 'today',
        'click #this-week-btn': 'thisWeek',
        'click #this-month-btn': 'thisMonth',
        'click #this-year-btn': 'thisYear'
    },

    initialize: function(options){
        // Initialize view constructor
        'use strict';
        fun.containers.dashboard = this.$el;

        fun.omnibus.on("change:system_admin", function(){
            this.renderBoo();
        }, this);
    },

    render: function(account, summary, billing){
        // Render view function
        'use strict';
        var template;

        if (typeof(account) === 'undefined'){
            this.account = localStorage.getItem("username");
        } else {
            this.account = account;
        }

        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.dashboard)
        )({'account':this.account});

        this.$el.html(template);
        this.$el.removeClass("hide").addClass("show");

        this.renderTodaySummary(this.account, summary, billing);
        this.renderTodayActivityChart();
        //this.renderLatestRecords();
        this.renderRecordType();
    },

    renderBoo: function(){
        'use strict';
        console.log('corporate warfare');
    },

    renderTodaySummary: function(summary, billing){
        // Render today summary
        'use strict';
        var data,
            template,
            todaySummary;

        if(summary){
            this.summary = summary;
        }

        if(billing){
            this.billing = billing;
        }

        if(summary && billing){
            data = _.extend(this.summary.toJSON(), 
                            this.billing.toJSON());
        } else {
            data = {
                minutes: 0,
                records: 0,
                billing: 0,
                record_avg: 0
            };
        }
        console.log('IN HERE!!!',this.summary,this.billing);
        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.todaySummary)
        )(data);
        
        todaySummary = this.$('#fun-today-summary');
        todaySummary.html(template);
    },

    renderTodayActivityChart: function(summary){
        // Render today activity chart
        // This hole summary can be parsed in a single requests
        // directly to the flot.js library.
        'use strict';
        var data = [],
            //seconds = [],
            minutes = [],
            records = [],
            template,
            todayActivityChart;

        // check if response from the server
        if(summary){
            this.summary = summary;
            //this.seconds = summary.get('seconds');
            this.minutes = summary.get('minutes');
            this.records = summary.get('records');
        }

        //seconds = _.pairs(this.seconds)

        minutes = _.pairs(this.minutes);

        records = _.pairs(this.records);

        //data.push({
        //    data: seconds,
        //    label: 'Seconds'
        //});

        data.push({
            data: minutes,
            label: 'Minutes'
        });
        
        data.push({
            data: records,
            label: 'Records',
            points: {show: false},
            lines: {lineWidth: 2, fill: false}
        });

        console.log('THIS DATA!!!',data);
        // html template
        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.todayActivityChart)
        )(data);

        todayActivityChart = this.$('#fun-today-activity-chart');
        todayActivityChart.html(template);

        // clean charts
        Charts.line('#line-chart', data);
    },

    renderLatestRecords: function(collection){
        // Render latesst records
        'use strict';
        var template,
            latestRecords;

        if (collection !== undefined && collection !== null) {
            this.collection = collection;
        } else {
            this.collection = 0;
        }
        
        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.latestRecords)
        );

        latestRecords = this.$('#fun-latest-records');
        latestRecords.html(template);

        this.tbody = this.$('#records-list > tbody');
        this.$el.removeClass("hide").addClass("show");
        this.renderRows();
    },

    renderRecordType: function(){
        // Render records type
        'use strict';
        var data,
            series,
            i = 0,
            counter,
            recordType,
            template;

        // Randomly Generated Data
        data = [],
        series = Math.floor(Math.random() * 6) + 3;

        for (i; i < series; i++) {
            data[i] = {
                label: "Series" + (i + 1),
                data: Math.floor(Math.random() * 100) + 1
            }
        }

        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.recordType)
        )(data);

        recordType = this.$('#fun-record-type');
        recordType.html(template);

        $.plot('#pie-chart', data, {
            series: {
                pie: {
                    show: true
                }
            }
        });
    },

    renderRows: function(){
        // Render rows
        'use strict';
        var vonCount = 0,
            length,
            rows,
            data,
            template;

        length = this.collection.length;

        if (length !== undefined || length !== null && length > 0) {
            rows = this.tbody.html('');

            // can believe this shit.

            var datfuq = this.collection.at(vonCount).toJSON();
           
            // da fuq dude?
            for (vonCount; vonCount < 7; ++vonCount) {

                data = _.extend(datfuq, {counter:vonCount});

                template = _.template(
                    fun.utils.getTemplate(fun.conf.templates.recordRow)
                )(data);

                rows.append(template);
            }
        } else {
            this.noRecords();
        }
    },

    noRecords: function() {
        // No records
        'use strict';
        var template,
            noRecords;
        // No records
        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.warning)
        )({message:'noDataAvailable'});

        noRecords = this.$('#no-records');

        noRecords.html(template);
    },

    today: function(event){
        'use strict';
        // Today
        console.log('today event');
    },

    thisWeek: function(event) {
        'use strict';
        // This week
        console.log('this week event');
    },

    thisMonth: function(event){
        'use strict';
        // This month
        console.log('this month event');
    },

    thisYear: function(event){
        'use strict';
        // This year
        console.log('this year event');
    }

});