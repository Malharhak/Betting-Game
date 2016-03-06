/** Entity class
- Base class for all game entities **/
define (["components/Transform", "entities/world", "utils", "components/componentsLoader", "maths/Vector2"], 
function (Transform, world, utils, componentsLoader, Vector2) {
    var Entity = function (name) {
        this._id = utils.guid();
        this.name = name || this._id;
        this.transform = new Transform(this);
        this.components = {};
        this.listeners = {};
        world.addEntity(this);
    };

    Entity.prototype.sendSceneEvent = function (eventName) {
        if (typeof world.getActiveScene()[eventName] == "function") {
            world.getActiveScene()[eventName]();
        }
    };

    Entity.prototype.load = function (data) {
        for (var componentType in data.components) {
            var ComponentClass = componentsLoader.loadComponentClass(componentType);
            var component = new ComponentClass(data.components[componentType]);
            this.addComponent(componentType, component);
        }
        if (typeof data.position == "object") {
            this.transform.position = new Vector2(data.position);
        }
        if (typeof data.name == "string") {
            this.name = data.name;
        }
        if (typeof data.tag == "string") {
            this.tag = data.tag;
        }
    };

    Entity.prototype.addEventListener = function (eventName, callback) {
        if (typeof this.listeners[eventName] != "object") {
            this.listeners[eventName] = [];
        }
        this.listeners[eventName].push(callback);
    };

    Entity.prototype.sendMessage = function (eventName) {
        for (var i in this.components) {
            if (typeof this.components[i][eventName] == "function") {
                this.components[i][eventName]();
            }
        }
        if (typeof this.listeners[eventName] == "object") {
            for (var listenersCounter = 0; listenersCounter < this.listeners[eventName].length; listenersCounter++) {
                this.listeners[eventName][listenersCounter]();
            }
        }
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
            return this.components[componentType];
        } else {
            throw new Error("The component " + componentType + " does not exist!");
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