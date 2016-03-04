define(["maths/Vector2"], 
function (Vector2) {

    var Transform = function () {
        this.position = new Vector2();
        this.rotation = 0;
        this.scale = 1;
    };

    Transform.prototype.translate = function (translationVector) {
        this.position.add(translationVector);
    };

    Transform.prototype.rotate = function (rotationAmount) {
        this.rotation += rotationAmount;
    };

    // World attributes are the local position, rotation, scale,
    // But with the parent's attributes added to them 
    Transform.prototype.getWorldPosition = function () {
        var worldPosition = new Vector2();
        worldPosition = worldPosition.add(this.position);
        if (typeof this.parent == "object") {
            worldPosition = worldPosition.add(this.parent.getWorldPosition());
        }
    };

    Transform.prototype.getWorldRotation = function () {
        var worldRotation = this.rotation;
        if (typeof this.parent == "object") {
            worldRotation = worldRotation + this.parent.getWorldRotation();
        }
    };

    Transform.prototype.getWorldScale = function () {
        var worldScale = this.scale;
        if (typeof this.parent == "object") {
            worldScale = worldScale + this.parent.getWorldScale();
        }
    };

    return Transform;
});