/** Inputable component
- Makes an object touchable (mouse clicks, mouse over...) **/
define(["components/Component", "components/ComponentType"], 
function (Component, ComponentType) {
   
    var Inputable = function (parameters) {
        this._addToWorld();
    };
    Inputable.prototype.componentType = ComponentType.Inputable;
    _.extend(Inputable.prototype, Component.prototype);

   return Inputable;
});