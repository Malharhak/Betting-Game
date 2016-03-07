define ([], function () {
    var gameBoardTiles = {
        start : {
            // Start Tiles
            branchTo: ["branch_1", "branch_2"],
            branchData: [
                {
                    destinationBranch: "branch_1",
                    destinationTile: 0,
                    position: {x: 1056, y: 136},
                    angle: -Math.PI / 2
                },
                {
                    destinationBranch: "branch_2",
                    destinationTile: 0,
                    position: {x: 989, y: 274},
                    angle: Math.PI / 2
                }
            ],
            content: [
                {tileType: "spawn", position: {x: 179, y: 156}},
                {tileType: "bonus", position: {x: 327, y: 91}},
                {tileType: "bonus", position: {x: 503, y: 116}},
                {tileType: "malus", position: {x: 657, y: 72}},
                {tileType: "bonus", position: {x: 764, y: 204}},
                {tileType: "death", position: {x: 895, y: 88}},
                {tileType: "star", position: {x: 1000, y: 194}}
            ]
        },
        branch_1: {
            branchTo: ["branch_2"],
            branchData: [
                {
                    destinationBranch: "branch_2",
                    destinationTile: 0,
                    position: {x: 0, y: 0},
                    angle: 0
                }
            ],
            content: [
                {tileType: "malus", position: {x: 1074, y: 50}},
                {tileType: "malus", position: {x: 1183, y: 146}},
                {tileType: "bonus", position: {x: 1168, y: 270}},
                {tileType: "neutral", position: {x: 1225, y: 397}},
                {tileType: "malus", position: {x: 1170, y: 527}},
                {tileType: "malus", position: {x: 1075, y: 408}},
            ]
        },
        branch_2: {
            branchTo: ["branch_final", "branch_3", "start"],
            branchData: [
                {
                    destinationBranch: "branch_final",
                    destinationTile: 0,
                    position: {x: 195, y: 325},
                    angle: 0
                },
                {
                    destinationBranch: "branch_3",
                    destinationTile: Math.PI / 2,
                    position: {x: 130, y: 386},
                    angle: Math.PI / 2
                },
                {
                    destinationBranch: "start",
                    destinationTile: 0,
                    position: {x: 87, y: 252},
                    angle: -Math.PI / 2
                }
            ],
            content: [
                {tileType: "neutral", position: {x: 923, y: 328}},
                {tileType: "bonus", position: {x: 780, y: 346}},
                {tileType: "malus", position: {x: 635, y: 267}},
                {tileType: "neutral", position: {x: 476, y: 284}},
                {tileType: "star", position: {x: 356, y: 201}},
                {tileType: "malus", position: {x: 112, y: 320}},

            ]
        },
        branch_3: {
            branchTo: ["branch_final"],
            branchData: [
                {
                    destinationBranch: "branch_final",
                    destinationTile: 1,
                    position: {x: 519, y: 555},
                    angle: - 3 * Math.PI / 4 
                }
            ],
            content: [
                {tileType: "neutral", position: {x: 121, y: 456}},
                {tileType: "malus", position: {x: 248, y: 502}},
                {tileType: "death", position: {x: 94, y: 592}},
                {tileType: "neutral", position: {x: 281, y: 635}},
                {tileType: "death", position: {x: 392, y: 545}},
                {tileType: "malus", position: {x: 462, y: 658}},
                {tileType: "lucky", position: {x: 596, y: 591}},

            ]
        },
        branch_final: {
            branchTo: ["start"],
            content: [
                {tileType: "bonus", position: {x: 289, y: 355}},
                {tileType: "malus", position: {x: 402, y: 434}},
                {tileType: "death", position: {x: 552, y: 377}},
                {tileType: "bonus", position: {x: 682, y: 382}},
                {tileType: "malus", position: {x: 575, y: 483}},
                {tileType: "malus", position: {x: 700, y: 500}},
                {tileType: "bonus", position: {x: 643, y: 675}},
                {tileType: "star", position: {x: 764, y: 585}},
                {tileType: "malus", position: {x: 829, y: 676}},
                {tileType: "bonus", position: {x: 949, y: 666}},
                {tileType: "malus", position: {x: 1072, y: 676}},
                {tileType: "malus", position: {x: 1207, y: 667}},
                {tileType: "death", position: {x: 1242, y: 581}},
                {tileType: "star", position: {x: 1070, y: 552}},
                {tileType: "bonus", position: {x: 973, y: 461}},
                {tileType: "star", position: {x: 835, y: 438}},
                {tileType: "star", position: {x: 869, y: 551}},
                {tileType: "jackpot", position: {x: 968, y: 583}},


            ]
        }
    };

    return gameBoardTiles;
});