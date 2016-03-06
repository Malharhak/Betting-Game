define(["components/Component", "components/ComponentType", "assets/localizer", "config"], 
function (Component, ComponentType, localizer, config) {
    
    var turnsPerGame = config.gameplay.turnsPerGame;

    var TurnsCounter = function (parameters) {
        this.currentTurn = 0;
    };

    TurnsCounter.prototype.update = function () {
        var labelText = localizer.getString("turn") + " " + this.currentTurn + "/" + turnsPerGame;
        this.getEntity().getComponent(ComponentType.Renderer).setLabelText(labelText);
    };

    TurnsCounter.prototype.componentType = ComponentType.TurnsCounter;
    _.extend(TurnsCounter.prototype, Component.prototype);

    return TurnsCounter;
});