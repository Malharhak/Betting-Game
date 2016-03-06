define (["graphics/canvas", "maths/Vector2", "assets/localizer"], 
function (canvas, Vector2, localizer) {
    var renderingFunctions = {};

    renderingFunctions.renderObject = function (renderer) {
        this.prepareRender(renderer);

        var ctx = canvas.ctx;
        var scaledPivot = new Vector2(
            renderer.pivot.x * renderer.width,
            renderer.pivot.y * renderer.height
        );
        if (renderer.imageHandle) {
            var sx = 0,
                sy = 0,
                sw = renderer.width,
                sh = renderer.height,
                dx = -scaledPivot.x,
                dy = -scaledPivot.y,
                dw = renderer.width,
                dh = renderer.height;

            ctx.drawImage(renderer.imageHandle, sx, sy, sw, sh, dx, dy, dw, dh);
        }
        if (renderer.label) {
            this.renderLabel(renderer);
        }
        ctx.restore();
    };

    renderingFunctions.renderLabel = function (renderer) {
        var ctx = canvas.ctx;
        if (renderer.label) {
            ctx.save();
            var label = renderer.label;
            if (typeof label.alpha == "number") {
                ctx.globalAlpha = label.alpha;
            }
            // ctx.scale(scale, scale);
            ctx.font = label.font;
            ctx.strokeStyle = label.strokeStyle;
            ctx.textAlign = label.textAlign || "center";
            ctx.textBaseline = label.textBaseline || "middle";
            if (typeof label.position == "undefined") {
                label.position = Vector2.zero();
            }
            if (label.fillStyle) {
                ctx.fillStyle = label.fillStyle;
                ctx.fillText(localizer.getString(label.text), label.position.x, label.position.y);
            }
            if (label.strokeStyle) {
                ctx.lineWidth = label.lineWidth;
                ctx.strokeText(localizer.getString(label.text), label.position.x, label.position.y);
            }
            ctx.restore();
        }
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