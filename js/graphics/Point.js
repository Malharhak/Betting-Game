define ([], function () {
    'use strict';

    var Point = function (x, y) {
        // If the first parameter is another point, use it
        if (typeof x == "object") {
            this.commonInit(x.x, x.y);
        } else if (typeof x == "number" && typeof y == "number") {
            this.commonInit(x, y);
        } else {
            throw new Error("Incorrect parameters for Point constructor");
        }
    };

    Point.prototype.commonInit = function (x, y) {
        this.x = x;
        this.y = y;
    };

    return Point;
});