define ([], function () {
    var menuEntities = [
        {
            position : {
                x: 400,
                y: 400
            },
            name: "playButton",
            components: {
                renderer: {
                    imageName: "button_normal",
                    label: {
                        font: "48px Arial",
                        fillStyle: "green",
                        textAlign: "center",
                        position : {x: 0, y: 0},
                        text: "play"
                    }
                },
                inputable: {},
                gameButton: {
                    normalImage: "button_normal",
                    pressedImage: "button_pressed",
                    overImage: "button_over"
                }
            }
        }
    ];

    return menuEntities;
});