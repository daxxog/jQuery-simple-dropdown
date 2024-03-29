/* jQuery-simple-dropdown
 * easy to use drop down menu plugin for jQuery using mustache.js templates.
 * (c) 2012 David (daXXog) Volm ><> + + + <><
 * Released under Apache License, Version 2.0:
 * http://www.apache.org/licenses/LICENSE-2.0.html  
 */
$.jsd = function(data, event, template) {
    var _data = {"menu": data}, //make the data ready for mustache
        that = $(event.delegateTarget); //what we did an event on
    
    that.ev = { //from microevent.js
        /*bind*/on : function(event, fct) {
            this._events = this._events || {};
            this._events[event] = this._events[event]	|| [];
            this._events[event].push(fct);
            return that;
        },
        /*unbind*/off : function(event, fct) {
            this._events = this._events || {};
            if( event in this._events === false  )	return;
            this._events[event].splice(this._events[event].indexOf(fct), 1);
            return that;
        },
        trigger	: function(event /* , args... */) {
            that.trigger(event);
            this._events = this._events || {};
            if( event in this._events === false  ) 	return;
                for(var i = 0; i < this._events[event].length; i++){
                    this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
                }
            }
    };
    
    if(typeof template == 'undefined') { //pre-defined template
        template = '{{#menu}}'+
        '<div class="jsd-item">'+
        '<div class="jsd-title"><a class="jsd-link" href="{{{href}}}">{{{title}}}</a></div>'+
        '</div>'+
        '{{/menu}}';
    }

    template = '<div class="jsd-container">' + template + '</div>'; //always put the template in the container
    $('.jsd-container').remove(); //remove all open menus
    
    var _left = event.pageX-10; //figure out what left is
    
    var _el = $($.mustache(template, _data)).css({ //render and display menu
        left: _left,
        top: event.pageY-10,
        position: "absolute",
        display: "none",
    }).appendTo(document.body);
    
    if(_el.width()+_left > $(document.body).width()) { //check if overflow
        _el.css({
            left: $(document.body).width() - _el.width() - 10 //adjust the position
        });
    }
    
    _el.slideDown(function() { //show the menu by sliding down
        that.ev.trigger('jsd-open'); //trigger the open event
        
        var _clickev = (typeof $.mobile === 'undefined') ? 'click' : 'vclick', //if we have $.mobile use virtual mouse event
            _killmenu = function() { //function to kill the menu
            $(document).off(_clickev, _killmenu);
            $('.jsd-container').fadeOut(function() {
                that.ev.trigger('jsd-close'); //trigger the close event
            });
        };
        
        $('.jsd-container').mouseleave(function(event) { //bind the mouseleave event to the menu
            _killmenu();
        });
        
        $('.jsd-container').on(_clickev, function(e) { //every click event except this one kills the menu
            e.stopPropagation();
        });
        
        $(document).on(_clickev, _killmenu);
    }); 
    
    return that;
};