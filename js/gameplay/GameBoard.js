define (["data/gameBoardTiles", "entities/Entity", "gameplay/TileType"], function (gameBoardTiles, Entity, TileType) {
    var GameBoard = function () {
        this.tiles = [];
    };

    GameBoard.prototype.generateTiles = function () {
        for (var i = 0; i < gameBoardTiles.length; i++) {
            var delay = 0.1 * i;
            this.tiles.push(this.generateTile(gameBoardTiles[i], delay));
        }
    };

    GameBoard.prototype.generateTile = function (tileInformation, delay) {
        var tileData = {
            position: tileInformation.position,
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
                    label : {
                        text: this.getTileText(tileInformation.tileType),
                        fillStyle: "white"
                    }
                },
                boardTile: {
                    tileType: tileInformation.tileType
                }
            }
        };


        var tile = new Entity();
        tile.load(tileData);
        this.generateAnimatedCoin(tile);
        return tile;
    };

    GameBoard.prototype.generateAnimatedCoin = function (tile) {
        var coin = new Entity();
        var coinData = {
            tag: "coin",
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