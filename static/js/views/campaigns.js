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

    /*
    * Render Active Campaigns list
    */
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

    /*
    * Render Active campaign rows
    */
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
    * No Active campaigns
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

    /*
    * Render Paused Campaigns list
    */
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

    /*
    * Render Paused campaign rows
    */
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
    * No Paused campaigns
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
    * Render Inbound Campaigns list
    */
    renderInboundCampaignsList: function(campaigns){
        'use strict';
        var template,
            inboundCampaigns;
        console.log('render inbound campaigns list');
        if (campaigns) {
            this.inboundCampaigns = campaigns;
        }

        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.campaignsInboundTab)
        );

        inboundCampaigns = this.$('#inbound-campaigns-tab');

        inboundCampaigns.html(template);

        this.tbody = this.$('#inbound-campaigns-list > tbody');

        this.$el.removeClass("hide").addClass("show");
        this.renderInboundCampaignRows();
    },

    /*
    * Render Inbound campaign rows
    */
    renderInboundCampaignRows: function(){
        'use strict';
        var length,
            i = 0,
            rows,
            data,
            template;
        // campaigns length
        length = this.inboundCampaigns.length;

        console.log('inbound campaigns length: ',length);

        if (length > 0){
            rows = this.tbody.html('');
            for (i; i < length; ++i) {
                data = _.extend(this.inboundCampaigns.at(i).toJSON(), {i:i});

                template = _.template(
                    fun.utils.getTemplate(fun.conf.templates.campaignRow)
                )(data);

                rows.append(template);
            }
        } else {
            this.noInboundCampaigns();
        }
    },

    /*
    * No Inbound campaigns
    */
    noInboundCampaigns: function(){
        'use strict';
        var template,
            noInboundCampaigns;
        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.warning)
        )({message:'noDataAvailable'});

        noInboundCampaigns = this.$('#no-inbound-campaigns');

        noInboundCampaigns.html(template);
    },

    /*
    * Render Outbound Campaigns list
    */
    renderOutboundCampaignsList: function(campaigns){
        'use strict';
        var template,
            outboundCampaigns;
        console.log('render outbound campaigns list');
        if (campaigns) {
            this.outboundCampaigns = campaigns;
        }

        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.campaignsOutboundTab)
        );

        outboundCampaigns = this.$('#outbound-campaigns-tab');

        outboundCampaigns.html(template);

        this.tbody = this.$('#outbound-campaigns-list > tbody');

        this.$el.removeClass("hide").addClass("show");
        this.renderOutboundCampaignRows();
    },

    /*
    * Render Outbound campaign rows
    */
    renderOutboundCampaignRows: function(){
        'use strict';
        var length,
            i = 0,
            rows,
            data,
            template;
        // campaigns length
        length = this.outboundCampaigns.length;

        console.log('outbound campaigns length: ',length);

        if (length > 0){
            rows = this.tbody.html('');
            for (i; i < length; ++i) {
                data = _.extend(this.outboundCampaigns.at(i).toJSON(), {i:i});

                template = _.template(
                    fun.utils.getTemplate(fun.conf.templates.campaignRow)
                )(data);

                rows.append(template);
            }
        } else {
            this.noOutboundCampaigns();
        }
    },

    /*
    * No Outbound campaigns
    */
    noOutboundCampaigns: function(){
        'use strict';
        var template,
            noOutboundCampaigns;
        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.warning)
        )({message:'noDataAvailable'});

        noOutboundCampaigns = this.$('#no-outbound-campaigns');

        noOutboundCampaigns.html(template);
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