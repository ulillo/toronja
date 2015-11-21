/*
 Seed models configuration
*/


/*
 * Store a version of Backbone.sync to call from the
 * modified version we create
 */
var backboneSync = Backbone.sync;

Backbone.sync = function(method, model, options){
    options || (options = {});
    options.crossDomain = true;
    options.contentType = 'application/json';

    /*
     * The jQuery 'ajax' method includes a 'headers' option
     * which lets you set any headers you like
     */
    //options.headers = {};
    
    /*
     * Call the stored original Backbone.sync method with
     * extra headers argument added
     */
    backboneSync(method, model, options);
};


fun.models.Account = Backbone.Model.extend({

    idAttribute: 'uuid',
    
    initialize: function(options){
        if (typeof(options) != "undefined"){
            this.account = options.account;    
        }
    },
    
    urlRoot: fun.conf.urls.user,
    
    url: function(){
        var url;
        if (this.account){
            url = this.urlRoot.replace(fun.conf.account, this.account);    
        }
        if (!this.isNew()){
            url += '/' + this.id;
        } else {
            url = fun.conf.urls.users;
        }
        return url;
    }
});


fun.models.Upload = Backbone.Model.extend({

    urlRoot: fun.conf.urls.upload,

    url: function(){
        return this.urlRoot;
    },

    sync: function(method, model, options){
        // Post data as FormData object on create to allow file upload

        console.log(method);
        
        if(method == 'create'){
            var formData = new FormData();

            // Loop over model attributes and append to formData
            _.each(model.attributes, function(value, key){
                formData.append(key, value);
            });

            // Set processData and contentType to false so data is sent as FormData
            _.defaults(options || (options = {}), {
                data: formData,
                processData: false,
                contentType: false
            });
        }
        return Backbone.sync.call(this, method, model, options);
  }
});


fun.models.login = Backbone.Model.extend({

    urlRoot: fun.conf.urls.login,

    url: function(){
        return this.urlRoot;
    }
});


fun.models.logout = Backbone.Model.extend({

    urlRoot: fun.conf.urls.logout,

    url: function(){
        return this.urlRoot;
    }
});


fun.models.Address = Backbone.Model.extend({

    idAttribute: 'uuid',

    urlRoot: fun.conf.urls.address,

    url: function() {
        'use strict';
        var url;
        if (!this.isNew()){
            url = this.urlRoot.replace(fun.conf.uuidAddress, this.id);
        } else {
            url = fun.conf.urls.addresses;
        }
        return url;
    }
});

fun.models.Addresses = Backbone.Collection.extend({

    model: fun.models.Address,

    urlRoot: fun.conf.urls.addresses,

    url: function() {
        return this.urlRoot;
    },

    parse: function(response){
        return response.results;
    }
});

fun.models.AddressPrimary = Backbone.Collection.extend({

    model: fun.models.Address,

    urlRoot: fun.conf.urls.addressesPrimary,

    url: function() {
        return this.urlRoot;
    },

    parse: function(response){
        return response.results;
    }
});

fun.models.Daemon = Backbone.Model.extend({

    idAttribute: 'uuid',

    urlRoot: fun.conf.urls.daemon,

    url: function() {
        'use strict';
        var url;
        if (!this.isNew()){
            url = this.urlRoot.replace(fun.conf.uuidDaemon, this.id);
        } else {
            url = fun.conf.urls.daemons;
        }
        return url;
    }
});

fun.models.Daemons = Backbone.Collection.extend({

    model: fun.models.Daemon,

    urlRoot: fun.conf.urls.daemons,

    url: function() {
        return this.urlRoot;
    },

    parse: function(response){
        return response.results;
    }
});

fun.models.Resource = Backbone.Model.extend({

    idAttribute: 'uuid',

    urlRoot: fun.conf.urls.resource,

    url:function(){
        'use strict';
        var url;
        if (!this.isNew()){
            url = this.urlRoot.replace(fun.conf.uuidResource, this.id);
        } else {
            url = fun.conf.urls.resources;
        }
        return url;
    }
})

