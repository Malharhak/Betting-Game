define (["game/GameScene", "data/menuEntities", "entities/world", "game/game", "game/gameStatistics", "assets/soundLoader"], 
function (GameScene, menuEntities, world, game, gameStatistics, soundLoader) {
    var menuScene = new GameScene();

    menuScene.entitiesList = menuEntities;

    menuScene.init = function () {
        var music = soundLoader.get("endMusic").play();
        world.findEntityByName("playButton").addEventListener("mouseUp", function () {
            soundLoader.get("button").play();
            music.pause();
            game.changeScene("game");
        });
        world.findEntityByName("minusButton").addEventListener("mouseUp", function () {
            soundLoader.get("decrease").play();
            gameStatistics.decreaseBet();
        });
        world.findEntityByName("plusButton").addEventListener("mouseUp", function () {
            soundLoader.get("increase").play();
            gameStatistics.increaseBet();
        });
    };

    return menuScene;
});