define(["components/Component", "components/ComponentType", "assets/localizer", "config"], 
function (Component, ComponentType, localizer, config) {
    
    var turnsPerGame = config.gameplay.turnsPerGame;

    var CoinsDisplay = function (parameters) {
        this._addToWorld();
        this.currentTurn = 0;
    };
    CoinsDisplay.prototype.componentType = ComponentType.CoinsDisplay;
    _.extend(CoinsDisplay.prototype, Component.prototype);
    
    CoinsDisplay.prototype.update = function () {
        this.getEntity().getComponent(ComponentType.Renderer).setLabelText(gameStatistics.currentPoints);
    };

    CoinsDisplay.prototype.componentType = ComponentType.CoinsDisplay;
    _.extend(CoinsDisplay.prototype, Component.prototype);

    return CoinsDisplay;
});