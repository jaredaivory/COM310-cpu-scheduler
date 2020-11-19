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

    createGanttNode(start, process, bursttime, end) {
        // Creates a node to be displayed on the gantt chart
        return {
            start: start,
            process: process,
            bursttime: bursttime,
            end: end,
        };
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
        const idleNode = this.createGanttNode(
            starttime,
            idleProcess,
            timeidle,
            endtime
        );
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
    // Sort processes by their priority
    sortProcessesByPriority(processes) {
        return [...processes].sort((p0, p1) =>
            p0.priority <= p1.priority ? 1 : -1
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
        let currProcess = processArr[p];
        let start = time;
        let end = (time += currProcess.bursttime);
        ganttChart.push(
            this.createGanttNode(start, currProcess, currProcess.bursttime, end)
        );
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
            ganttChart.push(
                this.createGanttNode(
                    start,
                    currProcess,
                    currProcess.bursttime,
                    end
                )
            );
            time += currProcess.bursttime;
        }
    }
    this.setGanttChart(ganttChart);
    return ganttChart;
};

const Priority_algorithm = function generateGanttChart(processes) {
    this.setProcesses(processes);
    // Generate the GanttChart for Priority

    // ProcessArr contains the processes ordered in the way they arrived into the waiting queue
    const processArr = this.sortProcessesByInsertion([...processes]);

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
        waitingQueue = this.sortProcessesByPriority(waitingQueue); //Sort the queue
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
            ganttChart.push(
                this.createGanttNode(
                    start,
                    currProcess,
                    currProcess.bursttime,
                    end
                )
            );
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

const Priority = new CPUAlgorithm('priority', 'Priority', Priority_algorithm);

const Algorithms = {
    description:
        'An assortment of algorithms used for the creation of Gantt Charts',
};

Algorithms.FirstComeFirstServe = FirstComeFirstServe;
Algorithms.ShortestJobFirst = ShortestJobFirst;
Algorithms.Priority = Priority;

export { FirstComeFirstServe, ShortestJobFirst, Priority };
export default Algorithms;
