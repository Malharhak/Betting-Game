define (["entities/world", "entities/Entity", "graphics/canvas"], 
function (world, Entity, canvas) {

    var GameScene = function () {
        this.entitiesList = undefined;
    }; 

    // Static function for changing the current scene
    GameScene.changeScene = function (newScene) {
        console.log("Change scene");
        GameScene.currentScene = newScene;
        newScene.load();
    };

    GameScene.prototype.load = function () {
        world.empty();
        this.loadEntities();
        if (typeof this.init == "function") {
            this.init();
        }
        world.setActiveScene(this);
    };

    GameScene.prototype.loadEntities = function () {
        if (typeof this.entitiesList == "object") {
            for (var i = 0; i < this.entitiesList.length; i++) {
                var entity = new Entity();
                entity.load(this.entitiesList[i]);
            }
        }
    };

    GameScene.prototype._update = function () {
        world.update();
        if (typeof this.update == "function") {
            this.update();
        }
    };

    GameScene.prototype._render = function () {
        canvas.ctx.fillStyle = "white";
        canvas.ctx.fillRect(0, 0, canvas.width, canvas.height);
        world.render();
        if (typeof this.update == "function") {
            this.render();
        }
    };

    return GameScene;
});