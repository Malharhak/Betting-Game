define ([], function () {
    var menuEntities = {
        playButton: {
            position : {
                x: 400,
                y: 400
            },
            components: {
                renderer: {
                    imageName: "button_normal",
                    label: {
                        font: "48px 'Lucida Sans Unicode', 'Lucida Grande', sans-serif",
                        fillStyle: "white",
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
    };

    return menuEntities;
});