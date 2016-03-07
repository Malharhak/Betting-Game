define([], function () {
    var gameStatistics = {
        betAmount: 0,
        collectedCoins: 0,
        currentTurn: 1
    };

    gameStatistics.addCoins = function (newCoins) {
        gameStatistics.collectedCoins += newCoins;
        if (gameStatistics.collectedCoins < 0) {
            gameStatistics.collectedCoins = 0;
        }
    };
    gameStatistics.nextTurn = function () {
        this.currentTurn++;
    };

    return gameStatistics;
});