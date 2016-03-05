define ([], function () {
    var World = function () {
        this.entities = {};
        this.components = {};
    };

    World.prototype.addComponent = function (componentType, component) {
        if (typeof this.components[componentType] !== "object") {
            this.components[componentType] = {};
        }
        this.components[componentType][component._id] = component;
    };

    World.prototype.removeComponent = function (componentType, component) {
        if (typeof this.components[componentType] == "object") {
            delete this.components[componentType][component._id];
        } else {
            throw new Error("Trying to remove a component of unknown type");
        }
    };

    World.prototype.addEntity = function (entity) {
        this.entities[entity._id] = entity;
    };

    World.prototype.removeEntity = function (entity) {
        delete this.entities[entity._id];
    };

    return new World(); 
});