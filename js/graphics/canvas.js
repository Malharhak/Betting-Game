define (["jquery", "graphics/Point"], function ($, Point) {
    var Canvas = function () {

    };

    Canvas.prototype.init = function (config) {
        this.containerId = config.containerId;
        this.width = config.width;
        this.height = config.height;
        this.aspectRatio = config.width / config.height;
        this.ctx = this.canvas[0].getContext('2d');
    };

    Canvas.prototype.setupCanvas = function () {
        this.container = $(config.gameContainer);
        this.canvas = $("<canvas />").appendTo (this.container).attr({
            width : config.width,
            height : config.height,
            id : config.canvasId,
            tabIndex : 1
        }).addClass('gameCanvas');
    };
    
    Canvas.prototype.setupCanvasResizing = function () {
        var self = this;
        $(window).resize (function () {
            self.resize();
        });
        this.resize();
    };

    Canvas.prototype.resize = function () {
        var screenWidth = this.container.width();
        var screenHeight = this.container.height();

        var bounds = this.getCanvasBoundsForNewSize(screenWidth, screenHeight);
        this.canvas.css ({
            width   : bounds.width + 'px',
            height  : bounds.height + 'px',
            left    : bounds.x + 'px',
            top     : bounds.y + 'px'
        });
    };

    Canvas.prototype.getCanvasBoundsForNewSize = function (screenWidth, screenHeight) {
        var newRatio = width / height;
        var bounds = new Rectangle(0, 0, width, height);

        // If the window is too large, reduce the width of the canvas to fit the screen
        if (newRatio > this.aspectRatio) {
            bounds.width = Math.floor(screenHeight * this.aspectRatio);
            bounds.x = Math.floor((screenWidth - newWidth) / 2); // Place the canvas at the middle
        } 
        // Otherwise, reduce its height
        else if (newRatio <= this.aspectRatio) {
            bounds.height = Math.floor (screenWidth / this.aspectRatio);
            bounds.y = Math.floor ((screenHeight - newHeight) / 2);
        }
        return bounds;

    }

    return new Canvas();
});