fun.models.Resources = Backbone.Collection.extend({
    model: fun.models.Resource,

    urlRoot: fun.conf.urls.resources,

    url: function(){
        return this.urlRoot;
    }
})


fun.models.ResourcesActive = Backbone.Collection.extend({
    model: fun.models.Resource,

    urlRoot: fun.conf.urls.resourcesActive,

    url: function(){
        return this.urlRoot;
    }
})

fun.models.ResourcesImps = Backbone.Collection.extend({
    model: fun.models.Resource,

    urlRoot: fun.conf.urls.resourcesImps,

    url: function(){
        return this.urlRoot;
    }
})

fun.models.ResourcesNodes = Backbone.Collection.extend({
    model: fun.models.Resource,

    urlRoot: fun.conf.urls.resourcesNodes,

    url: function(){
        return this.urlRoot;
    }
})

fun.models.Gateway = Backbone.Model.extend({

    idAttribute: 'uuid',

    urlRoot: fun.conf.urls.gateway,

    url:function(){
        'use strict';
        var url;
        if (!this.isNew()){
            url = this.urlRoot.replace(fun.conf.uuidGateway, this.id);
        } else {
            url = fun.conf.urls.gateways;
        }
        return url;
    }
})

fun.models.Gateways = Backbone.Collection.extend({
    model: fun.models.Gateway,

    urlRoot: fun.conf.urls.gateways,

    url: function(){
        return this.urlRoot;
    }
})


fun.models.GatewaysActive = Backbone.Collection.extend({
    model: fun.models.Gateway,

    urlRoot: fun.conf.urls.gatewaysActive,

    url: function(){
        return this.urlRoot;
    }
})


fun.models.GatewaysInbound = Backbone.Collection.extend({
    model: fun.models.Gateway,

    urlRoot: fun.conf.urls.gatewaysInbound,

    url: function(){
        return this.urlRoot;
    }
})


fun.models.GatewaysOutbound = Backbone.Collection.extend({
    model: fun.models.Gateway,

    urlRoot: fun.conf.urls.gatewaysOutbound,

    url: function(){
        return this.urlRoot;
    }
})


fun.models.GatewaysMonitored = Backbone.Collection.extend({
    model: fun.models.Gateway,

    urlRoot: fun.conf.urls.gatewaysMonitored,

    url: function(){
        return this.urlRoot;
    }
})


fun.models.User = Backbone.Model.extend({

    idAttribute: 'uuid',
    
    initialize: function(options) {
        this.account = options.account;
    },
    
    urlRoot: fun.conf.urls.user,
    
    url: function(){
        var url;
        if (!this.isNew()){
            url = this.urlRoot.replace(fun.conf.account, this.account);
        } else {
            url = fun.conf.urls.users;
        }
        return url;
    }
});


fun.models.Users = Backbone.Collection.extend({

    model: fun.models.User,
    
    urlRoot: fun.conf.urls.users,
    
    url: function(){
        return this.urlRoot;
    }
});


fun.models.UsersActive = Backbone.Collection.extend({

    model: fun.models.User,
    
    urlRoot: fun.conf.urls.usersActive,
    
    url: function(){
        return this.urlRoot;
    }
});


fun.models.UsersDisable = Backbone.Collection.extend({

    model: fun.models.User,
    
    urlRoot: fun.conf.urls.usersDisable,
    
    url: function(){
        return this.urlRoot;
    }
});


fun.models.UsersSuspended = Backbone.Collection.extend({

    model: fun.models.User,
    
    urlRoot: fun.conf.urls.usersSuspended,
    
    url: function(){
        return this.urlRoot;
    }
});


fun.models.Org = Backbone.Model.extend({

    idAttribute: 'uuid',
    
    initialize: function(options) {
        this.account = options.account;
    },
    
    urlRoot: fun.conf.urls.org,

    url: function(){
        var url = this.urlRoot.replace(fun.conf.account, this.account);
        if (!this.isNew()){
            url += '/' + this.id;
        }
        return url;
    }
}); 


