define(["game/GameScene", "data/gameEntities", "gameplay/GameBoard", "entities/Entity", 
    "maths/Vector2", "config"], 
function (GameScene, gameEntities, GameBoard, Entity, 
    Vector2, config) {

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
        gameScene.showDice();
    };

    gameScene.showDice = function () {
        var dice = new Entity("dice");
        dice.load({
            position: new Vector2(config.canvas.width / 2, config.canvas.height / 2),
            components: {
                inputable: {},
                renderer: {
                    imageName: "dice_1"
                },
                dice: {
                    imageName: "dice_",
                    resultCallback: gameScene.diceResult
                }
            }
        });
    };

    gameScene.diceResult = function (result) {
        console.log("Dice result: ", result);
    };

    return gameScene;
});