const ALPHA = 'ABCDEFGHIJKL';
function randomColor() {
    let x = function () {
        return Math.floor(Math.random() * 256);
    };
    return 'rgb(' + x() + ',' + x() + ',' + x() + ')';
}

//fcfs process
function firstComeFirstServe(processes) {}

export { randomColor, ALPHA };
