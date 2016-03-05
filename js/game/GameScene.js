define (["entities/world", "entities/Entity"], function (world, Entity) {

    var GameScene = function () {
        this.entitiesList = undefined;
    };

    GameScene.prototype.load = function () {
        world.empty();
        this.loadEntities();
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
        world.render();
        if (typeof this.update == "function") {
            this.render();
        }
    };

    return GameScene;
});