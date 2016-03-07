define(["config", "assets/soundLoader", "game/time"], 
function (config, soundLoader, time) {


    var gameStatistics = {
        betAmount: 10,
        collectedCoins: 0,
        currentTurn: 1,
        moneyWon: 0
    };

    gameStatistics.addCoins = function (newCoins) {
        gameStatistics.collectedCoins += newCoins;
        if (gameStatistics.collectedCoins < 0) {
            gameStatistics.collectedCoins = 0;
        }

        this.updateMoneyWon();
    };

    gameStatistics.updateMoneyWon = function () {
        var multiplicator = this.getMoneyMultiplicator();
        gameStatistics.moneyWon = multiplicator * gameStatistics.collectedCoins;
    };

    gameStatistics.getMoneyMultiplicator = function () {
        return Math.floor(gameStatistics.betAmount / 10);
    };

    gameStatistics.nextTurn = function () {
        this.currentTurn++;
    };

    gameStatistics.increaseBet = function () {
        this.betAmount += config.gameplay.betStep;
        this.clampBet();
    };
    gameStatistics.decreaseBet = function () {
        this.betAmount -= config.gameplay.betStep;
        this.clampBet();
    };

    gameStatistics.clampBet = function () {
        this.betAmount = Math.clamp(config.gameplay.minimumBet, config.gameplay.maximumBet, this.betAmount);
    };

    gameStatistics.reset = function () {
        gameStatistics.betAmount = 10;
        gameStatistics.collectedCoins = 0;
        gameStatistics.currentTurn = 1;
        gameStatistics.moneyWon = 0;
    };

    return gameStatistics;
});