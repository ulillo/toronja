fun.views.campaigns = Backbone.View.extend({

    /*
    * Bind the event functions to the different HTML elements
    */
    events: {
        'click #create-campaign-btn': 'createCampaign',
    },

    /*
    * Class constructor
    */
    initialize: function(options){
        fun.containers.campaigns = this.$el;
    },

    /*
    * Render view
    */
    render: function(){
        'use strict';
        var account,
            template;

        console.log('render campaigns view');
        account = localStorage.getItem("username");

        if (!this.$el.html()){
            template = _.template(fun.utils.getTemplate(fun.conf.templates.campaigns)
            )({'account':account});
            this.$el.html(template);
            // DOM cache stuff on form fields
            this.campaignName = this.$('#campaign_name');
            this.campaignDescription = this.$('#campaign_description');
            
            this.account = account;
        }
        this.$el.removeClass("hide").addClass("show");
    },

    /*
    * Render campaigns list
    */
    renderCampaignsList: function(campaigns){
        'use strict';
        var template,
            allCampaigns;
        console.log('render campaigns list');
        if (campaigns) {
            this.campaigns = campaigns;
        }

        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.allCampaigns)
        );

        allCampaigns = this.$('#all-campaigns-tab');

        allCampaigns.html(template);

        this.tbody = this.$('#campaigns-list > tbody');

        this.$el.removeClass("hide").addClass("show");
        
        this.renderCampaignRows();
    },

    /*
    * Render campaign rows
    */
    renderCampaignRows: function(){
        'use strict';
        var length,
            i = 0,
            rows,
            data,
            template;
        // campaigns length
        length = this.campaigns.length;

        console.log('campaigns length: ',length);

        if (length > 0){
            rows = this.tbody.html('');
            for (i; i < length; ++i) {
                data = _.extend(this.campaigns.at(i).toJSON(), {i:i});

                template = _.template(
                    fun.utils.getTemplate(fun.conf.templates.campaignRow)
                )(data);

                rows.append(template);
            }
        } else {
            this.noCampaigns();
        }
    },

    /*
    * No campaigns
    */
    noCampaigns: function(){
        'use strict';
        var template,
            noCampaigns;
        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.warning)
        )({message:'noDataAvailable'});

        noCampaigns = this.$('#no-campaigns');

        noCampaigns.html(template);
    },

    renderActiveCampaignsList: function(campaigns){
        'use strict';
        var template,
            activeCampaigns;
        console.log('render active campaigns list');
        if (campaigns) {
            this.activeCampaigns = campaigns;
        }

        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.campaignsActiveTab)
        );

        activeCampaigns = this.$('#active-campaigns-tab');

        activeCampaigns.html(template);

        this.tbody = this.$('#active-campaigns-list > tbody');

        this.$el.removeClass("hide").addClass("show");
        this.renderActiveCampaignRows();
    },

    renderActiveCampaignRows: function(){
        'use strict';
        var length,
            i = 0,
            rows,
            data,
            template;
        // campaigns length
        length = this.activeCampaigns.length;

        console.log('active campaigns length: ',length);

        if (length > 0){
            rows = this.tbody.html('');
            for (i; i < length; ++i) {
                data = _.extend(this.activeCampaigns.at(i).toJSON(), {i:i});

                template = _.template(
                    fun.utils.getTemplate(fun.conf.templates.campaignRow)
                )(data);

                rows.append(template);
            }
        } else {
            this.noActiveCampaigns();
        }
    },

    /*
    * No active campaigns
    */
    noActiveCampaigns: function(){
        'use strict';
        var template,
            noActiveCampaigns;
        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.warning)
        )({message:'noDataAvailable'});

        noActiveCampaigns = this.$('#no-active-campaigns');

        noActiveCampaigns.html(template);
    },

    renderPausedCampaignsList: function(campaigns){
        'use strict';
        var template,
            pausedCampaigns;
        console.log('render paused campaigns list');
        if (campaigns) {
            this.pausedCampaigns = campaigns;
        }

        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.campaignsPausedTab)
        );

        pausedCampaigns = this.$('#paused-campaigns-tab');

        pausedCampaigns.html(template);

        this.tbody = this.$('#paused-campaigns-list > tbody');

        this.$el.removeClass("hide").addClass("show");
        this.renderPausedCampaignRows();
    },

    renderPausedCampaignRows: function(){
        'use strict';
        var length,
            i = 0,
            rows,
            data,
            template;
        // campaigns length
        length = this.pausedCampaigns.length;

        console.log('paused campaigns length: ',length);

        if (length > 0){
            rows = this.tbody.html('');
            for (i; i < length; ++i) {
                data = _.extend(this.pausedCampaigns.at(i).toJSON(), {i:i});

                template = _.template(
                    fun.utils.getTemplate(fun.conf.templates.campaignRow)
                )(data);

                rows.append(template);
            }
        } else {
            this.noPausedCampaigns();
        }
    },

    /*
    * No paused campaigns
    */
    noPausedCampaigns: function(){
        'use strict';
        var template,
            noPausedCampaigns;
        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.warning)
        )({message:'noDataAvailable'});

        noPausedCampaigns = this.$('#no-paused-campaigns');

        noPausedCampaigns.html(template);
    },

    /*
    * Create campaign
    */
    createCampaign: function(event){
        'use strict';
        event.preventDefault();
        // view cache
        var view = this,
            account,
            campaign,
            campaignName,
            campaignDescription,
            campaignPayload;

        console.log('create campaign event');

        this.campaignName = this.$('#campaign_name');
        this.campaignDescription = this.$('#campaign_description');

        account = this.account;

        campaignName = this.campaignName.val();

        campaignDescription = this.campaignDescription.val();

        console.log(account, campaignName, campaignDescription);

        campaignPayload = {
            account: account,
            name: campaignName,
            description: campaignDescription
        };

        if (account != undefined & campaignName != undefined){
            campaign = new fun.models.Campaign(campaignPayload);
            campaign.save();
        }

        // Clear the stuff from the inputs ;)
        view.$('#campaign_name').val('');
        view.$('#campaign_description').val('');
    }
});