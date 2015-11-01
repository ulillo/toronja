fun.views.settings = Backbone.View.extend({

    /*
    * Bind the event functions to the different HTML elements
    */
    events: {
        "click #user-update-btn": "updateUserAccount",
        "click #user-delete-btn": "deleteUserAccount",
        "click #update-password-btn": "updateUserPassword",
        "click #add-email-btn": "addEmail"
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
        this.oldPassword = this.$('#old_password');
        this.newPassword = this.$('#new_password');
        this.confirmPassword = this.$('#confirm_password');
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
        var confirm, 
            callbacks;
        confirm = new fun.models.User({
            'uuid':this.accountProfile['uuid'],
            'account':this.accountProfile['account']
        });
        callbacks = {
            success: function(){
                console.log("inside success, but we don't see any of this shit.");
            },
            error: function(){
                fun.utils.redirect(fun.conf.hash.home);
            }
        };
        confirm.destroy();
        $('#deleteAccountModal').modal('hide');
        $('#deleteAccountModal').on('hidden.bs.modal', function(e){
            fun.utils.logout(callbacks);
        });
    },

    renderOrganizationList: function(){
        'use strict';
        var vonCount = 0,
            account,
            orgList,
            itemData,
            itemTemplate;

        console.log('render organization list');

        account = JSON.parse(localStorage.getItem("profile"))

        if (account) {
            this.orgs = account["orgs"] || []; 
        } else {
            this.orgs = [];
        }

        orgList = this.$('#settings-orgs-ul');

        if (this.orgs.length > 0){

            _.each(this.orgs, function(o) {

                itemData = {'org': o, 'counter': vonCount + 1};

                itemTemplate = _.template(
                    fun.utils.getTemplate(fun.conf.templates.settingsOrgListItem)
                )(itemData);

                orgList.append(itemTemplate);
            });
        }
    },

    updateUserPassword: function(event){
        'use strict';
        //event.preventDefault();
        var rules, 
            validationRules,
            validForm,
            old_password,
            new_password,
            confirm_password,
            accountInformation;
        // form validation rules
        rules = {
            rules: {
                old_password: {
                    minlength: 8,
                    required: true
                },
                new_password: {
                    required: true,
                    minlength: 8
                },
                confirm_new_password: {
                    minlength: 8,
                    required: true,
                    equalTo: '#new_password'
                }
            }
        }
        validationRules = $.extend(rules, fun.utils.validationRules);
        $('#change-password-form').validate(validationRules);

        // check for a valid form and create the new user account
        validForm = $('#change-password-form').valid();
        if(validForm){
            event.preventDefault();
            this.model = new fun.models.User({
                'uuid': this.accountProfile['uuid'],
                'account': this.accountProfile['account']
            });

            old_password = this.oldPassword.val();
            new_password = this.newPassword.val();
            confirm_password = this.confirmPassword.val();

            accountInformation = {
                'password': new_password
            };

            this.model.save(accountInformation, {patch: true});
        }
    },

    addEmail: function(event){
        'use strict';
        var alerta,
            schema,
            body;
        
        alerta = new fun.models.Alert();

        schema = {
            'subject': 'New wholesale account',
            'text': 'A new wholesale account has been register, please visit: http://fun.codemachine.io/#companies to check it out',
            'email':'jchassoul@codemachine.io'
        };

        body = JSON.stringify(schema);

        alerta.save({
            account: this.accountProfile['account'],
            email: this.accountProfile['email'],
            body: body
        });
    }

});