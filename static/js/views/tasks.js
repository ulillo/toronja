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
            taskPayload,
            profile,
            first_name,
            last_name,
            user;

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

        profile = JSON.parse(localStorage.getItem("profile"));

        user = new fun.models.User(profile);

        user.fetch()

        console.log(user.get('uuid'));
        console.log(user.get('first_name'));

        if (typeof(user.get('first_name')) === 'undefined'){
            first_name = 'Mauricio'
        } else {
            first_name = user.get('first_name');
        }

        if (typeof(user.get('last_name')) === 'undefined'){
            last_name = 'Montero'
        } else {
            last_name = user.get('last_name');
        }

        taskPayload['first_name'] = first_name;
        taskPayload['last_name'] = last_name;
        taskPayload['email'] = user.get('email');

        //console.log(JSON.stringify(profile));

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
    
    /*
    * Task details
    */
    taskDetails: function(event){
        'use strict';
        event.preventDefault();
        //view cache
        var view = this,
            task,
            name,
            taskUuid,
            taskTitle,
            taskAssigned,
            taskLabel,
            taskSource,
            taskStatus,
            taskPriority,
            taskSeverity;

        var taskUuid = this.$('#task-uuid');
        var taskTitle = this.$('#task-title');
        var taskAssigned = this.$('#task-assigned');
        var taskLabel = this.$('#task-label');
        var taskSource = this.$('#task-source');
        var taskStatus = this.$('#task-status');
        var taskPriority = this.$('#task-priority');
        var taskSeverity = this.$('#task-severity');

        var taskDescription = this.$('#task-description');

        // get the name of the element targeted by this event
        name = $(event.target).data('name');

        task = new fun.models.Task({'uuid':name});

        task.fetch({
            success: function(response){

                //console.log(response)

                taskUuid.html(response.get('uuid'));

                taskTitle.html(response.get('title') || "Where's the title boy?");

                taskAssigned.html(response.get('assigned'));

                taskLabel.html(response.get('label'));

                taskSource.html(response.get('source'));

                taskStatus.html(response.get('status'));

                taskPriority.html(response.get('priority'));

                taskSeverity.html(response.get('severity'));

                taskDescription.html(response.get('description'));

                //console.log(title);

                //console.log(response.get('uuid'), response.get('title', response.get('assigned'), response.get('label'), response.get('source'), response.get('status'), response.get('priority'), response.get('severity')));

                //console.log(response['attributes']['title']);

                $('#taskModal').modal({
                    'show': true
                });
            },
            error: function(error){
                console.log(error);
            }
        });

        //console.log(task.toJSON());
    }

});