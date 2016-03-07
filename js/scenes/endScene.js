define (["game/GameScene", "data/endEntities", "entities/world", "game/game", "game/gameStatistics"], 
function (GameScene, endEntities, world, game, gameStatistics) {
    var endScene = new GameScene();

    endScene.entitiesList = endEntities;

    endScene.init = function () {
        world.findEntityByName("menuButton").addEventListener("mouseUp", function () {
            gameStatistics.reset();
            game.changeScene("menu");
        });
    };

    return endScene;
});