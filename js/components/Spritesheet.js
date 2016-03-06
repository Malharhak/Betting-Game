define (["components/Component", "components/ComponentType", "game/time"], 
function (Component, ComponentType, time) {
    
    var Spritesheet = function (parameters) {
        this._addToWorld();
        this.animationKeys = parameters.animationKeys;
        this.imageName = parameters.imageName;
        this.animationMode = parameters.animationMode || "loop"; // loop or reverse
        this.animationDirection = parameters.animationDirection || "forward";
        this.frameDuration = parameters.frameDuration || 0.1;

        this.lastKeyChange = time.time;
        this.currentKey = 1;
    };
    Spritesheet.prototype.componentType = ComponentType.Spritesheet;
    _.extend(Spritesheet.prototype, Component.prototype);

    Spritesheet.prototype.update = function () {
        // console.log("Spritesheet update ", time.time);
        if (time.time - this.lastKeyChange > this.frameDuration) {
            if (this.animationDirection == "forward") {
                this.incrementFrame();
            } else {
                this.decrementFrame();
            }
            this.lastKeyChange = time.time;
        }
    };

    Spritesheet.prototype.incrementFrame = function () {
        this.currentKey++;
        if (this.currentKey > this.animationKeys) {
            if (this.animationMode == "loop") {
                this.currentKey = 1;
            } else {
                this.animationDirection = "backward";
                this.currentKey = this.animationKeys;
            }
        }
        this.updateRenderer();
    };

    Spritesheet.prototype.decrementFrame = function () {
        this.currentKey--;
        if (this.currentKey < 1) {
            this.animationDirection = "forward";
            this.currentKey = 1;
        }
        this.updateRenderer();
    };

    Spritesheet.prototype.updateRenderer = function () {
        this.getEntity().getComponent(ComponentType.Renderer).changeImage(this.imageName + this.currentKey);
    };

    Spritesheet.prototype.componentType = ComponentType.Spritesheet;
    _.extend(Spritesheet.prototype, Component.prototype);

    return Spritesheet; 
});