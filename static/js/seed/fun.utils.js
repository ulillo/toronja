/*
* Fun namespace container
*/
var fun = {
    account: {}, 
    utils: {},
    views: {},
    instances: {},
    containers: {},
    models: {},
    strings: {},
    conf: {},
    session: {}, //account and context maybe?
    cache: {templates : {}},
    omnibus: _.extend({}, Backbone.Events)
};


fun.utils.updater = {
    socket: null,

    start: function() {
        var url = "ws://" + location.host + "/ws/alerts";
        fun.utils.updater.socket = new WebSocket(url);
        fun.utils.updater.socket.onmessage = function(event) {
            //fun.utils.updater.showMessage(JSON.parse(event.data));
            fun.utils.updater.processMessage(JSON.parse(event.data));
        }
    },

    showMessage: function(message) {
        console.log(message);
    },

    processMessage: function(message){
        // heartbeat
        if (message['message'] !== 'heartbeat'){
            fun.omnibus.trigger("obelix:message");
            //console.log(message);
            var stuff = JSON.parse(message['message']);
            console.log(stuff)
        }
        
    }
};


/*
* Fetches the session from it's container (cookie)
* @return Object: Session data
*/
fun.utils.getSession = function() {
    var session = null;
    
    if ($.cookie){
        session = $.cookie('username');
    }
    return session;
};


/**
 * Tells whether the session has been created or not.
 * @return boolean
 */
fun.utils.loggedIn = function() {
    var session = this.getSession();
    fun.session = session;
    return (session != null);
};


/**
 * Logs the user into the system
 * @param string account: account
 * @param string password: password
 * @param object callbacks: object with success and error callback
 * @return boolean
 */
fun.utils.login = function(account, password, callbacks) {
    $.ajax({
        type: "GET",
        url: fun.conf.urls.login,
        dataType: 'json',
        beforeSend: function(xhr){
            auth = account + ':' + password;
            var words  = CryptoJS.enc.Latin1.parse(auth);
            var base64 = CryptoJS.enc.Base64.stringify(words);
            xhr.setRequestHeader("Authorization", "Basic " + base64);
        },
        success: function (data, textStatus, jqXHR){

            //$.cookie( 'account', account );

            // so... this stuff never works...

            if (_.isFunction(callbacks.success)){
                callbacks.success(data);
            }
        },
        error: function (xhr, textStatus, thrownError){
            if (_.isFunction(callbacks.error)){
                callbacks.error(xhr, textStatus, thrownError);
            }
        }
    });
};


/*
* Subscribe
*/
fun.utils.subscribe = function(callbacks){
    'use strict';
    console.log('fun.utils.subscribe');
    var email = $("#subscribe-email").val(),
        task,
        taskPayload;

    taskPayload = {
        first_name: 'Random',
        last_name: 'Funster',
        title: 'news subscribe',
        description: 'curious and stuff',
        label: 'Home Subscribe',
        email: email,
    };

    task = new fun.models.Task(taskPayload);
    task.save();

    $("#subscribe-email").val('');
};


/**
 * Logout the account
 * @return void
 */
fun.utils.logout = function(callbacks){
    $.ajax({
        url : fun.conf.urls.logout,
        type : 'GET',
        dataType : 'json',
        success : function(data, textStatus, jqXHR) {
            // this is bananas... why? cuz it don't work anymore... 
            // Clear the html from the containers
            for (var i in fun.containers) {
                if(i !== 'login' && i !== 'footer' && i !== 'navbar' && i !== 'subheader'){
                    fun.containers[i].empty();
                }
            }
            if (_.isObject(callbacks) && _.isFunction(callbacks.success)) {
                callbacks.success();
            }
        },
        error : function(jqXHR, textStatus, errorThrown) {
            // Clear the html from the containers
            for (var i in fun.containers) {
                if(i !== 'login' && i !== 'footer' && i !== 'navbar' && i !== 'subheader'){
                    fun.containers[i].empty();
                }
            }
            if (_.isObject(callbacks) && _.isFunction(callbacks.error)) {
                callbacks.error();
            }
        }
    });

    // Clean storage outside ajax call, this way we always clean the stuff.
    if (typeof(Storage) != "undefined") {
        localStorage.removeItem('username');
        localStorage.removeItem('profile');
        sessionStorage.removeItem('context');
    }
};


