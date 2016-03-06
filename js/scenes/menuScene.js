define (["game/GameScene", "data/menuEntities", "entities/world", "game/game"], 
function (GameScene, menuEntities, world, game) {
    var menuScene = new GameScene();

    menuScene.entitiesList = menuEntities;

    menuScene.init = function () {
        world.findEntityByName("playButton").addEventListener("mouseUp", function () {
            game.changeScene("game");
        });
    };

    return menuScene;
});