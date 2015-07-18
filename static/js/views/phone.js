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

        var funPhone = new SIP.UA(configuration);

        this.$el.html(template);
        this.$el.removeClass("hide").addClass("show");


        <!--

        /*

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

        */

        -->

        this.renderDialBox();
        this.renderVideos();
        this.renderMessages();

        funPhone.start();
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