/**
* Checks on the strings object for the specified key.
* If the value doesn't exist the key is returned
* @param string key for the translation requested
* @return The translated value for the specified key
*/
fun.utils.translate = function translate(key) {
    var value = key;
    if (typeof fun.strings[key] != 'undefined') {
        value = fun.strings[key];
    }

    // replace the rest of the arguments into the string
    for( var i = 1; i < arguments.length; i++) {
        value = value.replace('%' + i + '$s', args[i]);
    }

    return value;
};


/**
 * Fetches an html template
 * @return Object
 */
fun.utils.getTemplate = function(url){
    if ( !fun.cache.templates[url] ) {
        var response = $.ajax(url, {
            async : false,
            dataTypeString : 'html'
        });
        fun.cache.templates[url] = response.responseText;
    }
    return fun.cache.templates[url];
};


/**
 * Redirects to a different url #hash
 * @param string url: new location
 * @return Object
 */
fun.utils.redirect = function(url) {
    window.location = url;
};


/**
 * Hide all the UI stuff
 */
fun.utils.hideAll = function() {
    for (var i in fun.containers){
        // hide all containers including footer
        //fun.containers[i].hide();
        fun.containers[i].removeClass("show").addClass("hide");
        //if ( i != 'footer'){
        //    fun.containers[i].hide();
        //}
    }
};


/**
* check if this stuff works on empty strings
*/
fun.utils.emptyString = function(str) {
    return (!str || 0 === str.length);
};


/**
 * Rounds up a number.
 * @return Object
 */
fun.utils.round = function(number, decimals){
  if (typeof decimals === 'undefined')
  {
      var decimals = 2;
  }
  var newNumber = Math.round(number*Math.pow(10,decimals))/Math.pow(10,decimals);
  return parseFloat(newNumber);
};


/**
 * validation rules
 * return custom validation rules
 */
fun.utils.validationRules = function(){
    var custom = {
        focusCleanup: false,
        wrapper: 'div',
        errorElement: 'span',
        
        highlight: function(element) {
            $(element).parents ('.control-group').removeClass ('success').addClass('error');
        },
        success: function(element) {
            $(element).parents ('.control-group').removeClass ('error').addClass('success');
            $(element).parents ('.controls:not(:has(.clean))').find ('div:last').before ('<div class="clean"></div>');
        },
        errorPlacement: function(error, element) {
            error.appendTo(element.parents ('.controls'));
        }
    };
    
    return custom;
};

/**
 * string 'join' format
 */
fun.utils.format = function(){
    'use strict';
    var args,
        initial;
    args = [].slice.call(arguments);
    initial = args.shift();

    // check if we can use {%d} instead of '%s'
    function replacer (text, replacement) {
        return text.replace('%s', replacement);
    }
    return args.reduce(replacer, initial);
};

/**
 * jQuery validator custom error messages
 * Included fun.utils after the validation plugin to override the messages
 *
 * TODO: validator.messages on fun.strings.js
 */
jQuery.extend(jQuery.validator.messages, {
    required: "This field is required.",
    remote: "Please fix this field.",
    email: "Please enter a valid email address.",
    url: "Please enter a valid URL.",
    date: "Please enter a valid date.",
    dateISO: "Please enter a valid date (ISO).",
    number: "Please enter a valid number.",
    digits: "Please enter only digits.",
    creditcard: "Please enter a valid credit card number.",
    equalTo: "Please enter the same value again.",
    accept: "Please enter a value with a valid extension.",
    maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
    minlength: jQuery.validator.format("Please enter at least {0} characters."),
    rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
    range: jQuery.validator.format("Please enter a value between {0} and {1}."),
    max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
    min: jQuery.validator.format("Please enter a value greater than or equal to {0}.")
});


/**
 * Alias
 */
var translate = fun.utils.translate;
var round = fun.utils.round;


// random stuff that needs some new love

