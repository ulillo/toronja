fun.views.settings = Backbone.View.extend({

    /*
    * Bind the event functions to the different HTML elements
    */
    events: {
        "click #user-update-btn": "updateUserAccount",
        "click #user-delete-btn": "deleteUserAccount"
    },
    /*
    * Class constructor
    */
    initialize: function(options){
        fun.containers.settings = this.$el;
    },

    /*
    * Render view
    */
    render: function(account){
        'use strict';
        // view cache this
        var view = this,
            accountProfile = JSON.parse(localStorage.getItem("profile")),
            email,
            firstName,
            lastName,
            location,
            company,
            url,
            template;

        console.log('render settings view');

        this.accountProfile = accountProfile;

        if (account === null){
            account = 'username';
        }

        template = _.template(fun.utils.getTemplate(fun.conf.templates.settings))({'account':account});
        this.$el.html(template);
        // assign this variable values
        this.email = this.$('#user_email');
        this.firstName = this.$('#user_first_name');
        this.lastName = this.$('#user_last_name');
        this.location = this.$('#user_location');
        this.company = this.$('#user_company');
        this.url = this.$('#user_url');      
        // get stuff from account profile
        this.firstName.val(this.accountProfile['first_name'] || '');
        this.lastName.val(this.accountProfile['last_name'] || '');
        this.location.val(this.accountProfile['location'] || '');
        this.company.val(this.accountProfile['company'] || '');
        this.url.val(this.accountProfile['url'] || '');
        this.email.val(this.accountProfile['email'] || '');

        this.renderOrganizationList();

        // show the HTML template
        this.$el.removeClass("hide").addClass("show");
    },

    /*
    * Set profile information
    */
    setProfileInformation: function(model){
        console.log('setting profile information');
        localStorage.setItem("profile", JSON.stringify(model.toJSON()));
    },

    updateUserAccount: function(event){
        'use strict';
        event.preventDefault();
        var accountInformation,
            email, 
            first_name,
            last_name,
            location,
            company,
            confirm,
            url;

        console.log('update user account settings');

        confirm = new fun.models.User({
            'uuid': this.accountProfile['uuid'],
            'account': this.accountProfile['account']
        });

        email = this.email.val();
        first_name = this.firstName.val();
        last_name = this.lastName.val();
        location = this.location.val();
        company = this.company.val();
        url = this.url.val();

        accountInformation = {
            'first_name': first_name,
            'last_name': last_name,
            'email': email,
            'company': company,
            'location': location,
            'url': url
        };

        confirm.save(accountInformation, {patch: true});

        // display a confirmation message or alert the user that something was wrong.
    },

    deleteUserAccount: function(event){
        'use strict';
        event.preventDefault();
        console.log('delete account');
        var confirm = new fun.models.User({
            'uuid':this.accountProfile['uuid'],
            'account':this.accountProfile['account']
        });
        confirm.destroy();
    },

    renderOrganizationList: function(){
        'use strict';
        var vonCount = 0,
            account,
            length,
            orgData,
            itemData,
            itemTemplate;

        console.log('render organization list');

        account = JSON.parse(localStorage.getItem("profile"))

        // is there something to get shit from a js object with .get() on underscore?
        // if yes, please replace the ['stuff']

        if (account) {
            this.orgs = account["orgs"];
        } else {
            this.orgs = [];
        }

        this.orgList = this.$('#settings-orgs-ul');

        if (this.orgs){
            length = this.orgs.length;
        }

        if (length > 0){

            // i, search _.each function
            // fuck! pretty please use _.each
            for (vonCount; vonCount < length; ++vonCount) {

                orgData = {
                    //'account': account["account"],
                    'org': this.orgs[vonCount]
                };

                itemData = _.extend(orgData, {counter:vonCount + 1});

                itemTemplate = _.template(
                    fun.utils.getTemplate(fun.conf.templates.settingsOrgListItem)
                )(itemData);

                this.orgList.append(itemTemplate);
            }
        }
    }

});