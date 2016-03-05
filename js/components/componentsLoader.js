define (["components/Transform", "components/Renderer", "components/ComponentType"], 
function (Transform, Renderer, ComponentType) {
    var componentsLoader = {};

    componentsLoader[ComponentType.Transform] = Transform;
    componentsLoader[ComponentType.Renderer] = Renderer;

    componentsLoader.loadComponentClass = function (componentType) {
        if (typeof this[componentType] == "function") {
            return this[componentType];
        } else {
            throw new Error("Trying to load a non existing component class: " + componentType);
        }
    };

   return componentsLoader;
});