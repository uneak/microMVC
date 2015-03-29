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

var microMVC = microMVC || {};

microMVC.Component = function (app) {
    this.__app__ = app;
    this.subscribers = {};
};


microMVC.Component.prototype = {

    add: function (id, obj, ext) {
        ext = ext || microMVC.MvcElement;

        var element = function () {
        };
        element.prototype = new ext;
        element.prototype._id = id;
        element.prototype._component = this;
        element.prototype.controllers = this.__app__.controllers;
        element.prototype.models = this.__app__.models;
        element.prototype.views = this.__app__.views;
        for (var attr in obj) {
            element.prototype[attr] = obj[attr];
        }
        this[id] = new element();
        this[id]._constructor();

        return this[id];
    },


    call: function (path, argument) {
        var match;
        if ((match = /^(.*?)\.(.*)$/.exec(path)) !== null) {
            return this[match[1]][match[2]](argument);
        }
        return null;
    },

    publish: function (context, event) {
        event = event || {};

        var re = /\.*([^.]+)\.*/g;
        var m;
        var ns = this.subscribers;
        while ((m = re.exec(context)) !== null && ns[m[1]]) {
            if (m.index === re.lastIndex) {
                re.lastIndex++;
            }

            ns = ns[m[1]];
            if (ns._subscribers) {
                for (var i = 0; i < ns["_subscribers"].length; i++) {
                    ns["_subscribers"][i].callback.call(ns["_subscribers"][i].scope, event);
                }
            }
        }
        return this;
    },

    subscribe: function (context, scope, callback) {

        var re = /\.*([^.]+)\.*/g;
        var m;
        var ns = this.subscribers;
        while ((m = re.exec(context)) !== null) {
            if (m.index === re.lastIndex) {
                re.lastIndex++;
            }
            ns[m[1]] = ns[m[1]] || {};
            ns = ns[m[1]];
        }

        ns["_subscribers"] = ns["_subscribers"] || [];
        ns["_subscribers"].push({context: context, scope: scope, callback: callback});
    }

};



var microMVC = microMVC || {};

microMVC.Application = function () {
        this.controllers = new microMVC.Component(this);
        this.models = new microMVC.Component(this);
        this.views = new microMVC.Component(this);
};
