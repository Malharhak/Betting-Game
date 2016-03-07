define ([], function () {
      var sounds = [    
            {id: "endMusic", src: "endMusic", autoplay: false, loop: true, buffer: false},
            
            {id : "button", src:"button"},
            {id : "coin", src:"coin"},
            {id : "decrease", src:"decrease"},
            {id : "increase", src:"increase"},
            {id : "fail", src:"fail"},
            {id : "star", src:"star"},
            {id : "dice", src:"dice"},
            {id : "diceTick", src:"diceTick"},
            {id : "diceFinish", src:"diceFinish"}
      ];
      return sounds;
});