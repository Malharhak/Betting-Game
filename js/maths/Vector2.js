/** Vector2 class with usual functions **/
define ([], function () {
    var Vector2 = function (x, y) {
        if (typeof x == "object") {
            this.x = x.x;
            this.y = x.y;
        } else if (typeof x == "number" && typeof y == "number") {
            this.x = x;
            this.y = y;
        } else {
            this.x = 0;
            this.y = 0;
        }
    };

    Vector2.zero = function () {
        return new Vector2(0, 0);
    };

    Vector2.prototype.distance = function (v) {
        return Vector2.distance(this, v);
    }
    Vector2.distance = function (v1, v2) {
        var v3 = new Vector2(v2.x - v1.x, v2.y - v1.y);
        return v3.length();
    };
    
    Vector2.prototype.add = function (v2) {
        return Vector2.add(this, v2);
    };
    Vector2.add = function (v1, v2) {
        return new Vector2 (
            v1.x + v2.x,
            v1.y + v2.y
        );
    };

    
    Vector2.prototype.sub = function (v2) {
        return Vector2.sub(this, v2);
    };
    Vector2.sub = function (v1, v2) {
        return new Vector2 (
            v1.x - v2.x,
            v1.y - v2.y
        );
    };

    Vector2.prototype.scale = function (scaleValue) {
        return Vector2.scale(this, scaleValue);
    };
    Vector2.scale = function (v1, scaleValue) {
        return new Vector2(
            v1.x * scaleValue,
            v1.y * scaleValue
        );
    };

    Vector2.prototype.length = function () {
        return Vector2.length(this);
    };
    Vector2.length = function (v) {
        return Math.sqrt(v.x * v.x + v.y * v.y);
    };

    Vector2.prototype.normalize = function () {
        return Vector2.normalize(this);
    };
    Vector2.normalize = function (v) {
        var l = Vector2.length(v);
        return new Vector2(
            v.x / length,
            v.y / length
        );
    };
    
    return Vector2;
});