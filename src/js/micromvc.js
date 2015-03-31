define(["component"], function(Component) {

    var Application = function () {
        this.controllers = new Component(this);
        this.models = new Component(this);
        this.views = new Component(this);
    };

    return Application;
});