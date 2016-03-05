/** Main inputs container
- Contains the mouse and keyboard informations
- WIP
**/
define (["inputs/Mouse"], 
    function (Mouse) {
    var Inputs = function () {
        this.mouse = new Mouse();
    };

    Inputs.prototype.reset = function () {
        this.mouse.reset();
    };

    Inputs.prototype._postInputs = function () {
        this.mouse.postInputs();
    };

    Inputs.prototype.init = function (container) {
        var self = this;

        container.on('mousemove', function (event) {
            self.mouse.moveClassic (event);
        });
        container.on('mousedown', function (event) {
            self.mouse.down(event.which, event);
        });
        container.on('mouseup', function (event) {
            self.mouse.up(event.which, event);
        });
        container.on('touchstart', function (event) {
            self.mouse.touchDown(event);
        });
        container.on('touchend', function (event) {
            self.mouse.touchUp(event);
        });
    };

    return new Inputs();
});