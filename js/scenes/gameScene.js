define(["game/game", "game/GameScene", "data/gameEntities", "gameplay/GameBoard", "entities/Entity", 
    "maths/Vector2", "config", "components/ComponentType", "game/gameStatistics", "entities/world",
    "assets/soundLoader"], 
function (game, GameScene, gameEntities, GameBoard, Entity, 
    Vector2, config, ComponentType, gameStatistics, world,
    soundLoader) {

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
        console.log("It's dice time");
        var dice = new Entity("dice");
        dice.load({
            position: new Vector2(config.canvas.width / 2, 180),
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

    gameScene.movePlayerToNextTile = function (movesLeft, tileChoice) {
        console.log("Move player to next tile with ", movesLeft, " moves left and choice: ", tileChoice);
        var branching = gameBoard.getBranching();
        if (branching && typeof tileChoice == "undefined") {
            gameScene.askPlayerForBranching(branching, function (tileChoice) {
                gameScene.movePlayerToNextTile(movesLeft, tileChoice);
            });
            return;
        }
        var nextTile = gameBoard.getNextTile(tileChoice);
        console.log("Next tile: ", nextTile);
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

    gameScene.askPlayerForBranching = function (branching, callback) {
        console.log("Ask for branching");
        this.currentArrows = [];
        for (var i = 0; i < branching.length; i++) {
            var branch = new Entity();
            branch.load({
                position: new Vector2(branching[i].position),
                components: {
                    renderer: {
                        imageName: "arrow_normal",
                        scale: 0.001,
                        rotation: branching[i].angle,
                        animation: {
                            duration: 0.5,
                            properties: {
                                scale: 1.5,
                                rotation: branching[i].angle,
                                ease: Expo.easeOut
                            }
                        }
                    },
                    inputable: {},
                    gameButton: {
                        normalImage: "arrow_normal",
                        pressedImage: "arrow_pressed",
                        overImage: "arrow_over"
                    }
                }
            });
            branch.addEventListener("mouseUp", gameScene.generatePlayerBranchingChoice(callback, branching[i]));
            gameScene.currentArrows.push(branch);
        }
    };

    gameScene.generatePlayerBranchingChoice = function (callback, tileChoice) {
        return function () {
            console.log("Branching chose ", tileChoice);
            for (var i = 0; i < gameScene.currentArrows.length; i++) {
                gameScene.currentArrows[i].destroy();
            }
            callback(tileChoice);
        };
    };

    gameScene.pickupCoin = function (nextTile) {
        if (nextTile.transform.children) {
            var tileCoin = nextTile.transform.children;
            gameScene.pickupAnimation(tileCoin.getWorldPosition());
            tileCoin.entity.destroy();
            soundLoader.get('coin').play();
        }
    };

    gameScene.pickupAnimation = function (position, delay) {
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
        TweenLite.to(coin.transform.position, 1.5, {
            x: counterPosition.x,
            y: counterPosition.y,
            ease: Expo.easeInOut,
            onComplete: function () {
                gameStatistics.addCoins(1);
                coin.destroy();
            }
        });
    };

    gameScene.finishedMovingPlayer = function () {
        console.log("Player finished moving :o");
        this.processTileResult();
    };

    gameScene.processTileResult = function () {
        var currentTile = gameBoard.getCurrentTile();
        var tileData = currentTile.getComponent(ComponentType.BoardTile);
        var finishProcessingCallback = function () {
            gameScene.finishTurn();
        };
        var tileType = tileData.tileType;
        switch (tileType) {
            case "bonus":
                gameScene.pickupCoins(config.gameplay.tiles.coinsPerBonus, finishProcessingCallback);
                soundLoader.get("coin").play();
                break;
            case "star":
                gameScene.pickupCoins(config.gameplay.tiles.coinsPerStar, finishProcessingCallback);
                soundLoader.get("star").play();
                break;
            case "malus":
                gameScene.loseCoins(config.gameplay.tiles.coinsPerMalus, finishProcessingCallback);
                soundLoader.get("fail").play();
                break;
            case "jackpot":
                gameScene.pickupCoins(config.gameplay.tiles.coinsPerJackpot, finishProcessingCallback);
                soundLoader.get("star").play();
                break;
            case "lucky":
                gameScene.pickupCoins(config.gameplay.tiles.coinsPerLucky, finishProcessingCallback);
                soundLoader.get("star").play();
                break;
            case "death":
                this.finishGame();
                soundLoader.get("fail").play();
                return;
            default:
                finishProcessingCallback();
                break;
        }
    };

    gameScene.pickupCoins = function (amount, callback) {
        var timeBetweenPickups = 0.2 * 1000;
        var self = this;
        if (amount > 3) {
            timeBetweenPickups /= 2;
        }
        if (amount > 10) {
            timeBetweenPickups /= 10;
        }
        for (var i = 0; i < amount; i++) {
            setTimeout(self.generatePickupAnimation(), i * timeBetweenPickups);
        }
        setTimeout(callback, amount * timeBetweenPickups);
    };
    gameScene.generatePickupAnimation = function () {
        return function () {
            soundLoader.get("coin").play();
            gameScene.pickupAnimation(player.transform.position);
        };
    };

    gameScene.loseCoins = function (amount, callback) {
        var timeBetweenLoss = 0.1 * 1000;
        var self = this;
        for (var i = 0; i < amount; i++) {
            setTimeout(gameScene.generateLoseCoinAnimation(), i * timeBetweenLoss);
        }
        setTimeout(callback, amount * timeBetweenLoss);
    };
    gameScene.generateLoseCoinAnimation = function () {
        return function () {
            gameScene.loseCoinsAnimation();
        };
    };
    gameScene.loseCoinsAnimation = function () {
        var counterPosition = world.findEntityByName("coinsCounter").transform.position;
        var coin = new Entity();
        coin.load({
            position: new Vector2(counterPosition),
            components: {
                renderer: {
                    scale: 0.5,
                    imageName: "coins_1"
                }
            }
        });
        var downPosition = counterPosition.add(new Vector2(0, 100));
        var coinRenderer = coin.getComponent(ComponentType.Renderer);
        TweenLite.to(coin.transform.position, 0.5, {
            x: downPosition.x,
            y: downPosition.y,
            ease: Expo.easeInOut,
            onComplete: function () {
                gameStatistics.addCoins(-1);
                TweenLite.to(coinRenderer, 1, {
                    alpha: 0,
                    ease: Circ.easeOut, onComplete: function () {
                        coin.destroy();
                    }
                });
            }
        });
    };

    gameScene.finishTurn = function () {
        console.log("Everything is done, let's finish the turn!");
        gameStatistics.nextTurn();
        if (gameStatistics.currentTurn > config.gameplay.turnsPerGame) {
            this.finishGame();
            return;
        }
        gameScene.showDice();
    };

    gameScene.finishGame = function () {
        game.changeScene("end");
    };

    return gameScene;
});