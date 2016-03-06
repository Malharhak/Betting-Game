define (["components/Transform", "components/Renderer", "components/ComponentType", "components/Inputable", 
    "components/GameButton"], 
function (Transform, Renderer, ComponentType, Inputable,
    GameButton) {
    var componentsLoader = {};

    componentsLoader[ComponentType.Transform] = Transform;
    componentsLoader[ComponentType.Renderer] = Renderer;
    componentsLoader[ComponentType.Inputable] = Inputable;
    componentsLoader[ComponentType.GameButton] = GameButton;


    componentsLoader.loadComponentClass = function (componentType) {
        if (typeof this[componentType] == "function") {
            return this[componentType];
        } else {
            throw new Error("Trying to load a non existing component class: " + componentType);
        }
    };

   return componentsLoader;
});