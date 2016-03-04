define (["requestAnimationFrame"], function (requestAnimationFrame) {
    var gameloop = {};

    function loop () {

        requestAnimationFrame(loop);
    };

    gameloop.init = function () {
        loop();
    };

    return gameloop;
});