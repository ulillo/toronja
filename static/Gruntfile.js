// This shows a full config file!
module.exports = function (grunt) {

	grunt.initConfig({
		cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: -1
			},
			target: {
				files: {
					'./css/all.min.css':
					[
						'./css/font-awesome.css',
						'./css/bootstrap.min.css',
						'./css/bootstrap-theme.css',
						'./css/dropdowns-enhancement.css',
						'./css/bootstrap-datepicker.css',
						'./css/intlTelInput.css',
						'./css/base.css',
						'./css/seed.css',
						'./css/background.css'
					]
				}
			}
		},
		uglify: {
			options: {
				mangle: false
			},
			my_target: {
				files: {
					'js/libs.min.js': [
						'js/libs/jquery-2.1.3.min.js',
						'js/libs/core-min.js',
						'js/libs/enc-base64-min.js',
						'js/libs/underscore-min.js',
						'js/libs/backbone-min.js',
						'js/libs/bootstrap.min.js',
						'js/libs/bootstrap-datepicker.js'
					],
					'js/plugins.min.js': [
						'js/plugins/dropdowns-enhancement.js',
						'js/plugins/validate/jquery.validate.min.js',
						'js/plugins/cookie/jquery.cookie.js',
						'js/plugins/flot/jquery.flot.js',
						'js/plugins/flot/jquery.flot.time.js',
						'js/plugins/flot/jquery.flot.pie.js',
						'js/plugins/flot/jquery.flot.resize.js',
						'js/plugins/timezone/date.js',
						'js/plugins/intlTelInput.min.js',
						'js/plugins/message/fun-message.js',
						'js/plugins/sip/sip-0.7.0.min.js'
					],
					'js/seed.min.js': [
						'js/seed/fun.utils.js',
						'js/seed/fun.configuration.js',
						'js/seed/fun.strings.js',
						'js/seed/fun.models.js',
						'js/seed/fun.router.js'
					],
					'js/views.min.js': [
						'js/views/navbar.js',
						'js/views/subheader.js',
						'js/views/landing.js',
						'js/views/features.js',
						'js/views/enterprise.js',
						'js/views/pricing.js',
						'js/views/terms.js',
						'js/views/privacy.js',
						'js/views/security.js',
						'js/views/status.js',
						'js/views/help.js',
						'js/views/signup.js',
						'js/views/login.js',
						'js/views/dashboard.js',
						'js/views/campaigns.js',
						'js/views/orgs.js',
						'js/views/profile.js',
						'js/views/members.js',
						'js/views/teams.js',
						'js/views/activity.js',
						'js/views/phone.js',
						'js/views/gateways.js',
						'js/views/accounts.js',
						'js/views/messages.js',
						'js/views/resources.js',
						'js/views/contacts.js',
						'js/views/cubes.js',
						'js/views/tasks.js',
						'js/views/companies.js',
						'js/views/sounds.js',
						'js/views/recordings.js',
						'js/views/reports.js',
						'js/views/settings.js',
						'js/views/extra.js',
						'js/views/footer.js'
					]
				}
			}
		}
	});

    // load npm tasks
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // define default task
    grunt.registerTask('default', ['cssmin']);
    grunt.registerTask('minjs', ['uglify']);
};