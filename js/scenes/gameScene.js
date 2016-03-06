define(["game/GameScene", "data/gameEntities"], 
function (GameScene, gameEntities) {

    var gameScene = new GameScene();

    gameScene.entitiesList = gameEntities;

    gameScene.init = function () {

    };

    return gameScene;
});