fun.views.accounts = Backbone.View.extend({

    /*
    * Bind the event functions to the different HTML elements
    */
    events: {
        'click #create-account-btn': 'createAccount',
    },
    
    /*
    * Class constructor
    */
    initialize: function(options) {
        fun.containers.accounts = this.$el;
    },
    
    /*
    * Render the cubes view
    */
    render: function(){
        if (!this.$el.html()){
            var template = _.template(fun.utils.getTemplate(fun.conf.templates.accounts));
            this.$el.html(template);
        }
        this.$el.removeClass("hide").addClass("show");
    },

    /*
    * Render all accounts list
    */
    renderAllAccountsList: function(accounts){
        'use strict';
        var template,
            allAccounts;
        console.log('render all accounts list');
        if (accounts) {
            this.accounts = accounts;
        }

        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.accountsAllTab)
        );

        allAccounts = this.$('#all-accounts-tab');

        allAccounts.html(template);

        this.tbody = this.$('#all-accounts-list > tbody');

        this.$el.removeClass("hide").addClass("show");
        this.renderAllAccountsRows();
    },

    /*
    * Render all accounts rows
    */
    renderAllAccountsRows: function(){
        'use strict';
        var length,
            i = 0,
            rows,
            data,
            template;
        // tasks length
        length = this.accounts.length;

        console.log('all accounts length: ',length);

        if (length > 0){
            rows = this.tbody.html('');
            for (i; i < length; ++i) {
                data = _.extend(this.accounts.at(i).toJSON(), {i:i});

                template = _.template(
                    fun.utils.getTemplate(fun.conf.templates.accountRow)
                )(data);

                rows.append(template);
            }
        } else {
            this.noAllAccounts();
        }
    },

    /*
    * No all accounts
    */
    noAllAccounts: function(){
        'use strict';
        var template,
            noAllAccounts;
        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.warning)
        )({message:'noDataAvailable'});

        noAllAccounts = this.$('#no-all-accounts');

        noAllAccounts.html(template);
    },

    /*
    * Render active accounts list
    */
    renderActiveAccountsList: function(accounts){
        'use strict';
        var template,
            activeAccounts;
        console.log('render active accounts list');
        if (accounts) {
            this.accounts = accounts;
        }

        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.accountsActiveTab)
        );

        activeAccounts = this.$('#active-accounts-tab');

        activeAccounts.html(template);

        this.tbody = this.$('#active-accounts-list > tbody');

        this.$el.removeClass("hide").addClass("show");
        this.renderActiveAccountsRows();
    },

    /*
    * Render active accounts rows
    */
    renderActiveAccountsRows: function(){
        'use strict';
        var length,
            i = 0,
            rows,
            data,
            template;
        // tasks length
        length = this.accounts.length;

        console.log('all active length: ',length);

        if (length > 0){
            rows = this.tbody.html('');
            for (i; i < length; ++i) {
                data = _.extend(this.accounts.at(i).toJSON(), {i:i});

                template = _.template(
                    fun.utils.getTemplate(fun.conf.templates.accountRow)
                )(data);

                rows.append(template);
            }
        } else {
            this.noActiveAccounts();
        }
    },

    /*
    * No active accounts
    */
    noActiveAccounts: function(){
        'use strict';
        var template,
            noActiveAccounts;
        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.warning)
        )({message:'noDataAvailable'});

        noActiveAccounts = this.$('#no-active-accounts');

        noActiveAccounts.html(template);
    },

    /*
    * Render users accounts list
    */
    renderUsersAccountsList: function(accounts){
        'use strict';
        var template,
            usersAccounts;
        console.log('render users accounts list');
        if (accounts) {
            this.accounts = accounts;
        }

        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.accountsUsersTab)
        );

        usersAccounts = this.$('#users-accounts-tab');

        usersAccounts.html(template);

        this.tbody = this.$('#users-accounts-list > tbody');

        this.$el.removeClass("hide").addClass("show");
        this.renderUsersAccountsRows();
    },

    /*
    * Render users accounts rows
    */
    renderUsersAccountsRows: function(){
        'use strict';
        var length,
            i = 0,
            rows,
            data,
            template;
        // tasks length
        length = this.accounts.length;

        console.log('all users length: ',length);

        if (length > 0){
            rows = this.tbody.html('');
            for (i; i < length; ++i) {
                data = _.extend(this.accounts.at(i).toJSON(), {i:i});

                template = _.template(
                    fun.utils.getTemplate(fun.conf.templates.accountRow)
                )(data);

                rows.append(template);
            }
        } else {
            this.noUsersAccounts();
        }
    },

    /*
    * No users accounts
    */
    noUsersAccounts: function(){
        'use strict';
        var template,
            noUsersAccounts;
        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.warning)
        )({message:'noDataAvailable'});

        noUsersAccounts = this.$('#no-users-accounts');

        noUsersAccounts.html(template);
    },


    /*
    * Render organizations accounts list
    */
    renderOrganizationsAccountsList: function(accounts){
        'use strict';
        var template,
            organizationsAccounts;
        console.log('render organizations accounts list');
        if (accounts) {
            this.accounts = accounts;
        }

        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.accountsOrganizationsTab)
        );

        organizationsAccounts = this.$('#organizations-accounts-tab');

        organizationsAccounts.html(template);

        this.tbody = this.$('#organizations-accounts-list > tbody');

        this.$el.removeClass("hide").addClass("show");
        this.renderOrganizationsAccountsRows();
    },

    /*
    * Render organizations accounts rows
    */
    renderOrganizationsAccountsRows: function(){
        'use strict';
        var length,
            i = 0,
            rows,
            data,
            template;
        // tasks length
        length = this.accounts.length;

        console.log('all organizations length: ',length);

        if (length > 0){
            rows = this.tbody.html('');
            for (i; i < length; ++i) {
                data = _.extend(this.accounts.at(i).toJSON(), {i:i});

                template = _.template(
                    fun.utils.getTemplate(fun.conf.templates.accountRow)
                )(data);

                rows.append(template);
            }
        } else {
            this.noOrganizationsAccounts();
        }
    },

    /*
    * No organizations accounts
    */
    noOrganizationsAccounts: function(){
        'use strict';
        var template,
            noOrganizationsAccounts;
        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.warning)
        )({message:'noDataAvailable'});

        noOrganizationsAccounts = this.$('#no-organizations-accounts');

        noOrganizationsAccounts.html(template);
    },


    /*
    * Render disable accounts list
    */
    renderDisableAccountsList: function(accounts){
        'use strict';
        var template,
            disableAccounts;
        console.log('render disable accounts list');
        if (accounts) {
            this.accounts = accounts;
        }

        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.accountsDisableTab)
        );

        disableAccounts = this.$('#disable-accounts-tab');

        disableAccounts.html(template);

        this.tbody = this.$('#disable-accounts-list > tbody');

        this.$el.removeClass("hide").addClass("show");
        this.renderDisableAccountsRows();
    },

    /*
    * Render disable accounts rows
    */
    renderDisableAccountsRows: function(){
        'use strict';
        var length,
            i = 0,
            rows,
            data,
            template;
        // tasks length
        length = this.accounts.length;

        console.log('all disable length: ',length);

        if (length > 0){
            rows = this.tbody.html('');
            for (i; i < length; ++i) {
                data = _.extend(this.accounts.at(i).toJSON(), {i:i});

                template = _.template(
                    fun.utils.getTemplate(fun.conf.templates.accountRow)
                )(data);

                rows.append(template);
            }
        } else {
            this.noDisableAccounts();
        }
    },

    /*
    * No disable accounts
    */
    noDisableAccounts: function(){
        'use strict';
        var template,
            noDisableAccounts;
        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.warning)
        )({message:'noDataAvailable'});

        noDisableAccounts = this.$('#no-disable-accounts');

        noDisableAccounts.html(template);
    },


    /*
    * create account
    */
    createAccount: function(event){
        'use strict';
        event.preventDefault();
        console.log('create account');
    }

});