/* jQuery-simple-dropdown
 * easy to use drop down menu plugin for jQuery using mustache.js templates.
 * (c) 2012 David (daXXog) Volm ><> + + + <><
 * Released under Apache License, Version 2.0:
 * http://www.apache.org/licenses/LICENSE-2.0.html  
 */
$.jsd = function(data, event, template) {
    var _data = {"menu": data}; //make the data ready for mustache
    
    
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
    
    _el.slideDown(); //show the menu by sliding down
    
    $('.jsd-container').mouseleave(function(event) { //bind the mouseleave event to the menu
        $('.jsd-container').fadeOut(); //kill the menu
    });
};