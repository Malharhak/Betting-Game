define(["data/localizedStrings"], function (localizedStrings) {
    var Localizer = function () {

    };

    Localizer.prototype.getString = function (key) {
        if (typeof this.language != "string") {
            this.getLanguage();
        }
        return this.fetchString(key);
    };

    Localizer.prototype.fetchString = function (key) {
        if (typeof localizedStrings[this.language][key] == "string") {
            return localizedStrings[this.language][key];
        } else {
            return key;
        }
    };

    Localizer.prototype.getLanguage = function () {
        var language = navigator.language || navigator.userLanguage;
        if (typeof localizedStrings[language] == "object") {
            this.language = language;
        } else {
            this.language = "en";
        }
    };

    return new Localizer();
});