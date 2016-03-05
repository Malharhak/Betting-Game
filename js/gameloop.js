define (["requestAnimationFrame", "loading/loadingScreen", "game/game", "data/gameScenes"], 
function (requestAnimationFrame, loadingScreen, game, gameScenes) {

    var gameloop = {};
    var currentScene = gameScenes.defaultScene;

    // Simple game state machine to show a loading screen until the game is ready.
    var GameStates = {
        Loading: 0,
        Playing: 1
    };

    var gameState = 0;

    function loading () {
        var changeState = loadingScreen.update();
        loadingScreen.render();
        if (changeState) {
            currentScene.load();
            gameState++;
        }
    }
    function loop () {
        var changeState = false;
        if (gameState == GameStates.Loading) {
            loading();
        } else if (gameState == GameStates.Playing) {
            currentScene._update();
            currentScene._render();   
        }
        requestAnimationFrame(loop);
    }

    gameloop.init = function () {
        loadingScreen.init();
        loop();
    };

    return gameloop;
});