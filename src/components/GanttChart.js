import React, { useState, useEffect } from 'react';

/*  GanttChart Component
        Renders the Gantt Chart
*/

export default function GanttChart({ processdata, algorithm }) {
    const [ganttChart, setGanttChart] = useState([]);

    // useEffect is triggered whenever there is a change in the arguments passed ()=> {function..., [arg0, arg1]}.
    // used for responsiveness whenever the processdata array is changed.
    useEffect(() => {
        setGanttChart(algorithm.generateGanttChart(processdata));
    }, [processdata, algorithm]);

    function getTurnaroundTimes() {
        return algorithm.getTurnaroundTimes();
    }

    function getWaitTimes() {
        return algorithm.getWaitTimes();
    }

    // Returns the rendered JSX
    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    Gantt Chart <strong>{algorithm.name}</strong>
                </div>
                <div className="card-body">
                    {renderGanttChart(ganttChart)}
                    <div className="row justify-content-center">
                        {renderTable(
                            ganttChart,
                            getWaitTimes(),
                            getTurnaroundTimes()
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Return the container that the gantt chart will be inside in JSX
function renderGanttChart(ganttChart) {
    if (ganttChart) {
        return (
            <div className="container ganttchart">
                <div
                    className="row flex-row flex-nowrap no-gutters"
                    style={{ backgroundColor: 'white' }}
                >
                    {ganttChart.map(GanttChartNode)}
                </div>
            </div>
        );
    } else {
        return <div>err</div>;
    }
}

// Returns the divs that the chart will you in its render method
function GanttChartNode(node, index, array) {
    const { process } = node;
    let lastnode = index === array.length - 1;
    return (
        <div className="col-sm-2" key={process.id}>
            <div className="ganttchart-node">
                <div key={process.id}>
                    <div
                        className="text-center"
                        style={{ backgroundColor: process.color }}
                    >
                        {(node.process.id < 0 && 'System') || 'Process'}{' '}
                        {process.name}
                    </div>
                    <div className="text-center">
                        Burst: {process.bursttime}ms
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-between">
                <div>{node.start}</div>
                {lastnode && <div>{node.end}</div>}
            </div>
        </div>
    );
}

function renderTable(ganttChart, waittimes, turnaroundtimes) {
    // console.log('Waittimes', waittimes);
    // console.log('turnaroundtimes', turnaroundtimes);

    let filteredGanttChart = ganttChart.filter((node) => node.process.id > -1);

    function getAverage(array) {
        let total = array.reduce((acc, prev) => {
            return acc + prev;
        }, 0);
        return (total / array.length).toFixed(2);
    }
    return (
        <div id="process-table" className="table-responsive">
            <table
                className="table table-bordered table-striped table-sm
            "
            >
                <thead>
                    <tr>
                        <th scope="col">Process Name</th>
                        <th scope="col">Wait Time</th>
                        <th scope="col">Turnaround Time</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredGanttChart.map((node, index) => {
                        return (
                            <tr key={node.process.id}>
                                <th
                                    scope="row"
                                    style={{
                                        backgroundColor: `${node.process.color}`,
                                    }}
                                >
                                    Process {node.process.name}
                                </th>
                                <td>{waittimes[index]}</td>
                                <td>{turnaroundtimes[index]}</td>
                            </tr>
                        );
                    })}
                    {
                        <tr className="table-info">
                            <th>Averages</th>
                            <th>{getAverage(waittimes)}</th>
                            <th>{getAverage(turnaroundtimes)}</th>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}
