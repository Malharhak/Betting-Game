define (["components/Transform", "components/Renderer", "components/ComponentType", "components/Inputable", 
    "components/GameButton", "components/TurnsCounter", "components/BoardTile", "components/Spritesheet"], 
function (Transform, Renderer, ComponentType, Inputable,
    GameButton, TurnsCounter, BoardTile, Spritesheet) {
    var componentsLoader = {};

    componentsLoader[ComponentType.Transform] = Transform;
    componentsLoader[ComponentType.Renderer] = Renderer;
    componentsLoader[ComponentType.Inputable] = Inputable;
    componentsLoader[ComponentType.GameButton] = GameButton;
    componentsLoader[ComponentType.TurnsCounter] = TurnsCounter;
    componentsLoader[ComponentType.BoardTile] = BoardTile;
    componentsLoader[ComponentType.Spritesheet] = Spritesheet;


    componentsLoader.loadComponentClass = function (componentType) {
        if (typeof this[componentType] == "function") {
            return this[componentType];
        } else {
            throw new Error("Trying to load a non existing component class: " + componentType);
        }
    };

   return componentsLoader;
});