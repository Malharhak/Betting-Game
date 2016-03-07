define([], function () {
    var ImageLoader = function () {
        this.baseFolder = "img/";
        this.images = {};
        this.imagesToLoad = 0;
        this.imagesLoaded = 0;
    };

    ImageLoader.prototype.setBaseFolder = function (baseFolder) {
        this.baseFolder = baseFolder;
    };

    ImageLoader.prototype.getImage = function (imageName) {
        if (typeof this.images[imageName] == "object") {
            return this.images[imageName].img;
        } else {
            throw new Error("Asked for unknown image: " + imageName);
        }
    };

    ImageLoader.prototype.isLoaded = function () {
        return (this.imagesToLoad === this.imagesLoaded);
    };

    ImageLoader.prototype.getLoadPercentage = function () {
        return this.imagesLoaded / this.imagesToLoad;
    };

    /** Fills the manager with some image. The parameter is a dictionary of image data of the form: {
        "imageName": "imageUrl"
    } **/
    ImageLoader.prototype.addImages = function (imagesList) {
        for (var imageName in imagesList) {
            var imageUrl = imagesList[imageName];
            this.addAnImage(imageName, imageUrl);
        }
    };

    ImageLoader.prototype.addAnImage = function (imageName, imageUrl) {
        var img = new Image();
        this.images[imageName] = {
            img: img,
            url: imageUrl,
            loaded: false
        };
        this.imagesToLoad++;
        this.loadImage(imageName);
    };


    ImageLoader.prototype.loadImage = function (imageIndex) {
        var image = this.images[imageIndex].img;
        var self = this;
        image.addEventListener('load', function (event) {
            self.imageLoaded(imageIndex);
        });
        image.src = this.baseFolder + this.images[imageIndex].url;
    };

    ImageLoader.prototype.imageLoaded = function (imageIndex) {
        this.images[imageIndex].loaded = true;
        this.imagesLoaded++;
    };
    return new ImageLoader();
});
