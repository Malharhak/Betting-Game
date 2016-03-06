define(["components/Component", "components/ComponentType"], 
function (Component, ComponentType) {

    var ButtonState = {
        Normal: "normal",
        Over: "over"
    };

    var GameButton = function (parameters) {
        this._addToWorld();
        
        this.normalImage = parameters.normalImage;
        this.overImage = parameters.overImage || this.normalImage;
        this.pressedImage = parameters.pressedImage || this.normalImage;
        this.state = ButtonState.Normal;
    };
    GameButton.prototype.componentType = ComponentType.GameButton;
    _.extend(GameButton.prototype, Component.prototype);

    GameButton.prototype.mouseDown = function () {
        this.setImage(this.pressedImage);
    };

    GameButton.prototype.mouseUp = function () {
        this.setReleasedImage();
    };

    GameButton.prototype.mouseOver = function () {
        if (this.state == ButtonState.Over) {
            return;
        }
        this.state = ButtonState.over;
        this.setReleasedImage();
    };

    GameButton.prototype.mouseOut = function () {
        if (this.state == ButtonState.Normal) {
            return;
        }
        this.state = ButtonState.Normal;
        this.setReleasedImage();
    };

    GameButton.prototype.setReleasedImage = function () {
        if (this.state == ButtonState.Normal) {
            this.setImage(this.normalImage);
        } else {
            this.setImage(this.overImage);
        }
    };

    GameButton.prototype.setImage = function (image) {
        this.getEntity().getComponent(ComponentType.Renderer).changeImage(image);
    };

    return GameButton;
});