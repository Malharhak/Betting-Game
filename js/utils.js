/** Helper functions used in various situations **/
define ([], function () {

    var utils = {};

    // Let's directly extend Math since this is maths
    Math.clamp = function (min, max, val) {
        if (val < min) val = min;
        if (val > max) val = max;
        return val;
    };

    utils.lerp = function (a, b, t) {
        return (b - a) * t + a;
    };
    
    // Returns a single unique ID
    utils.guid = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    };

    utils.randomInterval = function (min, max) {
        return Math.random() * (max - min) + min;
    };

    utils.randomChances = function (chances) {
        if (Math.floor(Math.random() * chances) == 1) {
            return true;
        } else {
            return false;
        }
    };

    // Simple aabb collision detection
    utils.aabb = function (x1, x2, y1, y2, w1, w2, h1, h2) {
        if ( x1 + w1 < x2 || 
            x2 + w2 < x1 || 
            y1 + h1 < y2 || 
            y2 + h2 < y1 ) {

                return false;
            } else {
                return true;
            }
    };

    return utils;
});