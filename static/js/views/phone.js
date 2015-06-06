fun.views.phone = Backbone.View.extend({

	events: {

	},

	initialize: function(options){
		fun.containers.phone = this.$el;
	},

	render: function(){
		var template = _.template(
			fun.utils.getTemplate(fun.conf.templates.phone)
		);

        var configuration = {
            uri: 'sip:fun212@sip.ph3nix.com',
            password: 'fun212',
            ws_servers: 'ws://sip.ph3nix.com:10080',
            display_name: 'IO FUN NY',
            authorization_user: 'fun212',
            register: true,
            register_expires: null,
            no_answer_timeout: null,
            trace_sip: true,
            stun_servers: ["stun.ph3nix.com:3478"],
            turn_servers: {
                    server: "turn:turn.ph3nix.com:3478",
                    username: "fun212",
                    password: "fun212"
                },
            use_preloaded_route: null,
            connection_recovery_min_interval: null,
            connection_recovery_max_interval: null,
            hack_via_tcp: null,
            hack_ip_in_contact: null
        };

        var funPhone = new JsSIP.UA(configuration);

        this.$el.html(template);
        this.$el.removeClass("hide").addClass("show");

        var selfView = this.$('#my-video');
        var remoteView = this.$('#peer-video');

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

        funPhone.start();

        this.renderDialBox();
        this.renderVideos();
        this.renderMessages();
	},

	renderDialBox: function(){
        console.log('render dial box');
        
        var template = _.template(
        	fun.utils.getTemplate(fun.conf.templates.dialBox)
        );

        var dialBox = this.$('#fun-dial-box');
        dialBox.html(template);
    },

    renderVideos: function(){
        console.log('render videos');

        var template = _.template(
            fun.utils.getTemplate(fun.conf.templates.videos)
        );

        var videos = this.$('#fun-videos');
        videos.html(template);
    },

    renderMessages: function(){
        console.log('render messages');

        var template = _.template(
            fun.utils.getTemplate(fun.conf.templates.messages)
        );

        var messages = this.$('#fun-messages');
        messages.html(template);
    }

});