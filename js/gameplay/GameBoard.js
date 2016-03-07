define (["data/gameBoardTiles", "entities/world", "entities/Entity", "gameplay/TileType", "utils", 
    "maths/Vector2", "config", "components/ComponentType"], 
function (gameBoardTiles, world, Entity, TileType, utils, 
    Vector2, config, ComponentType) {

    var delayBetweenTileApparitions = 0.06;

    var GameBoard = function () {
        this.tiles = {};
        this.tilesCounter = 0;
        this.currentBranch =
        this.currentTile = 0;
    };

    GameBoard.prototype.getCurrentTile = function () {
        return this.currentBranch.tiles[this.currentTile];
    };

    GameBoard.prototype.getNextTile = function (choice) {
        console.log("get next tile ", choice);
        if (this.currentTile + 1 < this.currentBranch.tiles.length) {
            return this.currentBranch.tiles[this.currentTile + 1];
        } else {
            var nextBranch = this.getNextBranch(choice);
            console.log("got branch ", nextBranch);
            return nextBranch.tiles[0];
        }
    };

    GameBoard.prototype.getBranching = function () {
        // We will propose branching only if there is a choice for the next branch
        if (this.currentTile + 1 >= this.currentBranch.tiles.length &&
            this.currentBranch.branchTo.length > 1) {
            return this.currentBranch.branchData;
        } else {
            return false;
        }
    };


    GameBoard.prototype.getNextBranch = function (choice) {
        console.log("Get next branch ", choice);
        var nextBranch;
        if (this.currentBranch.branchTo.length < 2) {
            console.log("Only one choice, izi");
            nextBranch = this.tiles[this.currentBranch.branchTo[0]];
        } else {
            console.log("two choices");
            this.nextBranchChoice = choice;
            nextBranch = this.tiles[choice.destinationBranch];
        }
        return nextBranch;
    };

    GameBoard.prototype.goToNextTile = function () {
        if (this.getBranching()) {
            this.currentBranch = this.getNextBranch(this.nextBranchChoice);
            this.currentTile = this.nextBranchChoice.destinationTile;
        } else {
            this.currentTile++;
        }
    };

    GameBoard.prototype.generateTiles = function (callback) {
        this.boardReadyCallback = callback;
        for (var branchName in gameBoardTiles) {
            var branchInfo = gameBoardTiles[branchName];
            var branch = this.createBranch(branchName, branchInfo);
            this.tiles[branchName] = branch;
        }
        this.currentBranch = this.tiles.start;
        this.currentTile = 0;

        var self = this;
        setTimeout(function () {
            self.showTracks();
        }, this.tilesCounter * delayBetweenTileApparitions * 1000);
    };

    GameBoard.prototype.createBranch = function (branchName, branchInfo) {
        var branch = {};
        branch.branchTo = branchInfo.branchTo;
        branch.content = branchInfo.content;
        branch.branchData = branchInfo.branchData;
        branch.tiles = [];
        for (var i = 0; i < branch.content.length; i++) {
            branch.tiles.push(this.generateTile(branch.content[i]));
        }
        return branch;
    };

    GameBoard.prototype.generateTile = function (tileInformation) {
        this.tilesCounter++;
        var delay = this.tilesCounter * delayBetweenTileApparitions;
        var tileData = {
            position: this.randomStartPosition(),
            tag: "tile",
            components: {
                renderer: {
                    scale: 0.01,
                    imageName: "tile_" + tileInformation.tileType,
                    animation: {
                        duration: 1,
                        properties: {
                            scale: 0.5,
                            ease: Expo.easeOut,
                            delay: delay
                        }
                    },
                    // label : {
                    //     text: this.getTileText(tileInformation.tileType),
                    //     fillStyle: "white"
                    // }
                },
                boardTile: {
                    tileType: tileInformation.tileType
                }
            }
        };

        var tile = new Entity();
        tile.load(tileData);
        var self = this;
        TweenLite.to(tile.transform.position, 1, {
            delay: delay,
            x: tileInformation.position.x,
            y: tileInformation.position.y,
            onComplete: function () {
                if (tileInformation.tileType != "spawn" && tileInformation.tileType != "malus") {
                    self.generateAnimatedCoin(tile);
                }
            }
        });
        return tile;
    };

    GameBoard.prototype.showTracks = function () {
        var tracks = world.findEntityByName("tracks");
        var self = this;
        TweenLite.to(tracks.getComponent(ComponentType.Renderer), 1, {
            alpha: 1,
            delay: 0.5,
            onComplete: function () {
                self.boardIsReady();
            }
        });
    };

    GameBoard.prototype.boardIsReady = function() {
        this.boardReadyCallback();
    };

    GameBoard.prototype.randomStartPosition = function () {
        var offset = new Vector2(utils.randomInterval(100, 500), utils.randomInterval(100, 500));
        var position = new Vector2();
        if (utils.randomChances(2)) {
            position.x = 0 - offset.x;
        } else {
            position.x = config.canvas.width + offset.x;
        }

        if (utils.randomChances(2)) {
            position.y = 0 - offset.y;
        } else {
            position.y = config.canvas.height + offset.y;
        }
        return position;
    };

    GameBoard.prototype.generateAnimatedCoin = function (tile) {
        var coin = new Entity();
        var coinData = {
            tag: "coin",
            position: {
                x: 0,
                y: -50
            },
            components: {
                renderer: {
                    imageName: "coins_1",
                    scale: 0.5
                },
                spritesheet: {
                    animationKeys: 6,
                    imageName: "coins_",
                    animationMode: "loop"
                }
            }
        };
        coin.load(coinData);
        coin.transform.setParent(tile.transform);
        return coin;
    };

    GameBoard.prototype.getTileText = function (tileType) {
        if (tileType == TileType.Bonus) {
            return "+1";
        } else if (tileType == TileType.Malus) {
            return "-1";
        } else if (tileType == TileType.Event) {
            return "?";
        }
    };

    return GameBoard;
});