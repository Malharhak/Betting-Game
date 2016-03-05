/** The component class contains basic functions that all components will have **/
define (["entities/world", "utils"], 
function (world, utils) {
    var Component = function () {

    };

    Component.prototype.getTransform = function () {
        if (typeof this._entity == "object") {
            return this._entity.transform;
        } else {
            throw new Error("This component is not attached to any entity :(");
        }
    };

    Component.prototype.destroy = function() {
        this._detachFromEntity();
        this._removeFromWorld();
    };

    Component.prototype._addToWorld = function () {
        this._id = utils.guid();
        world.addComponent(this.componentType, this);
    };

    Component.prototype._attachToEntity = function (entity) {
        this._entity = entity;
    };

    Component.prototype._detachFromEntity = function () {
        this._entity = undefined;
    };
    Component.prototype._removeFromWorld = function () {
        world.removeComponent(this.componentType, this);
    };

    return Component;
});