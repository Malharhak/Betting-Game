/** BoardTile component
- Makes an object touchable (mouse clicks, mouse over...) 
- Requires a renderer (to detect clics on the image)
-- Can send mouseOver, mouseClick and mouseOut events to the entity
**/
define(["components/Component", "components/ComponentType"], 
function (Component, ComponentType) {
   
    var BoardTile = function (parameters) {
        this._addToWorld();
        this.tileType = parameters.tileType || "bonus";
    };
    BoardTile.prototype.componentType = ComponentType.BoardTile;
    _.extend(BoardTile.prototype, Component.prototype);

   return BoardTile;
});