define (["components/Component", "components/ComponentType"], 
function (Component, ComponentType) {
    
    var Spritesheet = function () {
        this._addToWorld();

    };
    Spritesheet.prototype.componentType = ComponentType.Spritesheet;
    _.extend(Spritesheet.prototype, Component.prototype);

    return Spritesheet; 
});