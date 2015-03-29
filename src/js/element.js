var microMVC = microMVC || {};

microMVC.Element = function () {
};

microMVC.Element.prototype = {
    _constructor: function () {
    },

    publish: function (context, event) {
        this._component.publish(this._id + "." + context, event);
    }

};