fun.models.Orgs = Backbone.Collection.extend({

    model: fun.models.Org,
    
    urlRoot: fun.conf.urls.orgs,
    
    url: function(){
        return this.urlRoot;
    }
});


fun.models.Record = Backbone.Model.extend({

    idAttribute: 'uuid',

    initialize: function(options) {
        this.recordId = options.recordId;
    },
    
    urlRoot: fun.conf.urls.record,
    
    url: function() {
        var url = this.urlRoot.replace(fun.conf.recordId, this.recordId);
        if (!this.isNew()){
            url += '/' + this.id;
        }
        return url;
    }
});


fun.models.Records = Backbone.Collection.extend({
    
    model: fun.models.Record,
    
    urlRoot: fun.conf.urls.records,
    
    url: function() {
        return this.urlRoot;
    },

    parse: function(response){
        return response.results;
    }
});


fun.models.RecordsStart = Backbone.Collection.extend({
    
    model: fun.models.Record,

    initialize: function(options){
        this.start = options.start;
    },

    urlRoot: fun.conf.urls.recordsStart,

    url: function(){
        var url = this.urlRoot.replace(fun.conf.startTime, this.start);
        //url = url.replace(fun.conf.startTime, this.start);
        return url;
    },

    parse: function(response){
        return response.results;
    }
});


fun.models.RecordsStartEnd = Backbone.Collection.extend({
    
    model: fun.models.Record,

    initialize: function(options){
        this.start = options.start;
        this.end = options.end;
    },

    urlRoot: fun.conf.urls.recordsStartEnd,

    url: function(){
        var url = this.urlRoot.replace(fun.conf.startTime, this.start);

        url = url.replace(fun.conf.endTime, this.end);
        
        return url;
    },

    parse: function(response){
        return response.results;
    }
});


fun.models.LapseSummary = Backbone.Model.extend({

    idAttribute: 'uuid',
    
    initialize: function(options) {
        this.lapse = options.lapse;
    },
    
    urlRoot: fun.conf.urls.lapseSummary,
    
    url: function(){
        var url = this.urlRoot.replace(fun.conf.lapse, this.lapse);
        return url;
    }
});


fun.models.LapseSummaries = Backbone.Collection.extend({
    
    model: fun.models.LapseSummary,

    initialize: function(options) {
        this.lapse = options.lapse;
    },

    urlRoot: fun.conf.urls.lapseSummaries,

    url: function(){
        var url = this.urlRoot.replace(fun.conf.lapse, this.lapse);
        return url;
    },

    parse: function(response){
        return response.results;
    }
});


fun.models.LapseSummaryStart = Backbone.Model.extend({

    idAttribute: 'uuid',

    initialize: function(options){
        this.lapse = options.lapse;
        this.start = options.start;
    },

    urlRoot: fun.conf.urls.lapseSummaryStart,

    url: function(){
        var url = this.urlRoot.replace(fun.conf.lapse, this.lapse);
        url = url.replace(fun.conf.startTime, this.start);
        return url;
    }
});


fun.models.LapseSummaryStartEnd = Backbone.Model.extend({

    idAttribute: 'uuid',
    
    initialize: function(options){
        this.lapse = options.lapse;
        this.start = options.start;
        this.end = options.end;
    },

    urlRoot: fun.conf.urls.lapseSummaryStartEnd,

    url: function(){
        var url = this.urlRoot.replace(fun.conf.lapse, this.lapse);
        url = url.replace(fun.conf.startTime, this.start);
        url = url.replace(fun.conf.endTime, this.end);
        return url;
    }
});


fun.models.Summary = Backbone.Model.extend({

    idAttribute: 'uuid',
    
    urlRoot: fun.conf.urls.summary,
    
    url: function(){
        return this.urlRoot;
    }
});


fun.models.Summaries = Backbone.Collection.extend({
   
    model: fun.models.Summary,

    urlRoot: fun.conf.urls.summaries,

    url: function(){
        return this.urlRoot;
    },

    parse: function(response){
        return response.results;
    }
});


