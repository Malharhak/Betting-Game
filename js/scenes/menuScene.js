define (["game/GameScene", "data/menuEntities", "entities/world", "game/game"], 
function (GameScene, menuEntities, world, game) {
    var menuScene = new GameScene();

    menuScene.entitiesList = menuEntities;

    menuScene.init = function () {
        world.findEntityByName("playButton").addEventListener("mouseUp", function () {
            console.log("Mouse up on play button");
            game.changeScene("game");
        });
    };

    return menuScene;
});