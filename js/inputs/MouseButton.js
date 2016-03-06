define ([], function () {
    var MouseButton = function () {
        this.down = false; // The button is being held down
        this.lastDown = true; 
        this.pressed = false; // The button has just been pressed at this frame
        this.released = false;
    };

    MouseButton.prototype.press = function () {
        this.down = true;
        if (this.lastDown === false) {
            this.pressed = true;
        }
    };

    MouseButton.prototype.tap = function () {
        this.down = false;
        this.lastDown = false;
        this.press();
        this.down = false;
    };

    MouseButton.prototype.release = function () {
        this.down = false;
        this.pressed = false;
        this.released = true;
    };

    MouseButton.prototype.postInputs = function () {
        this.pressed = false;
        this.released = false;
        this.lastDown = this.down;
    };

    return MouseButton;
});