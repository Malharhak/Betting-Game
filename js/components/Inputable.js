/** Inputable component
- Makes an object touchable (mouse clicks, mouse over...) 
- Requires a renderer (to detect clics on the image)
-- Can send mouseOver, mouseClick and mouseOut events to the entity
**/
define(["components/Component", "components/ComponentType", "utils", "inputs/inputs"], 
function (Component, ComponentType, utils, inputs) {
   
    var Inputable = function (parameters) {
        this._addToWorld();
        this.mouseWasOver = false;
        this.beingPressed = false;
    };
    Inputable.prototype.componentType = ComponentType.Inputable;
    _.extend(Inputable.prototype, Component.prototype);

    Inputable.prototype.update = function () {
        if (this.checkCollisionWithMouse()) {
            this.inputsWithMouseInside();
        } else {
            this.inputsWithMouseOutside();
        }
    };

    Inputable.prototype.inputsWithMouseInside = function () {
        if (this.mouseWasOver === false) {
            this._entity.sendMessage("mouseOver");
        }
        if (inputs.mouse.buttons.left.pressed) {
            this.pressMouse();
        }
        if (inputs.mouse.buttons.left.released) {
            this._entity.sendMessage("mouseUp");
        }
        this.mouseWasOver = true;
    };

    Inputable.prototype.pressMouse = function () {
        this._entity.sendMessage("mouseDown");
        this.beingPressed = true;
    };

    Inputable.prototype.releaseMouse = function () {
        this._entity.sendMessage("mouseUp");
        this.beingPressed = false;
    };

    Inputable.prototype.inputsWithMouseOutside = function () {
        if (this.mouseWasOver === true) {
            if (this.beingPressed) {
                // this.releaseMouse();
            }
            this._entity.sendMessage("mouseOut");
        }
        this.mouseWasOver = false;
    };


    Inputable.prototype.checkCollisionWithMouse = function () {
        var renderer = this.getEntity().getComponent(ComponentType.Renderer);
        var transform = this.getTransform();
        var entityPosition = transform.getWorldPosition();
        var entityScale = transform.getWorldScale();
        var mousePosition = inputs.mouse.position;

        // Check for collision between mouse and object, taking scale into account
        var entityWidth = renderer.width * entityScale;
        var entityHeight = renderer.height * entityScale;

        if (utils.aabb(
            entityPosition.x - entityWidth / 2,
            mousePosition.x,
            entityPosition.y - entityHeight / 2,
            mousePosition.y,
            entityWidth,
            1,
            entityHeight,
            1
        )) {
            return true;
        } else {
            return false;
        }
    };

   return Inputable;
});