define (["components/ComponentType", "components/Component", "game/time", "utils"],
function (ComponentType, Component, time, utils) {

    var diceDuration = 4;
    var minSpeed = 0.4;
    var maxSpeed = 0.005;

    var Dice = function (parameters) {
        this._addToWorld();

        this.imageName = parameters.imageName;
        this.diceResultCallback = parameters.resultCallback;
        this.diceSpeed = maxSpeed;
        this.currentFace = 1;
        this.launched = false;
        this.finished = false;
    };
    Dice.prototype.componentType = ComponentType.Dice;
    _.extend(Dice.prototype, Component.prototype);

    Dice.prototype.launch = function () {
        this.launchTime = time.time;
        this.lastChange = time.time;
        this.launched = true;
        TweenLite.to(this, diceDuration, {
            diceSpeed: minSpeed,
            ease: Circ.easeInOut
        });
    };

    Dice.prototype.mouseUp = function () {
        if (!this.launched && !this.finished) {
            this.launch();
        }
    };

    Dice.prototype.update = function () {
        if (this.launched) {
            this.updateDiceFace();
            if (time.time - this.launchTime > diceDuration) {
                this.finish();
            }
        }
    };

    Dice.prototype.updateDiceFace = function () {
        // The time between dice face changes decreases over time
        if (time.time - this.lastChange > this.diceSpeed) {
            this.changeFace();
        }
    };

    Dice.prototype.changeFace = function () {
        this.currentFace = this.chooseRandomFace();
        this.lastChange = time.time;
        this.getEntity().getComponent(ComponentType.Renderer).changeImage(this.imageName + this.currentFace);
    };


    Dice.prototype.chooseRandomFace = function () {
        var face = Math.floor(utils.randomInterval(1, 7));
        if (face == this.currentFace) {
            return this.chooseRandomFace();
        }
        return face;
    };

    Dice.prototype.finish = function () {
        this.launched = false;
        this.finished = true;
        this.blink();
    };

    Dice.prototype.blink = function () {
        var renderer = this.getEntity().getComponent(ComponentType.Renderer);
        var self = this;
        renderer.alpha = 0;
        TweenMax.to(renderer, 0.7, {
            alpha: 1,
            repeat: 1,
            yoyo: false,
            repeatDelay: 0.3,
            ease: Expo.easeOut,
            onComplete: function () {
                setTimeout(function () {
                    self.sendResult();
                }, 1000);
            }
        });
    };

    Dice.prototype.sendResult = function () {
        this.diceResultCallback(this.currentFace);
        this.getEntity().destroy();
    };

    return Dice;
});