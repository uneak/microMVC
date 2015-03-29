var microMVC = microMVC || {};

microMVC.Application = function () {
        this.controllers = new microMVC.Component(this);
        this.models = new microMVC.Component(this);
        this.views = new microMVC.Component(this);
};
