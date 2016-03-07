define(["components/Component", "entities/world", "components/ComponentType", "assets/localizer", "config", "game/gameStatistics"], 
function (Component, world, ComponentType, localizer, config, gameStatistics) {
    
    var turnsPerGame = config.gameplay.turnsPerGame;

    var BettingDisplay = function (parameters) {
        this._addToWorld();
    };
    BettingDisplay.prototype.componentType = ComponentType.BettingDisplay;
    _.extend(BettingDisplay.prototype, Component.prototype);

    BettingDisplay.prototype.update = function () {
        var labelText = gameStatistics.betAmount + " " + localizer.getString("money");
        this.getEntity().getComponent(ComponentType.Renderer).setLabelText(labelText);
        var betInfo = world.findEntityByName("betInfo");
        var betInfoText = "1         => " + gameStatistics.getMoneyMultiplicator() + localizer.getString("money");
        betInfo.getComponent(ComponentType.Renderer).setLabelText(betInfoText);
    };

    BettingDisplay.prototype.componentType = ComponentType.BettingDisplay;
    _.extend(BettingDisplay.prototype, Component.prototype);

    return BettingDisplay;
});