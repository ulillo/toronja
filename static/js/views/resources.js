fun.views.resources = Backbone.View.extend({

    /**
    * Bind the event functions to the different HTML elements
    */
    events: {
        "click #create-resource-btn": "createResource",
        "click .resource-popup": "resourceDetails",
        "click #update-resource-btn": "updateResource",
        "click #close-resource-btn": "closeResource",
        "click input[name='resource_status']": 'updateStatus'
    },

    /**
    * Class constructor
    */
    initialize: function(options){
        fun.containers.resources = this.$el;
    },

    /**
    * Render view
    */
    render: function(){
        console.log('render tasts view');

        var template = _.template(fun.utils.getTemplate(fun.conf.templates.resources));

        this.$el.html(template);
        this.$el.removeClass("hide").addClass("show");

        if (typeof(account) === 'undefined'){
            this.account = localStorage.getItem("username");
        }
    },

     /*
    * Render resources list
    */
    renderResourcesList: function(resources){
        'use strict';
        var template,
            allresources;
        console.log('render resources list');
        if (resources) {
            this.resources = resources;
        }

        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.allresources)
        );

        allresources = this.$('#all-resources-tab');

        allresources.html(template);

        this.tbody = this.$('#resources-list > tbody');

        this.$el.removeClass("hide").addClass("show");
        
        this.renderResourceRows();
    },

    /*
    * Render resource rows
    */
    renderResourceRows: function(){
        'use strict';
        var length,
            i = 0,
            rows,
            data,
            template;
        // resources length
        length = this.resources.length;

        console.log('resources length: ',length);

        if (length > 0){
            rows = this.tbody.html('');
            for (i; i < length; ++i) {
                data = _.extend(this.resources.at(i).toJSON(), {i:i});

                template = _.template(
                    fun.utils.getTemplate(fun.conf.templates.resourceRow)
                )(data);

                rows.append(template);
            }
        } else {
            this.noresources();
        }
    },

    /*
    * No Resources
    */
    noResources: function(){
        'use strict';
        var template,
            noResources;
        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.warning)
        )({message:'noDataAvailable'});

        noResources = this.$('#no-resources');

        noResources.html(template);
    },

    /*
    * Create resource
    */
    createResource: function(event){
        'use strict';
        event.preventDefault();
        // view cache
        var view = this,
            account,
            resource,
            resourceName,
            resourceDescription,
            resourceLabel,
            resourcePayload,
            profile,
            first_name,
            last_name,
            user;

        console.log('create resource event');

        this.resourceName = this.$('#resource_name');
        this.resourceDescription = this.$('#resource_description');
        this.resourceLabel = 'Service Requests';

        account = this.account;

        resourceName = this.resourceName.val();

        resourceDescription = this.resourceDescription.val();

        resourceLabel = this.resourceLabel;

        console.log(account, resourceName, resourceDescription, resourceLabel);

        resourcePayload = {
            title: resourceName,
            description: resourceDescription,
            label: resourceLabel
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

        resourcePayload['first_name'] = first_name;
        resourcePayload['last_name'] = last_name;
        resourcePayload['email'] = user.get('email');

        //console.log(JSON.stringify(profile));

        if (typeof(account) === undefined){
            account = false;
            resourcePayload['public'] = account;
        }

        if (account != undefined & resourceName != undefined){
            resourcePayload['account'] = account;
            
        }

        resource = new fun.models.Resource(resourcePayload);
        resource.save();

        // Clear the stuff from the inputs ;)
        view.$('#resource_name').val('');
        view.$('#resource_description').val('');
    },
    
    /*
    * Resource details
    */
    resourceDetails: function(event){
        'use strict';
        event.preventDefault();
        //view cache
        var view = this,
            name,
            resource,
            resourceUuid,
            resourceTitle,
            resourceAssigned,
            resourceLabel,
            resourceSource,
            resourceStatus,
            resourcePriority,
            resourceSeverity,
            resourceDescription;

        resourceUuid = this.$('#resource-uuid');
        resourceTitle = this.$('#resource-title');
        resourceAssigned = this.$('#resource-assigned');
        resourceLabel = this.$('#resource-label');
        resourceSource = this.$('#resource-source');
        resourceStatus = this.$('#resource-status');
        resourcePriority = this.$('#resource-priority');
        resourceSeverity = this.$('#resource-severity');
        resourceDescription = this.$('#resource-description');

        // get the name of the element targeted by this event
        name = $(event.target).data('name');

        resource = new fun.models.Resource({'uuid':name});

        resource.fetch({
            success: function(response){

                //console.log(response)

                resourceUuid.html(response.get('uuid'));
                resourceTitle.html(response.get('title') || "Where's the title boy?");
                resourceAssigned.html(response.get('assigned'));
                resourceLabel.html(response.get('label'));
                resourceSource.html(response.get('source'));
                resourceStatus.html(response.get('status'));
                resourcePriority.html(response.get('priority'));
                resourceSeverity.html(response.get('severity'));
                resourceDescription.html(response.get('description'));

                $('#resourceModal').modal({
                    'show': true
                });
            },
            error: function(error){
                console.log(error);
            }
        });
        //console.log(resource.toJSON());
    },

    /*
    * Update Resource Status
    */
    updateStatus: function(event){
        'use strict';
        event.preventDefault();
        var view = this,
                   idVal,
                   label,
                   callbacks;

        console.log('update status');

        // new user account callbacks
        callbacks = {
            success: function(){
                console.log('new account success');
            },

            error: function(model, error){
                console.log('wrong stuff on account create');
                console.log(model, error);
            }
        };

        $('input[name="resource_status"]:checked').each(function() {
            idVal = $(this).attr("id");

            label = $("label[for='" + idVal + "']").text();

            console.log(label);

            this.status = label;

            if (label === 'active'){
                /*
                this.model = new fun.models.Account();
                this.model.save(
                    {
                        account: stuff['account'],
                        password: stuff['password'],
                        email: stuff['email']
                    },
                    callbacks
                );
                */
            }

            // missing switch and case stuff...
            // using now, later and done?

        });
    },

    /*
    * Update Resource
    */
    updateResource: function(event){
        'use strict';
        event.preventDefault();
        var view = this,
                   update,
                   status,
                   comment,
                   resourceUuid,
                   callbacks;

        this.status= $('input[name="resource_status"]:checked');
        this.comment = this.$('#resource-comment');
        this.uuid = this.$('#resource-uuid');

        console.log('update resource');

        resourceUuid = this.uuid.text();
        status = this.status.val();
        comment = this.comment.val();

        update = new fun.models.Resource({'uuid':resourceUuid});

        var newRandomStuff = {
            'status': status,
            'comments': {
                comments: [{
                    account: this.account,
                    comment: comment
                }]
            }
        };

        update.save(newRandomStuff, {patch: true});

    },

    /*
    * Close Resource
    */
    closeResource: function(event){
        'use strict';
        event.preventDefault();
        var view = this,
                   callbacks;

        console.log('close resource');

        $('#resourceModal').modal('hide');
    }

});