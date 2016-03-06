define(["components/Component", "components/ComponentType", "assets/localizer", "config", "game/gameStatistics"], 
function (Component, ComponentType, localizer, config, gameStatistics) {
    
    var turnsPerGame = config.gameplay.turnsPerGame;

    var TurnsCounter = function (parameters) {
        this._addToWorld();
    };
    TurnsCounter.prototype.componentType = ComponentType.TurnsCounter;
    _.extend(TurnsCounter.prototype, Component.prototype);

    TurnsCounter.prototype.update = function () {
        var labelText = localizer.getString("turn") + " " + gameStatistics.currentTurn + "/" + turnsPerGame;
        this.getEntity().getComponent(ComponentType.Renderer).setLabelText(labelText);
    };

    TurnsCounter.prototype.componentType = ComponentType.TurnsCounter;
    _.extend(TurnsCounter.prototype, Component.prototype);

    return TurnsCounter;
});