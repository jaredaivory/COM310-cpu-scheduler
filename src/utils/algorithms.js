const FirstComeFirstServe = {
    id: 'fcfs',
    name: 'First Come First Serve',
    generateGanttChart(processes) {
        const processArr = [...processes].sort((p0, p1) =>
            p0.insertion >= p1.insertion ? 1 : -1
        );

        let time = 0;
        const ganttChart = processArr.map((process) => {
            let start = time;
            let end = (time += process.bursttime);
            return { start, process, bursttime: process.bursttime, end };
        });

        return ganttChart;
    },
};
const ShortestJobFirst = {
    id: 'sjf',
    name: 'Shortest Job First',
    generateGanttChart(processes) {
        const processArr = [...processes].sort((p0, p1) =>
            p0.bursttime >= p1.bursttime ? 1 : -1
        );

        let time = 0;
        const ganttChart = processArr.map((process) => {
            let start = time;
            let end = (time += process.bursttime);
            return { start, process, bursttime: process.bursttime, end };
        });

        return ganttChart;
    },
};

const Algorithms = {
    description:
        'An assortment of algorithms used for the creation of Gantt Charts',
};
Algorithms.FirstComeFirstServe = FirstComeFirstServe;
Algorithms.ShortestJobFirst = ShortestJobFirst;
export { FirstComeFirstServe, ShortestJobFirst };
export default Algorithms;
