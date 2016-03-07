define(["components/Component", "components/ComponentType", "assets/localizer", "config", "game/gameStatistics"], 
function (Component, ComponentType, localizer, config, gameStatistics) {
    
    var MoneyMadeDisplay = function (parameters) {
        this._addToWorld();
    };
    MoneyMadeDisplay.prototype.componentType = ComponentType.MoneyMadeDisplay;
    _.extend(MoneyMadeDisplay.prototype, Component.prototype);

    MoneyMadeDisplay.prototype.update = function () {
        var labelText = localizer.getString("youEarned") + gameStatistics.moneyWon + localizer.getString("money");
        this.getEntity().getComponent(ComponentType.Renderer).setLabelText(labelText);
    };
    MoneyMadeDisplay.prototype.componentType = ComponentType.MoneyMadeDisplay;
    _.extend(MoneyMadeDisplay.prototype, Component.prototype);

    return MoneyMadeDisplay;
});