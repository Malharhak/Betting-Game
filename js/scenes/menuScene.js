define (["game/GameScene", "data/menuEntities", "entities/world", "game/game", "game/gameStatistics"], 
function (GameScene, menuEntities, world, game, gameStatistics) {
    var menuScene = new GameScene();

    menuScene.entitiesList = menuEntities;

    menuScene.init = function () {
        world.findEntityByName("playButton").addEventListener("mouseUp", function () {
            game.changeScene("game");
        });
        world.findEntityByName("minusButton").addEventListener("mouseUp", function () {
            gameStatistics.decreaseBet();
        });
        world.findEntityByName("plusButton").addEventListener("mouseUp", function () {
            gameStatistics.increaseBet();
        });
    };

    return menuScene;
});