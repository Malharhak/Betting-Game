define (["config"], function (config) {
    var gameEntities = {
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
        coinsCounter: {
            position: {
                x: config.canvas.width - 50,
                y: 50
            },
            components: {
                renderer: {
                    imageName: "coins_1",
                    pivot: {x: 0.5, y: 0.5},
                    scale: 0.5,
                    label: {
                        font: "60px 'Lucida Sans Unicode', 'Lucida Grande', sans-serif",
                        fillStyle: "white",
                        text: "0",
                        textAlign: "right",
                        position: {x: -50, y: 0}
                    }
                },
                coinsDisplay: {}
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