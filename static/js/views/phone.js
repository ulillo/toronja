fun.views.phone = Backbone.View.extend({

	events: {
        "click #btn-call": 'sipInvite',
        "click #btn-hangup": 'sipBye',
        "click #btn-message": 'sipMessage',
        "click #digit-0": 'digitZero',
        "click #digit-1": 'digitOne',
        "click #digit-2": 'digitTwo',
        "click #digit-3": 'digitThree',
        "click #digit-4": 'digitFour',
        "click #digit-5": 'digitFive',
        "click #digit-6": 'digitSix',
        "click #digit-7": 'digitSeven',
        "click #digit-8": 'digitEight',
        "click #digit-9": 'digitNine',
	},

	initialize: function(options){
		fun.containers.phone = this.$el;
	},

	render: function(){
		var template = _.template(
			fun.utils.getTemplate(fun.conf.templates.phone)
		);

        var session;

        var configuration = {
            uri: 'sip:godstybba@sip.iofun.io',
            password: 'zafary',
            wsServers: 'ws://sip.iofun.io:10080',
            displayName: 'godstybba',
            authorizationUser: 'godstybba',
            register: true,
            registerExpires: 900,
            stunServers: ["coturn.iofun.io:3478"],
            turnServers: {
                    server: "turn:coturn.iofun.io:3478",
                    username: "godstybba",
                    password: "zafary"
                },
        };

        var userAgent = new SIP.UA(configuration);

        this.$el.html(template);
        this.$el.removeClass("hide").addClass("show");

        //here you determine whether the call has video and audio
        var options = {
            media: {
                constraints: {
                    audio: true,
                    video: false
                },
                render: {
                    remote: document.getElementById('remoteVideo'),
                    local: document.getElementById('localVideo')
                }
            }
        };
        //makes the call
        //session = userAgent.invite('sip:500@iofun.io', options);

        <!--

        /*

        // Register callbacks to desired call events
        var eventHandlers = {
            'progress': function(e){
                console.log('call is in progress');
            },
            'failed': function(e){
                console.log('call failed with cause: '+ e.data.cause);
            },
            'ended': function(e){
                console.log('call ended with cause: '+ e.data.cause);
            },
            'started': function(e){
                var rtcSession = e.sender;

                console.log('call started');

                // Attach local stream to selfView
                if (rtcSession.getLocalStreams().length > 0) {
                    selfView.src = window.URL.createObjectURL(rtcSession.getLocalStreams()[0]);
                }

                // Attach remote stream to remoteView
                if (rtcSession.getRemoteStreams().length > 0) {
                    remoteView.src = window.URL.createObjectURL(rtcSession.getRemoteStreams()[0]);
                }
            }
        };

        var options = {
            'eventHandlers': eventHandlers,
            'mediaConstraints': {'audio': true, 'video': true}
        };

        */

        -->

        this.renderDialBox();

	},

	renderDialBox: function(){
        console.log('render dialpad box');
        
        var template = _.template(
        	fun.utils.getTemplate(fun.conf.templates.dialpad)
        );

        var dialpad = this.$('#fun-dialpad');
        dialpad.html(template);

        console.log("where's the fucking dialpad?");

        var session;

        
    },

    sipInvite: function(event){
        'use strict';
        event.preventDefault();
        console.log('sip invite');
        this.session = 1;
    },


    sipBye: function(event){
        'use strict';
        var session = this.session;
        event.preventDefault();
        console.log('sip bye');
        console.log(session)
        //session.bye();
        console.log("SIP BYE request sended by client ended the call");
    },

    sipMessage: function(event){
        'use strict';
        event.preventDefault();
        console.log('sip message');
    },

    digitZero: function(event){
        'use strict';
        event.preventDefault();
        console.log('digit zero');
    },

    digitOne: function(event){
        'use strict';
        event.preventDefault();
        console.log('digit one');
    },

    digitTwo: function(event){
        'use strict';
        event.preventDefault();
        console.log('digit two')
    },

    digitFive: function(event){
        'use strict';
        event.preventDefault();
        console.log('digit five')
    },



});