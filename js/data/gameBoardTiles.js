define ([], function () {
    var gameBoardTiles = [
        {
            tileType: "bonus",
            position: {
                x: 100,
                y: 100
            }
        },
        {
            tileType: "event",
            position: {
                x: 200,
                y: 100
            }
        },
        {
            tileType: "malus",
            position: {
                x: 300,
                y: 100
            }
        },

    ];

    return gameBoardTiles;
});