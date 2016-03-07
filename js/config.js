define([], function () {
  var config = {
    canvas : {
      containerId : "#gameContainer",
      width : 1280,
      height : 720
    },
    imagesFolder: "img/",
    soundsFolder: "snd/",
    gameplay: {
        turnsPerGame: 5,
        minimumBet: 10,
        maximumBet: 100,
        betStep: 10,
        tiles: {
            coinsPerBonus: 3,
            coinsPerStar: 10,
            coinsPerMalus: 5,
            coinsPerJackpot: 777,
            coinsPerLucky: 100
        }
    },
    debug: false
  };

  return config;
});