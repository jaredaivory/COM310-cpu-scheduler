import React, { useState, useEffect } from 'react';

/*  GanttChart Component
        Renders the Gantt Chart
*/

export default function GanttChart({ processdata, algorithm }) {
    const [ganttChart, setGanttChart] = useState([]);

    // useEffect is triggered whenever there is a change in the arguments passed ()=> {function..., [arg0, arg1]}.
    // used for responsiveness whenever the processdata array is changed.
    useEffect(() => {
        console.log(algorithm);
        setGanttChart(algorithm.generateGanttChart(processdata));
    }, [processdata, algorithm]);

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
                        <div className="col-md-4">
                            Average Wait Time:
                            {}
                        </div>
                        <div className="col-md-4">
                            Average Turnover Time:
                            {}
                        </div>
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
function GanttChartNode(node) {
    const { process } = node;
    return (
        <div className="col-sm-2" key={process.id}>
            <div className="ganttchart-node">
                <div key={process.id}>
                    <div
                        className="text-center"
                        style={{ backgroundColor: process.color }}
                    >
                        Process {process.name}
                    </div>
                    <div className="text-center">
                        Burst: {process.bursttime}ms
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-between">
                <div>{node.start}</div>
            </div>
        </div>
    );
}
