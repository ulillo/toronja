fun.views.tasks = Backbone.View.extend({

    /**
    * Bind the event functions to the different HTML elements
    */
    // click events missing
    events: {
        "click #create-task-btn": "createTask",
        "click .task-popup": "taskDetails",
    },

    /**
    * Class constructor
    */
    initialize: function(options){
        fun.containers.tasks = this.$el;
    },

    /**
    * Render view
    */
    render: function(){
        console.log('render tasts view');

        var template = _.template(fun.utils.getTemplate(fun.conf.templates.tasks));

        this.$el.html(template);
        this.$el.removeClass("hide").addClass("show");
    },

     /*
    * Render tasks list
    */
    renderTasksList: function(tasks){
        'use strict';
        var template,
            allTasks;
        console.log('render tasks list');
        if (tasks) {
            this.tasks = tasks;
        }

        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.allTasks)
        );

        allTasks = this.$('#all-tasks-tab');

        allTasks.html(template);

        this.tbody = this.$('#tasks-list > tbody');

        this.$el.removeClass("hide").addClass("show");
        
        this.renderTaskRows();
    },

    /*
    * Render task rows
    */
    renderTaskRows: function(){
        'use strict';
        var length,
            i = 0,
            rows,
            data,
            template;
        // tasks length
        length = this.tasks.length;

        console.log('tasks length: ',length);

        if (length > 0){
            rows = this.tbody.html('');
            for (i; i < length; ++i) {
                data = _.extend(this.tasks.at(i).toJSON(), {i:i});

                template = _.template(
                    fun.utils.getTemplate(fun.conf.templates.taskRow)
                )(data);

                rows.append(template);
            }
        } else {
            this.noTasks();
        }
    },

    /*
    * No tasks
    */
    noTasks: function(){
        'use strict';
        var template,
            noTasks;
        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.warning)
        )({message:'noDataAvailable'});

        noTasks = this.$('#no-tasks');

        noTasks.html(template);
    },

    /*
    * Create task
    */
    createTask: function(event){
        'use strict';
        event.preventDefault();
        // view cache
        var view = this,
            account,
            task,
            taskName,
            taskDescription,
            taskLabel,
            taskPayload;

        console.log('create task event');

        this.taskName = this.$('#task_name');
        this.taskDescription = this.$('#task_description');
        this.taskLabel = 'Service Requests';

        account = this.account;

        taskName = this.taskName.val();

        taskDescription = this.taskDescription.val();

        taskLabel = this.taskLabel;

        console.log(account, taskName, taskDescription);

        taskPayload = {
            title: taskName,
            description: taskDescription,
            label: taskLabel
        };

        if (typeof(account) === undefined){
            account = false;
            taskPayload['public'] = account;
        }

        if (account != undefined & taskName != undefined){
            taskPayload['account'] = account;
            
        }

        task = new fun.models.Task(taskPayload);
        task.save();

        // Clear the stuff from the inputs ;)
        view.$('#task_name').val('');
        view.$('#task_description').val('');
    },

    taskDetails: function(event){
        'use strict';
        event.preventDefault();
        //view cache
        var view = this,
            name;

        name = $(event.target).data('name');
        console.log(name);
    }

});