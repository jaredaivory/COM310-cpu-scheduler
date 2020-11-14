class CPUAlgorithm {
    constructor(id, name, scheduling_algorithm) {
        this.id = id;
        this.name = name;
        this.generateGanttChart = scheduling_algorithm;
        this.nodeID = -1;
    }

    setProcesses(processes) {
        this.processes = processes;
    }

    setGanttChart(ganttchart) {
        this.ganttChart = ganttchart;
    }

    createNodeID() {
        return this.nodeID--;
    }

    getWaitTimes() {
        const waittimes = [];
        const bursttimes = [];

        // Wait times can be determined by subtracting process bursttime from turnaround time
        for (let p in this.ganttChart) {
            if (this.ganttChart[p].process.id >= 0) {
                bursttimes.push(this.ganttChart[p].bursttime);
            }
        }
        const turnaroundtimes = this.getTurnaroundTimes();
        for (let i = 0; i < turnaroundtimes.length; i++) {
            waittimes.push(turnaroundtimes[i] - bursttimes[i]);
        }
        return waittimes;
    }

    getTurnaroundTimes() {
        // Turnaround time is the processes end time - the insertion time
        const turnaroundtimes = [];
        for (let p in this.ganttChart) {
            if (this.ganttChart[p].process.id >= 0) {
                turnaroundtimes.push(
                    this.ganttChart[p].end -
                        this.ganttChart[p].process.insertion
                );
            }
        }
        return turnaroundtimes;
    }

    createIdleProcess(starttime, timeidle, endtime) {
        // Return a ganttchart process for when the system is idle
        const idleProcess = {
            id: this.createNodeID(),
            name: 'Idle',
            bursttime: timeidle,
            insertion: starttime,
            color: '#808080',
        };
        const idleNode = {
            start: starttime,
            process: idleProcess,
            bursttime: timeidle,
            end: endtime,
        };
        return idleNode;
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
    // ProcessArr contains the processes ordered isn the way they arrived into the waiting queue
    const processArr = this.sortProcessesByInsertion([...processes]);

    let time = 0;
    // Simply output into a ganttchart
    // GanttChart will contain the processes in the order they will be executed
    //  {   start: starting time,
    //      process: process object,
    //      bursttime: duration of processes while running
    //      end: ending time of the process }
    const ganttChart = [];
    for (let p in processArr) {
        if (processArr[p].insertion > time) {
            // Create Idle Process
            let idlebursttime = processArr[p].insertion - time;
            ganttChart.push(
                this.createIdleProcess(
                    time,
                    idlebursttime,
                    time + idlebursttime
                )
            );
            time += idlebursttime;
        }
        let process = processArr[p];
        let start = time;
        let end = (time += process.bursttime);
        ganttChart.push({ start, process, bursttime: process.bursttime, end });
    }
    this.setGanttChart(ganttChart);
    return ganttChart;
};

const SJF_algorithm = function generateGanttChart(processes) {
    this.setProcesses(processes);
    // Generate the GanttChart for Shortest Job First

    // ProcessArr contains the processes ordered in the way they arrived into the waiting queue
    const processArr = this.sortProcessesByInsertion([...processes]);

    // GanttChart will contain the processes in the order they will be executed
    //  {   start: starting time,
    //      process: process object,
    //      bursttime: duration of processes while running
    //      end: ending time of the process }
    const ganttChart = [];

    let waitingQueue = [];

    // function to remove from process array and add to waitingQueue before given time
    function addToWaitingQueue(time) {
        let count = 0;
        for (let p in processArr) {
            if (processArr[p].insertion <= time) {
                waitingQueue.push(processArr[p]);
                count++;
            }
        }
        processArr.splice(0, count);
    }

    let time = 0;
    // Loop until all processes are added to the gantt chart
    while (processArr.length !== 0 || waitingQueue.length !== 0) {
        addToWaitingQueue(time);
        waitingQueue = this.sortProcessesByBurstTime(waitingQueue);
        if (waitingQueue.length === 0) {
            let idlebursttime = processArr[0].insertion - time;
            ganttChart.push(
                this.createIdleProcess(
                    time,
                    idlebursttime,
                    time + idlebursttime
                )
            );
            time += idlebursttime;
        } else {
            let currProcess = waitingQueue.shift();

            let start = time;
            let end = currProcess.bursttime + start;
            // push the process with the lowest bursttime to the ganttchart
            ganttChart.push({
                start: start,
                process: currProcess,
                bursttime: currProcess.bursttime,
                end: end,
            });
            time += currProcess.bursttime;
        }
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
