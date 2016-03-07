define (["components/Transform", "components/Renderer", "components/ComponentType", "components/Inputable", 
    "components/GameButton", "components/TurnsCounter", "components/BoardTile", "components/Spritesheet",
    "components/Dice", "components/Player", "components/CoinsDisplay", "components/BettingDisplay",
    "components/FoundCoinsDisplay", "components/MoneyMadeDisplay"], 
function (Transform, Renderer, ComponentType, Inputable,
    GameButton, TurnsCounter, BoardTile, Spritesheet,
    Dice, Player, CoinsDisplay, BettingDisplay,
    FoundCoinsDisplay, MoneyMadeDisplay) {
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
    componentsLoader[ComponentType.CoinsDisplay] = CoinsDisplay;
    componentsLoader[ComponentType.BettingDisplay] = BettingDisplay;
    componentsLoader[ComponentType.FoundCoinsDisplay] = FoundCoinsDisplay;
    componentsLoader[ComponentType.MoneyMadeDisplay] = MoneyMadeDisplay;



    componentsLoader.loadComponentClass = function (componentType) {
        if (typeof this[componentType] == "function") {
            return this[componentType];
        } else {
            throw new Error("Trying to load a non existing component class: " + componentType);
        }
    };

   return componentsLoader;
});