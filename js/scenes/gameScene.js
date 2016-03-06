define(["game/GameScene", "data/gameEntities", "gameplay/GameBoard", "entities/Entity", 
    "maths/Vector2", "config", "components/ComponentType", "game/gameStatistics", "entities/world"], 
function (GameScene, gameEntities, GameBoard, Entity, 
    Vector2, config, ComponentType, gameStatistics, world) {

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
                },
                player: {}
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
                    resultCallback: function (result) {
                        gameScene.diceResult(result);
                    }
                }
            }
        });
    };

    gameScene.diceResult = function (result) {
        console.log("Dice result: ", result);
        gameScene.movePlayerToNextTile(result);
    };

    gameScene.movePlayerToNextTile = function (movesLeft) {
        var nextTile = gameBoard.getNextTile();
        player.getComponent(ComponentType.Player).goToNextTile(nextTile, function () {
            console.log("Woo, player got to next tile");
            movesLeft--;
            gameBoard.goToNextTile();
            if (movesLeft > 0) {
                gameScene.movePlayerToNextTile(movesLeft);
            } else {
                gameScene.finishedMovingPlayer();
            }
            gameScene.pickupCoin(nextTile);
        });
    };

    gameScene.pickupCoin = function (nextTile) {
        if (nextTile.transform.children) {
            var tileCoin = nextTile.transform.children;
            gameScene.pickupAnimation(tileCoin.getWorldPosition());
            tileCoin.entity.destroy();
        }
    };

    gameScene.pickupAnimation = function (position) {
        var coin = new Entity();
        coin.load({
            position: new Vector2(position),
            components: {
                renderer: {
                    scale: 0.5,
                    imageName: "coins_1"
                }
            }
        });
        var counterPosition = world.findEntityByName("coinsCounter").transform.position;
        TweenLite.to(coin.transform.position, 3, {
            x: counterPosition.x,
            y: counterPosition.y,
            ease: Expo.easeInOut,
            onComplete: function () {
                gameStatistics.collectedCoins++;
                coin.destroy();
            }
        });
    };

    gameScene.finishedMovingPlayer = function () {
        console.log("Player finished moving :o");
    };

    return gameScene;
});