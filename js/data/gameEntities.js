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
        },
        board: {
            position: {
                x: 0,
                y: 0
            },
            components: {
                renderer: {
                    imageName: "board",
                    pivot: {x: 0, y: 0}
                }
            }
        },
        tracks: {
            position: {x: 0, y: 0},
            components: {
                renderer: {
                    imageName: "tracks",
                    pivot: {x: 0, y: 0},
                    alpha: 0
                }
            }
        }
    };

    return gameEntities;
});