fun.models.SummaryStart = Backbone.Model.extend({

    idAttribute: 'uuid',

    initialize: function(options){
        this.start = options.start;
    },

    urlRoot: fun.conf.urls.summaryStart,

    url: function(){
        var url = this.urlRoot.replace(fun.conf.startTime, this.start);
        return url;
    }
});


fun.models.SummariesStart = Backbone.Collection.extend({
   
    model: fun.models.SummaryStart,

    initialize: function(options){
        this.start = options.start;
    },

    urlRoot: fun.conf.urls.summariesStart,

    url: function(){
        var url = this.urlRoot.replace(fun.conf.startTime, this.start);
        return url;
    },

    parse: function(response){
        return response.results;
    }
});


fun.models.SummaryStartEnd = Backbone.Model.extend({

    idAttribute: 'uuid',

    initialize: function(options){
        this.start = options.start;
        this.end = options.end;
    },

    urlRoot: fun.conf.urls.summaryStartEnd,

    url: function(){
        var url = this.urlRoot.replace(fun.conf.startTime, this.start);
        url = url.replace(fun.conf.endTime, this.end);
        return url;
    }
});


fun.models.SummariesStartEnd = Backbone.Collection.extend({
   
    model: fun.models.SummaryStartEnd,

    initialize:function(options){
        this.start = options.start;
        this.end = options.end;
    },

    urlRoot: fun.conf.urls.summariesStartEnd,

    url: function(){
        var url = this.urlRoot.replace(fun.conf.startTime, this.start);
        url = url.replace(fun.conf.endTime, this.end);
        return url;
    },

    parse: function(response){
        return response.results;
    }
});


fun.models.Billing = Backbone.Model.extend({

    idAttribute: 'uuid',
    
    urlRoot: fun.conf.urls.billings,
    
    url: function(){
        return this.urlRoot;
    }
});


fun.models.Billings = Backbone.Collection.extend({

    model: fun.models.Billing,

    urlRoot: fun.conf.urls.billings,

    url: function(){
        return this.urlRoot;
    }
});


fun.models.BillingStart = Backbone.Model.extend({

    idAttribute: 'uuid',

    initialize: function(options){
        this.start = options.start;
    },

    urlRoot: fun.conf.urls.billingStart,

    url: function(){
        var url = this.urlRoot.replace(fun.conf.startTime, this.start);
        return url;
    }
});


fun.models.BillingStartEnd = Backbone.Model.extend({

    idAttribute: 'uuid',

    initialize: function(options){
        this.start = options.start;
        this.end = options.end;
    },

    urlRoot: fun.conf.urls.billingStartEnd,

    url: function(){
        var url = this.urlRoot.replace(fun.conf.startTime, this.start);
        url = url.replace(fun.conf.endTime, this.end);
        return url;
    }
});


fun.models.Contact = Backbone.Model.extend({

    idAttribute: 'uuid',

    initialize: function(options) {
        this.contactId = options.contactId;
    },

    urlRoot: fun.conf.urls.contact,

    url: function() {
        var url = this.urlRoot.replace(fun.conf.contactId, this.contactId);
        if (!this.isNew()){
            url += '/' + this.id;
        } else {
            url = fun.conf.urls.contacts;
        }
        return url;
    }
});


fun.models.Contacts = Backbone.Collection.extend({

    model: fun.models.Contact,

    urlRoot: fun.conf.urls.contacts,

    url: function() {
        return this.urlRoot;
    },

    parse: function(response){
        return response.contacts;
    }
});


fun.models.Directory = Backbone.Model.extend({

    idAttribute: 'uuid',

    initialize: function(options) {
        this.directoryId = options.directoryId;
    },

    urlRoot: fun.conf.urls.directory,

    url: function() {
        var url = this.urlRoot.replace(fun.conf.directoryId, this.directoryId);
        if (!this.isNew()){
            url += '/' + this.id;
        }
        return url;
    }
});


