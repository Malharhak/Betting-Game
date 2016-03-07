define(["howl", "config"], function (howl, config) {
    var SoundLoader = function () {
        howl.Howler.iOSAutoEnable = true;
        if (config.debug) {
            howl.Howler.volume(0.03);
        }
        this.soundsToLoad = 0;
        this.soundsLoaded = 0;
        this.sounds = {};
        var self = this;
        this.muted = false;
    };
    SoundLoader.prototype.setBaseFolder = function (path) {
        this.basePath = path;
    };

    SoundLoader.prototype.pushSounds = function (soundsData) {
        
        var self = this;
        this.soundsToLoad += soundsData.length;
        for (var i = 0; i < soundsData.length; i++) {
            var soundData = soundsData[i];
            this.sounds[soundData.id] = new howl.Howl({
                urls : [this.basePath + soundData.src + ".ogg"],
                autoplay : soundData.autoplay,
                loop : soundData.loop,
                volume : soundData.volume || 1,
                buffer : soundData.buffer
            });
        }
    };

    SoundLoader.prototype.onLoaded = function (evt) {
        this.soundsLoaded++;
    };
    SoundLoader.prototype.isLoaded = function () {
        return true;
    };

    SoundLoader.prototype.mute = function () {
        howl.Howler.mute();
        this.muted = true;
    };
    SoundLoader.prototype.unmute = function () {
        howl.Howler.unmute();
        this.muted = false;
    };
    SoundLoader.prototype.toggleMute = function () {
        if (this.muted) {
            this.unmute();
        } else {
            this.mute();
        }
    };

    SoundLoader.prototype.get = function (id) {
        return this.sounds[id];
    };

    SoundLoader.prototype.getPercentage = function () {
        return 1;
    };

    return new SoundLoader();
});