/** Renderer components
- Contains all the data needed for an object to be rendered on screen
**/
define (["maths/Vector2", "assets/imageLoader", "utils", "graphics/renderingFunctions", 
    "components/ComponentType", "components/Component", "graphics/Label"], 
function (Vector2, imageLoader, utils, renderingFunctions, 
    ComponentType, Component, Label) {

    var Renderer = function (parameters) {
        this._addToWorld();
        
        this._id = parameters._id || utils.guid();
        this.position = new Vector2(parameters.position) || Vector2.zero();
        this.rotation = parameters.rotation || 0;
        this.scale = parameters.scale || 1;
        this.imageName  = parameters.imageName;
        if (this.imageName) {
            this.imageHandle = imageLoader.getImage(this.imageName);
        }
        this.width  = parameters.width   || this.imageHandle.width;
        this.height = parameters.height  || this.imageHandle.height;
        this.pivot  = parameters.pivot   || new Vector2(0.5, 0.5);
        // Optional canvas ctx parameters to set before rendering
        this.canvasParam = parameters.canvasParam || {};
        if (typeof parameters.alpha == "number") {
            this.alpha = parameters.alpha;
        } else {
            this.alpha = 1;
        }
        if (typeof parameters.label == "object") {
            this.label = new Label(parameters.label);
        }
        if (parameters.slice) {
            this.slice = parameters.slice;
        }
        if (parameters.animation) {
            this.setAnimation(parameters.animation);
        }
    };
    Renderer.prototype.componentType = ComponentType.Renderer;
    _.extend(Renderer.prototype, Component.prototype);


    Renderer.prototype.setAnimation = function (animation) {
        var target = this;
        if (animation.target) {
            target = this[animation.target];
        }
        this.launchAnimation(target, animation.duration, animation.properties);
    };

    Renderer.prototype.launchAnimation = function (target, duration, properties) {
        TweenLite.to(target, duration, properties);
    };

    Renderer.prototype.setLabelText = function (labelText) {
        this.label.text = labelText;
    };


    Renderer.prototype.changeImage = function (newImageName) {
        this.imageName = newImageName;
        this.imageHandle = imageLoader.getImage(this.imageName);
        this.width = this.imageHandle.width;
        this.height = this.imageHandle.height;
    };

    Renderer.prototype.render = function () {
        renderingFunctions.renderObject(this);
    };

    Renderer.prototype.getCenter = function () {
        return {
            x: this.position.x + this.pivot.x * this.width,
            y: this.position.y + this.pivot.y * this.height
        };
    };

    return Renderer;
});