fun.views.companies = Backbone.View.extend({

    /**
    * Bind the event functions to the different HTML elements
    */
    events: {
        "click #create-company-btn": "createCompany",
        "click .company-popup": "companyDetails",
        "click #update-btn": "updateCompany",
        "click #close-btn": "closePopup",
        "click input[name='company_status']": 'updateStatus'
    },

    /**
    * Class constructor
    */
    initialize: function(options){
        fun.containers.companies = this.$el;
    },

    /**
    * Render view
    */
    render: function(){
        console.log('render tasts view');

        var template;

        if (!this.$el.html()){
            template = _.template(fun.utils.getTemplate(fun.conf.templates.companies));
            this.$el.html(template);

            this.account = this.$('#reg_signup_username');
            this.password = this.$('#reg_signup_password');
            this.email = this.$('#reg_signup_email');

            // big ugly form and stuff
            this.companyName = this.$('#reg_company_name');
            this.streetAddress = this.$('#reg_street_address');
            this.cityTown = this.$('#reg_city_town');
            this.stateProvince = this.$('#reg_state_province');
            this.zipPostal = this.$('#reg_zip_postal');
            this.countryCompany = this.$('#reg_country_company');
            this.dba = this.$('#reg_dba');
            this.telephone = this.$('#reg_telephone');
            this.fax = this.$('#reg_fax');
            this.companyEmail = this.$('#reg_company_email');
            this.incorporatedNumber = this.$('#reg_incorporated_number');
            this.legalCompanyName = this.$('#reg_legal_company_name');
            this.dateOfIncorporation = this.$('#reg_date_incorporation');
            this.incorporatedAddress = this.$('#reg_incorporated_address');
            this.incorporatedStateProvince = this.$('#reg_incorporated_state');
            this.incorporatedCountry = this.$('#reg_incorporated_country');
            this.federalTaxId = this.$('#reg_federal_tax_id');
            this.vatTaxIdFileNumber = this.$('#reg_vat_tax_id');
            this.ifCompanySubsidiaryName = this.$('#reg_subsidiary_name');
            this.ifCompanySubsidiaryRegistrationNum = this.$('#reg_subsidiary_reg_num');
        }
        //this.$el.show();
        this.$el.removeClass("hide").addClass("show");
    },

     /*
    * Render companies list
    */
    renderCompaniesList: function(companies){
        'use strict';
        var template,
            allCompanies;

        console.log('render companies list');

        if (companies) {
            this.companies = companies;
        }

        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.allCompanies)
        );

        allCompanies = this.$('#all-companies-tab');

        allCompanies.html(template);

        this.tbody = this.$('#companies-list > tbody');

        this.$el.removeClass("hide").addClass("show");
        
        this.renderCompanyRows();
    },

    /*
    * Render company rows
    */
    renderCompanyRows: function(){
        'use strict';
        var length,
            i = 0,
            rows,
            data,
            template;
        // companies length
        length = this.companies.length;

        console.log('companies length: ',length);

        if (length > 0){
            rows = this.tbody.html('');
            for (i; i < length; ++i) {
                data = _.extend(this.companies.at(i).toJSON(), {i:i});

                template = _.template(
                    fun.utils.getTemplate(fun.conf.templates.companyRow)
                )(data);

                rows.append(template);
            }
        } else {
            this.noCompanies();
        }
    },

    /*
    * No companies
    */
    noCompanies: function(){
        'use strict';
        var template,
            noCompanies;
        template = _.template(
            fun.utils.getTemplate(fun.conf.templates.warning)
        )({message:'noDataAvailable'});

        noCompanies = this.$('#no-companies');

        noCompanies.html(template);
    },

    /*
    * Create company
    */
    createCompany: function(event){
        'use strict';
        event.preventDefault();
        // view cache
        var view = this,
            account,
            company,
            companyName,
            companyDescription,
            companyLabel,
            companyPayload,
            profile,
            first_name,
            last_name,
            user;

        console.log('create company event');

        this.companyName = this.$('#company_name');
        this.companyDescription = this.$('#company_description');
        this.companyLabel = 'Service Requests';

        account = this.account;

        companyName = this.companyName.val();

        companyDescription = this.companyDescription.val();

        companyLabel = this.companyLabel;

        console.log(account, companyName, companyDescription);

        companyPayload = {
            title: companyName,
            description: companyDescription,
            label: companyLabel
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

        companyPayload['first_name'] = first_name;
        companyPayload['last_name'] = last_name;
        companyPayload['email'] = user.get('email');

        //console.log(JSON.stringify(profile));

        if (typeof(account) === undefined){
            account = false;
            companyPayload['public'] = account;
        }

        if (account != undefined & companyName != undefined){
            companyPayload['account'] = account;
            
        }

        company = new fun.models.Company(companyPayload);
        company.save();

        // Clear the stuff from the inputs ;)
        view.$('#company_name').val('');
        view.$('#company_description').val('');
    },
    
    /*
    * Company details
    */
    companyDetails: function(event){
        'use strict';
        event.preventDefault();
        //view cache
        var view = this,
            account,
            password,
            company,
            name,
            companyUuid,
            companyName,
            streetAddress,
            cityTown,
            stateProvince,
            zipPostal,
            countryCompany,
            dba,
            telephone,
            fax,
            companyEmail,
            incorporatedNumber,
            legalCompanyName,
            dateOfIncorporation,
            incorporatedStateProvince,
            incorporatedAddress,
            incorporatedNumber,
            incorporatedCountry,
            federalTaxId,
            vatTaxIdFileNumber,
            ifCompanySubsidiaryName,
            ifCompanySubsidiaryRegistrationNum,
            companySeverity;

        password = this.$('#reg_signup_password');

        console.log('muther fucker say wut?');

        companyUuid = this.$('#company-uuid');
        account = this.$('#reg_signup_username');
        companyName = this.companyName;
        streetAddress = this.streetAddress
        cityTown = this.cityTown;
        stateProvince = this.stateProvince;
        zipPostal = this.zipPostal;
        countryCompany = this.countryCompany;
        dba = this.dba;
        telephone = this.telephone;
        fax = this.fax;
        companyEmail = this.companyEmail;
        incorporatedNumber = this.incorporatedNumber;
        legalCompanyName = this.legalCompanyName;
        dateOfIncorporation = this.dateOfIncorporation;
        incorporatedStateProvince = this.incorporatedStateProvince;
        incorporatedAddress = this.incorporatedAddress;
        incorporatedNumber = this.incorporatedNumber;
        incorporatedCountry = this.incorporatedCountry;
        federalTaxId = this.federalTaxId;
        vatTaxIdFileNumber = this.vatTaxIdFileNumber;
        ifCompanySubsidiaryName = this.ifCompanySubsidiaryName
        ifCompanySubsidiaryRegistrationNum = this.ifCompanySubsidiaryRegistrationNum;

        // get the name of the element targeted by this event
        name = $(event.target).data('name');

        company = new fun.models.Company({'uuid':name});

        company.fetch({
            success: function(response){

                //console.log(response)

                
                password = response.get('password');

                console.log(this.email, this.account, this.password);

                companyUuid.html(response.get('uuid'));

                account.html(response.get('account'));

                companyName.html(response.get('company_name'));

                streetAddress.html(response.get('street_address'));
                cityTown.html(response.get('city_town'));
                stateProvince.html(response.get('state_province'));
                zipPostal.html(response.get('zip_postal'));
                countryCompany.html(response.get('country_company'));
                dba.html(response.get('dba'));
                telephone.html(response.get('telephone'));
                fax.html(response.get('fax'));
                companyEmail.html(response.get('company_email'));
                incorporatedNumber.html(response.get('incorporated_number'));
                legalCompanyName.html(response.get('reg_legal_company_name'));
                //dateOfIncorporation.html(response.get(''));
                incorporatedStateProvince.html(response.get('incorporated_state_province'));
                incorporatedAddress.html(response.get('incorporated_address'));
                incorporatedNumber.html(response.get('incorporated_number'));
                incorporatedCountry.html(response.get('incoportated_country'));
                federalTaxId.html(response.get('federal_tax_id'));
                vatTaxIdFileNumber.html(response.get('vat_tax_id_file_number'));
                ifCompanySubsidiaryName.html(response.get('subsidiary_name'));
                ifCompanySubsidiaryRegistrationNum.html(response.get('subsidiary_reg_num'));

                $('#companyModal').modal({
                    'show': true
                });
            },
            error: function(model, status, error){
                console.log(error, status, model);
                console.log('error getting company uuid:' + name);
            }
        });

        //console.log(company.toJSON());
    },

    updateCompany: function(event){
        'use strict';
        event.preventDefault();
        // view cache
        var view = this;

        console.log('update company');
        $('#companyModal').modal('hide');
    },

    closePopup: function(event){
        'use strict';
        event.preventDefault();
        // view cache
        var view = this;

        console.log('close company details popup');
        $('#companyModal').modal('hide');
    },

    updateStatus: function(event){
        'use strict';
        event.preventDefault();
        var view = this;

        console.log('update status');

        var idVal;

        $('input[name="company_status"]:checked').each(function() {
            idVal = $(this).attr("id");

            var label = $("label[for='"+idVal+"']").text();

            console.log(idVal);

            console.log(label);

            if (label === 'active'){
                this.model = new fun.models.Account();
                this.model.save(
                    {
                        account: this.account,
                        password: this.password,
                        email: this.email
                    },
                    callbacks
                );
            }

        });

        //fun.omnibus.trigger("change:context");
    }

});