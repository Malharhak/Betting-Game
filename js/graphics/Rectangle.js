define ([], function () {
    'use strict';

    var Rectangle = function (x, y, width, height) {
        // If the first parameter is another rectangle
        if (typeof x == "object") {
            this.commonInit(x.x, x.y, x.width, x.height);
        } else if (typeof x == "number" 
                && typeof y == "number" 
                && typeof width == "number"
                && typeof height == "number") {

            this.commonInit(x, y, width, height);
        } else {
            throw new Error("Incorrect parameters for Rectangle constructor.");
        }
    };

    Rectangle.prototype.commonInit = function (x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    };

    return Rectangle;
});