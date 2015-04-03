define(function() {
    var Element = function () {};
    Element.prototype = {
        _constructor: function () {},
        publish: function (context, event) {
            this._component.publish(this._id + "." + context, event);
        }
    };
    return Element;
});