jQuery-simple-dropdown
======================

easy to use drop down menu plugin for [jQuery](http://jquery.com/) using [mustache.js](https://github.com/janl/mustache.js/) templates.

Dependencies
-----
* [jQuery](http://jquery.com/)
* [mustache.js](https://github.com/janl/mustache.js/)

Usage
-----

```javascript
$("#dd").click(function(event) {
    $.jsd([
        {
            title: "Option 1",
            href: "#o1",
        },
        {
            title: "Option 2",
            href: "#o2",
        },
        {
            title: "Option 3",
            href: "#o3",
        },
    ], event);
});
```