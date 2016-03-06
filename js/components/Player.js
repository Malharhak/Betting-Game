define (["components/ComponentType", "components/Component"],
function (ComponentType, Component) {
   
    var Player = function (parameters) {

    };
    Player.prototype.componentType = ComponentType.Player;
    _.extend(Player.prototype, Component.prototype);

    Player.prototype.goToNextTile = function (nextTile, callback) {
        console.log(nextTile);
        var transform = this.getTransform();
        TweenMax.to(transform.position, 2, {
            bezier: [{x: nextTile.transform.position.x, y: nextTile.transform.position.y}],
            ease: Power1.easeInOut,
            onComplete: callback
        });
    };

   return Player; 
});