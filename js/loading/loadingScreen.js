/** A very basic loading screen to avoid having a blank page when loading the game assets **/
define (["assets/imageLoader", "assets/soundLoader", "data/assets", "data/sounds", "config", "graphics/canvas", "inputs/inputs"], 
function (imageLoader, soundLoader, assets, sounds, config, canvas, inputs) {

    var loadingBar = {
        width: 200,
        height: 40,
        fillColor: "#48c7f6",
        strokeColor: "#025574"
    };

    var loadingScreen = function () {

    };

    loadingScreen.init = function () {
        imageLoader.setBaseFolder(config.imagesFolder);
        imageLoader.addImages(assets);
        soundLoader.setBaseFolder(config.soundsFolder);
        soundLoader.pushSounds(sounds);
        
        inputs.init($(window));
        canvas.init(config.canvas);
    };

    loadingScreen.update = function () {
        return imageLoader.isLoaded();
    };

    loadingScreen.render = function () {
        canvas.ctx.fillStyle = "white";
        canvas.ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        canvas.ctx.fillStyle = loadingBar.fillColor;
        canvas.ctx.strokeStyle = loadingBar.strokeColor;
        canvas.ctx.lineWidth = 5;

        var loadingPosition = {
            x: canvas.width / 2 - loadingBar.width / 2,
            y: canvas.height / 2 - loadingBar.height / 2
        };

        canvas.ctx.fillRect(
            loadingPosition.x,
            loadingPosition.y,
            loadingBar.width * imageLoader.getLoadPercentage(),
            loadingBar.height);
        canvas.ctx.strokeRect(
            loadingPosition.x,
            loadingPosition.y,
            loadingBar.width,
            loadingBar.height);
    };

    return loadingScreen;
});