fun.models.Directories = Backbone.Collection.extend({

    model: fun.models.Directory,

    urlRoot: fun.conf.urls.directories,

    url: function() {
        return this.urlRoot;
    },

    parse: function(response){
        return response.directories;
    }
});


fun.models.Campaign = Backbone.Model.extend({

    idAttribute: 'uuid',

    initialize: function(options) {
        this.campaignId = options.campaignId;
    },

    urlRoot: fun.conf.urls.campaign,

    url: function() {
        var url = this.urlRoot.replace(fun.conf.campaignId, this.campaignId);
        if (!this.isNew()){
            url += '/' + this.id;
        } else {
            url = fun.conf.urls.campaigns;
        }
        return url;
    }
});


fun.models.Campaigns = Backbone.Collection.extend({

    model: fun.models.Campaign,

    urlRoot: fun.conf.urls.campaigns,

    url: function() {
        return this.urlRoot;
    },

    parse: function(response){
        return response.campaigns;
    }
});

fun.models.CampaignsActive = Backbone.Collection.extend({

    model: fun.models.Campaign,

    urlRoot: fun.conf.urls.campaignsActive,

    url: function() {
        return this.urlRoot;
    },

    parse: function(response){
        return response.campaigns;
    }
});

fun.models.CampaignsPaused = Backbone.Collection.extend({

    model: fun.models.Campaign,

    urlRoot: fun.conf.urls.campaignsPaused,

    url: function() {
        return this.urlRoot;
    },

    parse: function(response){
        return response.campaigns;
    }
});

fun.models.CampaignsInbound = Backbone.Collection.extend({

    model: fun.models.Campaign,

    urlRoot: fun.conf.urls.campaignsInbound,

    url: function() {
        return this.urlRoot;
    },

    parse: function(response){
        return response.campaigns;
    }
});

fun.models.CampaignsOutbound = Backbone.Collection.extend({

    model: fun.models.Campaign,

    urlRoot: fun.conf.urls.campaignsOutbound,

    url: function() {
        return this.urlRoot;
    },

    parse: function(response){
        return response.campaigns;
    }
});


fun.models.Alert = Backbone.Model.extend({

    idAttribute: 'uuid',

    urlRoot: fun.conf.urls.alert,

    url: function() {
        'use strict';
        var url;
        if (!this.isNew()){
            url = this.urlRoot.replace(fun.conf.uuidAlert, this.id);
        } else {
            url = fun.conf.urls.alerts;
        }
        return url;
    }
});

fun.models.Alerts = Backbone.Collection.extend({

    model: fun.models.Alert,

    urlRoot: fun.conf.urls.alerts,

    url: function() {
        return this.urlRoot;
    },

    parse: function(response){
        return response.alerts;
    }
});


fun.models.Recording = Backbone.Model.extend({

    idAttribute: 'uuid',

    urlRoot: fun.conf.urls.recording,

    url: function() {
        'use strict';
        var url;
        if (!this.isNew()){
            url = this.urlRoot.replace(fun.conf.uuidRecording, this.id);
        } else {
            url = fun.conf.urls.alerts;
        }
        return url;
    }
});

fun.models.Recordings = Backbone.Collection.extend({

    model: fun.models.Recording,

    urlRoot: fun.conf.urls.recordings,

    url: function() {
        return this.urlRoot;
    },

    parse: function(response){
        return response.recordings;
    }
});

fun.models.RecordingsInbound = Backbone.Collection.extend({

    model: fun.models.Recording,

    urlRoot: fun.conf.urls.recordingsInbound,

    url: function() {
        return this.urlRoot;
    },

    parse: function(response){
        return response.recordings;
    }
});

fun.models.RecordingsOutbound = Backbone.Collection.extend({

    model: fun.models.Recording,

    urlRoot: fun.conf.urls.recordingsOutbound,

    url: function() {
        return this.urlRoot;
    },

    parse: function(response){
        return response.recordings;
    }
});

fun.models.Message = Backbone.Model.extend({

    idAttribute: 'uuid',

    urlRoot: fun.conf.urls.message,

    url: function() {
        'use strict';
        var url;
        if (!this.isNew()){
            url = this.urlRoot.replace(fun.conf.uuidMessage, this.id);
        } else {
            url = fun.conf.urls.messages;
        }
        return url;
    }
});


