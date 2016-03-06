define (["components/Transform", "components/Renderer", "components/ComponentType", "components/Inputable", 
    "components/GameButton", "components/TurnsCounter", "components/BoardTile", "components/Spritesheet",
    "components/Dice", "components/Player"], 
function (Transform, Renderer, ComponentType, Inputable,
    GameButton, TurnsCounter, BoardTile, Spritesheet,
    Dice, Player) {
    var componentsLoader = {};

    componentsLoader[ComponentType.Transform] = Transform;
    componentsLoader[ComponentType.Renderer] = Renderer;
    componentsLoader[ComponentType.Inputable] = Inputable;
    componentsLoader[ComponentType.GameButton] = GameButton;
    componentsLoader[ComponentType.TurnsCounter] = TurnsCounter;
    componentsLoader[ComponentType.BoardTile] = BoardTile;
    componentsLoader[ComponentType.Spritesheet] = Spritesheet;
    componentsLoader[ComponentType.Dice] = Dice;
    componentsLoader[ComponentType.Player] = Player;



    componentsLoader.loadComponentClass = function (componentType) {
        if (typeof this[componentType] == "function") {
            return this[componentType];
        } else {
            throw new Error("Trying to load a non existing component class: " + componentType);
        }
    };

   return componentsLoader;
});