const ALPHA = 'ABCDEFGHIJ';
function randomColor() {
    let x = function () {
        return Math.floor(Math.random() * 256);
    };
    return 'rgb(' + x() + ',' + x() + ',' + x() + ')';
}

export { randomColor, ALPHA };
