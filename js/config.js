define([], function () {
  var config = {
    canvas : {
      containerId : "#gameContainer",
      width : 800,
      height : 800
    },
    imagesFolder: "img/",
    gameplay: {
        turnsPerGame: 5,
        minimumBet: 10,
        maximumBet: 100
    }
  };

  return config;
});