var Theme = function(){
    
    var chartColors;
    
    // Black & Orange
    //chartColors = ["#FF9900", "#333", "#777", "#BBB", "#555", "#999", "#CCC"];
    
    // Ocean Breeze
    //chartColors = ['#94BA65', '#2B4E72', '#2790B0', '#777','#555','#999','#bbb','#ccc','#eee'];
    
    // Fire Starter
    //chartColors = ['#750000', '#F90', '#777', '#555','#002646','#999','#bbb','#ccc','#eee'];
    
    // Mean Green
    chartColors = ['#5F9B43', '#DB7D1F', '#BA4139', '#777','#555','#999','#bbb','#ccc','#eee'];
    
    return { chartColors: chartColors };
    
}();


var Charts = function () {
    
    var colors = Theme.chartColors;
    
    return {
        vertical: vertical,
        horizontal: horizontal,
        pie: pie,
        donut: donut,
        line: line
    };
    
    function vertical(target, data) {
        var options = {
            colors: colors,
    
            grid: {
                hoverable: true, 
                borderWidth: 2
            }, 
            bars: {
                horizontal: false, 
                show: true, 
                align: 'center', 
                lineWidth: 0,
                fillColor: { colors: [ { opacity: 1 }, { opacity: 0.5 } ] }
            }, 
            legend: {
                show: true
            },
            
            tooltip: true,
            tooltipOpts: {
                content: '%s: %y'
            },
        };
    
        var el = $(target);
        
        if (el.length) {
            $.plot(el, data, options );
        }
    }
    
    function horizontal(target, data) {
        var options = {
                    colors: colors,

                    grid: {
                        hoverable: true, 
                        borderWidth: 2
                    }, 
                    bars: {
                        horizontal: true, 
                        show: true, 
                        align: 'center', 
                        barWidth: .2,
                        lineWidth: 0,
                        fillColor: { colors: [ { opacity: 1 }, { opacity: 1} ] }
                    }, 
                    legend: {
                        show: true
                    },
            
                    tooltip: true,
                    tooltipOpts: {
                        content: '%s: %y'
                    },
                };
            
            var el = $(target);
                
                if (el.length) {
                    $.plot(el, data, options );
                }
    }
    
    function pie(target, data) {
        var options = {
            colors: colors,
            
            series: {
                pie: {
                    show: true,  
                    innerRadius: 0, 
                    stroke: {
                        width: 4
                    }
                }
            }, 
                
            legend: {
                position: 'ne'
            }, 
            
            tooltip: true,
            tooltipOpts: {
                content: '%s: %y'
            },
            
            grid: {
                hoverable: true
            }
        };

        var el = $(target);
                
            if (el.length) {
                $.plot(el, data, options );
            }
    }
    
    function donut(target, data) {
        var options = {
            colors: colors,
            
            series: {
                pie: {
                    show: true,  
                    innerRadius: .5, 
                    stroke: {
                        width: 4
                    }
                }
            }, 
                
            legend: {
                position: 'ne'
            }, 
            
            tooltip: true,
            tooltipOpts: {
                content: '%s: %y'
            },
            
            grid: {
                hoverable: true
            }
        };
        
        var el = $(target);
                        
        if (el.length) {
            $.plot(el, data, options );
        }
    }
    
    
    /** 
    * - Please update for timezone support on charts

    $.plot("#placeholder", [d], {
        xaxis: {
            mode: "time",
            minTickSize: [1, "hour"],
            min: (new Date(1999, 11, 31)).getTime(),
            max: (new Date(2000, 0, 1)).getTime(),
            twelveHourClock: true
        }
    });
    */
    function line (target, data) {
        var options = {
                colors: colors,
                series: {
                    lines: { 
                        show: true, 
                        fill: true, 
                        lineWidth: 4, 
                        steps: false, 
                        fillColor: { colors: [{opacity: 0.4}, {opacity: 0}] } 
                    },
                    points: { 
                        show: true, 
                        radius: 4, 
                        fill: true
                    }
                }, 
                legend: {
                    position: 'ne'
                },
                tooltip: true,
                tooltipOpts: {
                    content: '%s: %y'
                },
                xaxis: {
                    mode: "time",
                    minTickSize: [1, "hour"],
                    twelveHourClock: true
                }, 
                grid: { borderWidth: 2, hoverable: true }
        };
            
            var el = $(target);
                
                if (el.length) {
                    $.plot(el, data, options );
                }
    }
}();