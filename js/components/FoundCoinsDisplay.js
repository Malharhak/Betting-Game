define(["components/Component", "components/ComponentType", "assets/localizer", "config", "game/gameStatistics"], 
function (Component, ComponentType, localizer, config, gameStatistics) {
    
    var FoundCoinsDisplay = function (parameters) {
        this._addToWorld();
    };
    FoundCoinsDisplay.prototype.componentType = ComponentType.FoundCoinsDisplay;
    _.extend(FoundCoinsDisplay.prototype, Component.prototype);

    FoundCoinsDisplay.prototype.update = function () {
        var labelText = localizer.getString("foundCoins") + gameStatistics.collectedCoins;
        this.getEntity().getComponent(ComponentType.Renderer).setLabelText(labelText);
    };

    FoundCoinsDisplay.prototype.componentType = ComponentType.FoundCoinsDisplay;
    _.extend(FoundCoinsDisplay.prototype, Component.prototype);

    return FoundCoinsDisplay;
});