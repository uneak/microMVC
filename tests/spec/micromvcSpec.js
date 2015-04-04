define(["micromvc"], function (MicroMvc) {

    describe('MicroMvc Framework', function() {


        var app = new MicroMvc();

        it('should be accessible', function() {
            expect(app).not.toBe(null);
        });

        it('should return a VERSION', function() {
            expect(app.VERSION).not.toBe(null);
        });



        app.models.add("myModel", {
            _title: null,
            getTitle: function () {
                return this._title;
            },
            setTitle: function (title) {
                //console.log("myModel publish : "+title);
                this._title = title;
                this.publish("onTitle", {title: title});
                return this;
            }
        });


        app.views.add("myView", {
            _constructor: function () {
                this.models.subscribe("myModel.onTitle", this, this.onTitle);
            },
            onTitle: function (event) {
                //console.log("myView receive : "+event.title);
                //it('myView subscribe receive title', function() {
                //    expect(event.title).not.toBe(null);
                //});

            }
        });


        app.controllers.add("myController", {
            indexAction: function (message) {
                this.models.call("myModel.setTitle", message);
                return "ok";
            }
        });


        it('direct call to myController', function() {
            expect(app.controllers.myController.indexAction("Hello Direct !")).toBe("ok");
        });

        it('component call to myController', function() {
            expect(app.controllers.call("myController.indexAction", "Hello Component !")).toBe("ok");
        });





    });

});