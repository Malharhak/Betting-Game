define (["game/GameScene", "data/endEntities", "entities/world", "game/game", "game/gameStatistics", "assets/soundLoader"], 
function (GameScene, endEntities, world, game, gameStatistics, soundLoader) {
    var endScene = new GameScene();

    endScene.entitiesList = endEntities;

    endScene.init = function () {
        var snd = soundLoader.get("endMusic").play();

        world.findEntityByName("menuButton").addEventListener("mouseUp", function () {
            soundLoader.get("button").play();
            snd.stop();
            gameStatistics.reset();
            game.changeScene("menu");
        });
    };

    return endScene;
});