define (["components/ComponentType", "components/Component"],
function (ComponentType, Component) {
   
   var Player = function (parameters) {

   };
   Player.prototype.componentType = ComponentType.Player;
   _.extend(Player.prototype, Component.prototype);

   return Player; 
});