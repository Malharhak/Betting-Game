define (["requestAnimationFrame", "loading/loadingScreen", "game/game", "inputs/inputs", "game/GameScene", "scenes/gameScenes"], 
function (requestAnimationFrame, loadingScreen, game, inputs, GameScene, gameScenes) {

    var gameloop = {};

    // Simple game state machine to show a loading screen until the game is ready.
    var GameStates = {
        Loading: 0,
        Playing: 1
    };

    var gameState = 0;

    // Simplified game loop during the loading of game assets
    function loading () {
        var changeState = loadingScreen.update();
        loadingScreen.render();
        if (changeState) {
            GameScene.currentScene.load();
            gameState++;
        }
    }

    function loop () {
        var changeState = false;
        if (gameState == GameStates.Loading) {
            loading();
        } else if (gameState == GameStates.Playing) {
            GameScene.currentScene._update();
            GameScene.currentScene._render();   
        }
        inputs._postInputs();
        requestAnimationFrame(loop);
    }

    gameloop.init = function () {
        loadingScreen.init();
        loop();
    };

    return gameloop;
});