fun.views.navbar = Backbone.View.extend({

	events: {
        'click #details-report-btn': 'detailsReport',
        'click input[name="current_account"]': 'setContext'
	},

    initialize: function(options) {
        fun.containers.navbar = this.$el;
        // get account and context from local and session storages.
        this.account = localStorage.getItem("username");
        this.context = sessionStorage.getItem("context");

        fun.omnibus.on("change:context", function(){
            console.log('omnibus inside navbar change:context and stuff');
            this.renderDashboard();
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

        template = _.template(fun.utils.getTemplate(fun.conf.templates.navDashboard));

        navDashboard = this.$('#fun-nav-dashboard');
        navDashboard.html(template);

        account = localStorage.getItem("username");
        context = sessionStorage.getItem("context");

        // first we check for system admin
        if (context !== null && context.trim() === 'System Admin') {
            this.$('#nav-new-account').removeClass('hide').addClass('show');
            this.$('#nav-new-cube').removeClass('hide').addClass('show');
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

    renderAccountDropdown: function(account){
        // Render account dropdown
        'use strict';
        // this can or will receive a backbone model
        // so we're going to stringify the shit of it first
        var vonCount = 0,
            account = JSON.stringify(account),
            length,
            orgData,
            itemData,
            itemTemplate;

        console.log('render account for ...');

        console.log(account);

        // Can I get the list from localStorage?, pretty please.

        if (account) {
            this.orgs = account.get("orgs");
        } else {
            this.orgs = [];
        }

        this.accountList = this.$('#account-dropdown ul');

        if (this.orgs){
            length = this.orgs.length;
        }
        
        if (length > 0){

            // i, search _.each function
            for ( counter; counter < length; ++counter ) {

                orgData = {
                    'account': account.get("account"),
                    'org': this.orgs[counter] // set, put, post, patch
                };

                itemData = _.extend(orgData, {counter:counter+1});

                itemTemplate = _.template(
                    fun.utils.getTemplate(fun.conf.templates.accountListItem)
                )(itemData);

                this.accountList.append(itemTemplate);
            }
        }
    },

    setContext: function(event){
        'use strict';

        console.log('setting up activity context');

        var idVal,
            label;

        $('input[name="current_account"]:checked').each(function() {
            idVal = $(this).attr("id");
            label = $("label[for='" + idVal + "']").text();

            if (idVal === 'current_account_admin'){
                //$("#selected-icon").removeClass('show').addClass('hide');

                // Check browser support
                if (typeof(Storage) != "undefined") {
                    // Store
                    sessionStorage.setItem("is_admin", true);
                }

                fun.omnibus.trigger("change:system_admin");
            }

            // Check browser support
            if (typeof(Storage) != "undefined") {
                // Store
                sessionStorage.setItem("context", label);
            }
        });

        fun.omnibus.trigger("change:context");
    }
});
