fun.views.navbar = Backbone.View.extend({

	events: {
        'click #details-report-btn': 'detailsReport',
        'click input[name="current_account"]': 'setAccountContext'
	},

    initialize: function(options) {
        fun.containers.navbar = this.$el;
        // get account and context from local and session storages.
        this.account = localStorage.getItem("username");
        this.context = sessionStorage.getItem("context");

        fun.omnibus.on("change:context", function(){
            this.renderContext();
        }, this);

        fun.omnibus.on("change:system_admin", function(){
            this.renderContext();
        }, this);
    },
    
    render: function(){
        var template = _.template(fun.utils.getTemplate(fun.conf.templates.navbar));

        this.$el.html(template);
        this.$el.removeClass("hide").addClass("show");

        if(fun.utils.loggedIn()){
            console.log('Just enter the dungeon!');
            this.renderDashboard();
        } else {
            console.log('Out of the dungeon');
            this.renderLanding();
        }
    },

    renderContext: function(){
        'use strict';
        var account = localStorage.getItem("username");
        var context = sessionStorage.getItem("context");

        if (context !== null && context.trim() === 'System Admin') {
            this.$('#nav-new-account').removeClass('hide').addClass('show');
            //this.$('#nav-new-cube').removeClass('hide').addClass('show');
            this.$('#nav-new-resource').removeClass('hide').addClass('show');
            this.$('#nav-new-gateway').removeClass('hide').addClass('show');
            this.$('#nav-new-contact').removeClass('show').addClass('hide');
            this.$('#nav-new-campaign').removeClass('show').addClass('hide');
            this.$('#nav-new-org').removeClass('show').addClass('hide');
        } else {
            // if not admin, we check for user or organization accounts
            if (account !== context && context !== null){
                // check if context !== null fix the stuff 
                this.$('#nav-new-org').removeClass('show').addClass('hide');
                this.$('#nav-new-team').removeClass('hide').addClass('show');
                this.$('#nav-new-member').removeClass('hide').addClass('show');
            } else {
                this.$('#nav-new-member').removeClass('show').addClass('hide');
                this.$('#nav-new-team').removeClass('show').addClass('hide');
                this.$('#nav-new-org').removeClass('hide').addClass('show');  
            }
        }
    },

    renderLanding: function(){
        var template = _.template(fun.utils.getTemplate(fun.conf.templates.navLanding));

        var navLanding = this.$('#fun-nav-landing');
        navLanding.html(template);
    },

    renderDashboard: function(){
        'use strict';
        var template,
            navDashboard,
            account,
            context;

        account = localStorage.getItem("username");
        context = sessionStorage.getItem("context");

        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.navDashboard)
        )({'account':account});

        navDashboard = this.$('#fun-nav-dashboard');
        navDashboard.html(template);

        // first we check for system admin
        if (context !== null && context.trim() === 'System Admin') {
            this.$('#nav-new-account').removeClass('hide').addClass('show');
            //this.$('#nav-new-cube').removeClass('hide').addClass('show');
            this.$('#nav-new-resource').removeClass('hide').addClass('show');
            this.$('#nav-new-gateway').removeClass('hide').addClass('show');
            this.$('#nav-new-contact').removeClass('show').addClass('hide');
            this.$('#nav-new-campaign').removeClass('show').addClass('hide');
            this.$('#nav-new-org').removeClass('show').addClass('hide');
        } else {
            // if not admin, we check for user or organization accounts
            if (account !== context && context !== null){
                // check if context !== null fix the stuff 
                this.$('#nav-new-org').removeClass('show').addClass('hide');
                this.$('#nav-new-team').removeClass('hide').addClass('show');
                this.$('#nav-new-member').removeClass('hide').addClass('show');
            } else {
                this.$('#nav-new-member').removeClass('show').addClass('hide');
                this.$('#nav-new-team').removeClass('show').addClass('hide');
                this.$('#nav-new-org').removeClass('hide').addClass('show');  
            }
        }
    },

    renderAdmin: function(){
        var template = _.template(fun.utils.getTemplate(fun.conf.templates.navAdmin));

        var navAdmin = this.$('#fun-nav-admin');
        navAdmin.html(template);
    },

    detailsReport: function() {
        console.log('navbar detail reports')
    },

    renderDropdown: function(){
        // Render dropdown
        'use strict';
        var vonCount = 0,
            account,
            length,
            orgData,
            itemData,
            itemTemplate;

        console.log('render dropdown');

        account = JSON.parse(localStorage.getItem("profile"))

        // is there something to get shit from a js object with .get() on underscore?
        // if yes, please replace the ['stuff']

        if (account) {
            this.orgs = account["orgs"];
        } else {
            this.orgs = [];
        }

        this.accountList = this.$('#account-list-ul');

        if (this.orgs){
            length = this.orgs.length;
        }
        
        if (length > 0){

            // i, search _.each function
            // fuck! pretty please use _.each
            for (vonCount; vonCount < length; ++vonCount) {

                orgData = {
                    'account': account["account"],
                    'org': this.orgs[vonCount]
                };

                itemData = _.extend(orgData, {counter:vonCount + 1});

                itemTemplate = _.template(
                    fun.utils.getTemplate(fun.conf.templates.accountListItem)
                )(itemData);

                this.accountList.append(itemTemplate);
            }
        }
    },

    renderAccountDropdown: function(account){
        // Render account dropdown
        'use strict';
        // this can or will receive a backbone model
        // so we're going to stringify the shit of it first
        var vonCount = 0,
            account = account,
            accountObj = JSON.stringify(account),
            length,
            orgData,
            itemData,
            itemTemplate;

        console.log('render account for ... ', account.get('account'));

        // Can I get the list from localStorage?, pretty please.

        if (account) {
            this.orgs = account.get("orgs");
        } else {
            this.orgs = [];
        }

        this.accountList = this.$('#account-list-ul');

        if (this.orgs){
            length = this.orgs.length;
        }
        
        if (length > 0){

            // i, search _.each function
            // fuck! pretty please use _.each
            for (vonCount; vonCount < length; ++vonCount) {

                orgData = {
                    'account': account.get("account"),
                    'org': this.orgs[vonCount] // set, put, post, patch
                };

                itemData = _.extend(orgData, {counter:vonCount + 1});

                itemTemplate = _.template(
                    fun.utils.getTemplate(fun.conf.templates.accountListItem)
                )(itemData);

                this.accountList.append(itemTemplate);
            }
        }
    },

    setAccountContext: function(event){
        'use strict';
        $('input[name="current_account"]:checked').each(function() {
            var idVal = $(this).attr("id");
            var label = $("label[for='" + idVal + "']").text();
            if (idVal === 'current_account_admin'){
                // Check browser support
                if (typeof(Storage) != "undefined") {
                    // Store
                    sessionStorage.setItem("is_admin", true);
                }
                fun.omnibus.trigger("change:system_admin");
            }
            // Check browser support
            if (typeof(Storage) != "undefined") {
                // Store selected context
                sessionStorage.setItem("context", label);
            }
        });

        fun.omnibus.trigger("change:context");
    }
});
