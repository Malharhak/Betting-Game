define (["config"], function (config) {
    var menuEntities = {
        background: {
            position: {x: 0, y: 0},
            components: {
                renderer: {
                    imageName: "board",
                    pivot: {x: 0, y: 0}
                }
            }
        },
        title: {
            position: {x: config.canvas.width / 2, y: 0},
            components: {
                renderer: {
                    imageName: "menu_title",
                    position: {x: 0, y: -100},
                    animation: {
                        target: ["position"],
                        duration: 1,
                        properties: {
                            y: 150,
                            ease: Back.easeOut,
                            delay: 0.2
                        }
                    }
                }
            }
        },
        playButton: {
            position : {
                x: config.canvas.width / 2,
                y: config.canvas.height / 2
            },
            components: {
                renderer: {
                    imageName: "button_normal",
                    scale: 0.001,
                    label: {
                        font: "48px 'Lucida Sans Unicode', 'Lucida Grande', sans-serif",
                        fillStyle: "white",
                        textAlign: "center",
                        position : {x: 0, y: 0},
                        text: "play"
                    },
                    animation : {
                        duration: 0.5,
                        properties: {
                            scale: 1,
                            ease: Expo.easeOut,
                            delay: 1
                        }
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