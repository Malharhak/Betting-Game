define(["game/GameScene", "data/gameEntities", "gameplay/GameBoard", "entities/Entity", "maths/Vector2"], 
function (GameScene, gameEntities, GameBoard, Entity, Vector2) {

    var gameScene = new GameScene();
    var gameBoard;
    var player;
    gameScene.entitiesList = gameEntities;

    gameScene.init = function () {
        console.log("Game scene init");
        gameBoard = new GameBoard();
        gameBoard.generateTiles(function () {
            gameScene.createPlayer();
        });
    };

    gameScene.createPlayer = function () {
        player = new Entity("player");
        player.load({
            position: new Vector2(gameBoard.tiles.start.content[0].position),
            components: {
                renderer: {
                    imageName: "player"
                }
            }
        });
    };

    return gameScene;
});