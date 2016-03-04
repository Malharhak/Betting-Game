define (["Transform"], function (Transform) {
    var Entity = function () {
        this.transform = new Transform();
    };

    Entity.prototype.addComponent = function (componentName, component) {
        self[componentName] = component;
    };

    Entity.prototype.getComponent = function (componentName) {
        if (typeof self[componentName] == "object") {
            return self[componentName];
        } else {
            throw new Error("The component " + componentName + " does not exist!");
        }
    };

    return Entity;
});