define ([], function () {
    var gameEntities = {
        turnsCounter: {
            position : {
                x: 100,
                y: 60
            },
            components: {
                renderer: {
                    imageName: "turns_box",
                    label: {
                        font: "30px 'Lucida Sans Unicode', 'Lucida Grande', sans-serif",
                        fillStyle: "white",
                        text: "turn"
                    }
                },
                turnsCounter: {},
            }
        }
    };

    return gameEntities;
});