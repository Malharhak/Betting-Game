define ([], function () {
    var gameBoardTiles = {
        start : {
            // Start Tiles
            branchTo: ["branch_1", "branch_2"],
            content: [
                {tileType: "bonus", position: {x: 179, y: 156}},
                {tileType: "event", position: {x: 327, y: 91}},
                {tileType: "malus", position: {x: 503, y: 116}},
                {tileType: "malus", position: {x: 657, y: 72}},
                {tileType: "malus", position: {x: 764, y: 204}},
                {tileType: "malus", position: {x: 895, y: 88}},
                {tileType: "malus", position: {x: 1000, y: 194}}
            ]
        },
        branch_1: {
            content: [
                {tileType: "malus", position: {x: 1074, y: 50}},

            ]
        },
        branch_2: {
            content: [
                {tileType: "malus", position: {x: 923, y: 328}},

            ]
        }
    };

    return gameBoardTiles;
});