define (["game/GameScene", "game/game", "scenes/menuScene", "scenes/gameScene", "scenes/endScene"], 
function (GameScene, game, menuScene, gameScene, endScene) {
    var gameScenes = {};
    gameScenes.availableScenes = {
        menu: menuScene,
        game: gameScene,
        end: endScene
    };

    gameScenes.defaultScene = gameScenes.availableScenes.menu;

    GameScene.currentScene = gameScenes.defaultScene;

    gameScenes.changeScene = function (newScene) {
        if (typeof gameScenes.availableScenes[newScene] != "object") {
            throw new Error("Trying to load unexisting scene " + newScene);
        }
        GameScene.changeScene(gameScenes.availableScenes[newScene]);
    };
    game.changeScene = gameScenes.changeScene;

    return gameScenes;
});