define (["game/GameScene", "data/menuEntities"], function (GameScene, menuEntities) {
    var menuScene = new GameScene();

    menuScene.entitiesList = menuEntities;

    return menuScene;
});