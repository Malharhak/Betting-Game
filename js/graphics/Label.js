define (["maths/Vector2"], 
function (Vector2) {
    var Label = function (parameters) {
        this.font = parameters.font || "48px Arial";
        this.fillStyle = parameters.fillStyle || false;
        this.strokeStyle = parameters.strokeStyle || false;
        this.textAlign = parameters.textAlign || "center";
        this.textBaseLine = parameters.textBaseLine || "middle";
        this.lineWidth = parameters.lineWidth || 2;
        this.position = parameters.position || Vector2.zero();
        this.text = parameters.text;
    };

    return Label;
});