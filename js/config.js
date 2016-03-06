define([], function () {
  var config = {
    canvas : {
      containerId : "#gameContainer",
      width : 1280,
      height : 720
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