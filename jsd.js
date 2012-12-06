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
    
    $($.mustache(template, _data)).css({  //render and display menu
        left: event.pageX-10,
        top: event.pageY-10,
        position: "absolute",
        display: "none",
    }).appendTo(document.body).slideDown();
    
    $('.jsd-container').mouseleave(function(event) { //bind the mouseleave event to the menu
        $('.jsd-container').fadeOut(); //kill the menu
    });
};