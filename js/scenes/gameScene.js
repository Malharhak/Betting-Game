define(["game/GameScene", "data/gameEntities", "gameplay/GameBoard"], 
function (GameScene, gameEntities, GameBoard) {

    var gameScene = new GameScene();

    gameScene.entitiesList = gameEntities;

    gameScene.init = function () {
        console.log("Game scene init");
        var gameBoard = new GameBoard();
        gameBoard.generateTiles();
    };

    return gameScene;
});