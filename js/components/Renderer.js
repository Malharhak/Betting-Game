/** Renderer components
- Contains all the data needed for an object to be rendered on screen
**/
define (["Vector2", "imageLoader", "utils", "renderingFunctions", 
    "components/ComponentType", "components/Component"], 
function (Vector2, imageLoader, utils, renderingFunctions, 
    ComponentType, Component) {

    var Renderer = function (parameters) {
        this._addToWorld();
        
        this._id = parameters._id || utils.guid();
        this.position = parameters.position || Vector2.zero();
        this.rotation = parameters.rotation || 0;
        this.scale = infos.scale || 1;
        this.imageName  = infos.imageName   || "default";
        this.imageHandle = imageLoader.get(this.imageName);
        this.width  = infos.width   || this.imageHandle.width;
        this.height = infos.height  || this.imageHandle.height;
        this.pivot  = infos.pivot   || new Vector2(0.5, 0.5);
        // Optional canvas ctx parameters to set before rendering
        this.canvasParam = infos.canvasParam || {};
        if (typeof infos.alpha == "number") {
            this.alpha = infos.alpha;
        } else {
            this.alpha = 1;
        }
        this.label = infos.label || false;
        if (infos.slice) {
            this.slice = infos.slice;
        }
    };
    Renderer.prototype.componentType = ComponentType.Renderer;
    _.extend(Renderer.prototype, Component.prototype);
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