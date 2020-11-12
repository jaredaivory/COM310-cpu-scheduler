class CPUAlgorithm {
    constructor(id, name, scheduling_algorithm) {
        this.id = id;
        this.name = name;
        this.generateGanttChart = scheduling_algorithm;
    }

    setProcesses(processes) {
        this.processes = processes;
    }

    setGanttChart(ganttchart) {
        this.ganttChart = ganttchart;
    }

    getWaitTimes() {
        const waittimes = [];
        const bursttimes = [];
        for (let p in this.ganttChart) {
            bursttimes.push(this.ganttChart[p].process.bursttime);
        }

        const turnaroundtimes = this.getTurnaroundTimes();
        for (let i = 0; i < turnaroundtimes.length; i++) {
            waittimes.push(turnaroundtimes[i] - bursttimes[i]);
        }
        return waittimes;
    }

    getTurnaroundTimes() {
        const turnaroundtimes = [];
        for (let p in this.ganttChart) {
            turnaroundtimes.push(
                this.ganttChart[p].end - this.ganttChart[p].process.insertion
            );
        }
        return turnaroundtimes;
    }
    //Sort the processes by the their insertion times
    sortProcessesByInsertion(processes) {
        return [...processes].sort((p0, p1) =>
            p0.insertion >= p1.insertion ? 1 : -1
        );
    }
    // Sort processes by their bursttimes
    sortProcessesByBurstTime(processes) {
        return [...processes].sort((p0, p1) =>
            p0.bursttime >= p1.bursttime ? 1 : -1
        );
    }
}

const FCFS_algorithm = function generateGanttChart(processes) {
    this.setProcesses(processes);
    // Generate the GanttChart for First Come First Serve
    // ProcessArr contains the processes ordered in the way they arrived into the waiting queue
    const processArr = this.sortProcessesByInsertion(processes);

    let time = 0;
    // Simply output into a ganttchart
    const ganttChart = processArr.map((process) => {
        let start = time;
        let end = (time += process.bursttime);
        return { start, process, bursttime: process.bursttime, end };
    });

    this.setGanttChart(ganttChart);
    return ganttChart;
};
const SJF_algorithm = function generateGanttChart(processes) {
    this.setProcesses(processes);
    // Generate the GanttChart for Shortest Job First

    // ProcessArr contains the processes ordered in the way they arrived into the waiting queue
    const processArr = this.sortProcessesByInsertion(processes);

    // GanttChart will contain the processes in the order they will be executed
    //  {   start: starting time,
    //      process: process object,
    //      bursttime: duration of processes while running
    //      end: ending time of the process }
    const ganttChart = [];

    // initial waiting queue state @ 0ms
    let waitingQueue = this.sortProcessesByBurstTime(
        processArr.filter((p) => p.insertion === 0)
    );

    let i = 0;
    // While the queue still has an element
    while (waitingQueue.length !== 0) {
        let currProcess = waitingQueue.shift();
        let start = i;
        let end = currProcess.bursttime + start;

        // push the process with the lowest bursttime to the ganttchart
        ganttChart.push({
            start: start,
            process: currProcess,
            bursttime: currProcess.bursttime,
            end: end,
        });

        // Push all the processes that have been inserted into the waiting queue while
        // the current process was running
        waitingQueue.push(
            ...processArr.filter(
                (p) => p.insertion <= end && p.insertion > start
            )
        );

        // Sort the waiting by burst time
        waitingQueue = this.sortProcessesByBurstTime(waitingQueue);
        i += currProcess.bursttime;
    }
    this.setGanttChart(ganttChart);
    return ganttChart;
};

const FirstComeFirstServe = new CPUAlgorithm(
    'fcfs',
    'First Come First Serve',
    FCFS_algorithm
);
const ShortestJobFirst = new CPUAlgorithm(
    'sjf',
    'Shortest Job First',
    SJF_algorithm
);

const Algorithms = {
    description:
        'An assortment of algorithms used for the creation of Gantt Charts',
};

Algorithms.FirstComeFirstServe = FirstComeFirstServe;
Algorithms.ShortestJobFirst = ShortestJobFirst;

export { FirstComeFirstServe, ShortestJobFirst };
export default Algorithms;
