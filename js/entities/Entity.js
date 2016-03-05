/** Entity class
- Base class for all game entities **/
define (["Transform", "world", "utils"], function (Transform, world, utils) {
    var Entity = function () {
        this._id = utils.guid();
        this.transform = new Transform();
        this.components = {};
        world.addEntity(this);
    };

    Entity.prototype.destroy = function () {
        for (var componentName in this.components) {
            this.removeComponent(componentName);
        }
        world.removeEntity(this);
    };

    Entity.prototype.addComponent = function (componentType, component) {
        this.components[componentType] = component;
        component._attachToEntity(this);
    };
    
    Entity.prototype.removeComponent = function (componentName) {
        if (this.hasComponent(componentName)) {
            this.components[componentName].destroy();
            delete this.components[componentName];
        }
    };

    Entity.prototype.getComponent = function (componentType) {
        if (this.hasComponent(componentType)) {
            return this.components[componentName];
        } else {
            throw new Error("The component " + componentName + " does not exist!");
        }
    };

    Entity.prototype.hasComponent = function (componentName) {
        if (typeof this.components[componentName] == "object") {
            return true;
        } else {
            return false;
        }
    };



    return Entity;
});