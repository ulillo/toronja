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
		}
	});

    // load npm tasks
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // define default task
    grunt.registerTask('default', ['cssmin']);
};