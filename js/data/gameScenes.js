define (["scenes/menuScene"], function (menuScene) {
    var gameScenes = {
        menu: menuScene
    };

    gameScenes.defaultScene = gameScenes.menu;
    return gameScenes;
});