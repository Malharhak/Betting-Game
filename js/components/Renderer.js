/** Renderer components
- Contains all the data needed for an object to be rendered on screen
**/
define (["maths/Vector2", "assets/imageLoader", "utils", "graphics/renderingFunctions", 
    "components/ComponentType", "components/Component"], 
function (Vector2, imageLoader, utils, renderingFunctions, 
    ComponentType, Component) {

    var Renderer = function (parameters) {
        this._addToWorld();
        
        this._id = parameters._id || utils.guid();
        this.position = parameters.position || Vector2.zero();
        this.rotation = parameters.rotation || 0;
        this.scale = parameters.scale || 1;
        this.imageName  = parameters.imageName   || "default";
        this.imageHandle = imageLoader.getImage(this.imageName);
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
        this.label = parameters.label || false;
        if (parameters.slice) {
            this.slice = parameters.slice;
        }
    };
    Renderer.prototype.componentType = ComponentType.Renderer;
    _.extend(Renderer.prototype, Component.prototype);

    Renderer.prototype.changeImage = function (newImageName) {
        this.imageName = newImageName;
        this.imageHandle = imageLoader.getImage(this.imageName);
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