fun.models.Messages = Backbone.Collection.extend({

    model: fun.models.Message,

    urlRoot: fun.conf.urls.messages,

    url: function() {
        return this.urlRoot;
    },

    parse: function(response){
        return response.messages;
    }
});

fun.models.MessagesUnread = Backbone.Collection.extend({

    model: fun.models.Message,

    urlRoot: fun.conf.urls.messagesUnread,

    url: function() {
        return this.urlRoot;
    },

    parse: function(response){
        return response.messages;
    }
});

fun.models.MessagesAlerts = Backbone.Collection.extend({

    model: fun.models.Message,

    urlRoot: fun.conf.urls.messagesAlerts,

    url: function() {
        return this.urlRoot;
    },

    parse: function(response){
        return response.messages;
    }
});

fun.models.MessagesNotifications = Backbone.Collection.extend({

    model: fun.models.Message,

    urlRoot: fun.conf.urls.messagesNotifications,

    url: function() {
        return this.urlRoot;
    },

    parse: function(response){
        return response.messages;
    }
});

fun.models.Task = Backbone.Model.extend({

    idAttribute: 'uuid',

    urlRoot: fun.conf.urls.task,

    url: function() {
        'use strict';
        var url;
        if (!this.isNew()){
            url = this.urlRoot.replace(fun.conf.uuidTask, this.id);
        } else {
            url = fun.conf.urls.tasks;
        }
        return url;
    }
});


fun.models.Tasks = Backbone.Collection.extend({

    model: fun.models.Task,

    urlRoot: fun.conf.urls.tasks,

    url: function() {
        return this.urlRoot;
    },

    parse: function(response){
        return response.results;
    }
});


fun.models.TasksNow = Backbone.Collection.extend({

    model: fun.models.Task,

    urlRoot: fun.conf.urls.tasksNow,

    url: function() {
        return this.urlRoot;
    },

    parse: function(response){
        return response.results;
    }
});


fun.models.TasksLater = Backbone.Collection.extend({

    model: fun.models.Task,

    urlRoot: fun.conf.urls.tasksLater,

    url: function() {
        return this.urlRoot;
    },

    parse: function(response){
        return response.results;
    }
});


fun.models.TasksDone = Backbone.Collection.extend({

    model: fun.models.Task,

    urlRoot: fun.conf.urls.tasksDone,

    url: function() {
        return this.urlRoot;
    },

    parse: function(response){
        return response.results;
    }
});


fun.models.Company = Backbone.Model.extend({

    idAttribute: 'uuid',

    urlRoot: fun.conf.urls.company,

    url: function() {
        'use strict';
        var url;
        if (!this.isNew()){
            url = this.urlRoot.replace(fun.conf.uuidCompany, this.id);
        } else {
            url = fun.conf.urls.companies;
        }
        return url;
    }
});


fun.models.Companies = Backbone.Collection.extend({

    model: fun.models.Company,

    urlRoot: fun.conf.urls.companies,

    url: function() {
        return this.urlRoot;
    },

    parse: function(response){
        return response.results;
    }
});

fun.models.CompaniesActive = Backbone.Collection.extend({

    model: fun.models.Company,

    urlRoot: fun.conf.urls.companiesActive,

    url: function() {
        return this.urlRoot;
    },

    parse: function(response){
        return response.results;
    }
});

fun.models.CompaniesDisable = Backbone.Collection.extend({

    model: fun.models.Company,

    urlRoot: fun.conf.urls.companiesDisable,

    url: function() {
        return this.urlRoot;
    },

    parse: function(response){
        return response.results;
    }
});

fun.models.CompaniesSuspended = Backbone.Collection.extend({

    model: fun.models.Company,

    urlRoot: fun.conf.urls.companiesSuspended,

    url: function() {
        return this.urlRoot;
    },

    parse: function(response){
        return response.results;
    }
});