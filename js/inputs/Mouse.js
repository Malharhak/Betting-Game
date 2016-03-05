/** Mouse container
- Contains the mouse ingame position
- Contains a MouseButton object for each mouse button
**/
define (["maths/Vector2", "inputs/MouseButton", "graphics/canvas", "graphics/Point"], 
    function (Vector2, MouseButton, canvas, Point) {
    var buttonsList = [
        "",
        "left",
        "middle",
        "right"
    ];
    var Mouse = function () {
        this.reset();
    };
    Mouse.prototype.reset = function () {
        this.position = new Point(0, 0);
        this.buttons = {
            left : new MouseButton(),
            right : new MouseButton(),
            middle : new MouseButton()
        };  
    };

    Mouse.prototype.moveClassic = function (event) {
        var mouseX = event.pageX;
        var mouseY = event.pageY;
        this.move(new Vector2(mouseX, mouseY));
        //console.log(x, y);
    };
    Mouse.prototype.moveFinger = function (event) {
        var mouseX = event.originalEvent.touches[0].pageX;
        var mouseY = event.originalEvent.touches[0].pageY;
        this.move(new Vector2(mouseX, mouseY));
    };

    Mouse.prototype.move = function (mousePosition) {
        var offset = canvas.canvas.offset();
        mousePosition.x -= offset.left;
        mousePosition.y -= offset.top;

        mousePosition.x *= canvas.width / canvas.cssWidth;
        mousePosition.y *= canvas.height / canvas.cssHeight;
        var lastPosition = {
            x : this.position.x,
            y : this.position.y
        };
        this.position = new Point(mousePosition);
    };
    Mouse.prototype.down = function (button, evt) {
        var btn = assoc[button];
        this.buttons[btn].press();
    };
    Mouse.prototype.up = function (button, evt) {
        var btn = assoc[button];
        this.buttons[btn].release();
    };
    Mouse.prototype.touchDown = function (evt) {
        this.moveFinger(evt);
        this.buttons.left.press();
    };
    Mouse.prototype.touchUp = function (evt) {
        this.buttons.left.release();
    };
    Mouse.prototype.tap = function () {
        this.buttons.left.tap();
    };
    
    Mouse.prototype.postInputs = function () {
        for (var i in this.buttons) {
            this.buttons[i].postInputs();
        }
    };

    return Mouse;
});