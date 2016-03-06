define (["components/ComponentType", "components/Component"],
function (ComponentType, Component) {
    var Dice = function () {
        this._addToWorld();
    };
    Dice.prototype.componentType = ComponentType.Dice;
    _.extend(Dice.prototype, Component.prototype);

    return Dice;
});