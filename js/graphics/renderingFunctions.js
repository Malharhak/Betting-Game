define (["graphics/canvas", "maths/Vector2"], 
function (canvas, Vector2) {
    var renderingFunctions = {};

    renderingFunctions.renderObject = function (renderer) {
        this.prepareRender(renderer);
        
        var ctx = canvas.ctx;
        var scaledPivot = new Vector2(
            renderer.pivot.x * renderer.width,
            renderer.pivot.y * renderer.height
        );

        var sx = 0,
            sy = 0,
            sw = renderer.width,
            sh = renderer.height,
            dx = -scaledPivot.x,
            dy = -scaledPivot.y,
            dw = renderer.width,
            dh = renderer.height;

        ctx.drawImage(renderer.imageHandle, sx, sy, sw, sh, dx, dy, dw, dh);
        ctx.restore();
    };

    renderingFunctions.prepareRender = function (renderer) {
        var transform = renderer.getTransform();
        var scale = renderer.scale * transform.getWorldScale();
        var rotation = renderer.rotation + transform.getWorldRotation();
        var position = renderer.position.add(transform.getWorldPosition());

        if (typeof renderer.alpha == "number") {
            renderer.canvasParam.globalAlpha = renderer.alpha;
        }
        this.setCanvasParameters(renderer, position, rotation, scale);
    };

    renderingFunctions.setCanvasParameters = function (renderer, position, rotation, scale) {
        var ctx = canvas.ctx;
        ctx.save();

        for (var i in renderer.canvasParam) {
            ctx[i] = renderer.canvasParam[i];
        }
        
        ctx.translate(position.x, position.y);
        ctx.rotate(rotation);
        ctx.scale(scale, scale);
    };


    return renderingFunctions;
});