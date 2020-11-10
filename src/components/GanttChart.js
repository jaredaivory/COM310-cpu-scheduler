import React, { useState, useEffect } from 'react';

export default function GanttChart({ processdata, algorithm }) {
    const [ganttChart, setGanttChart] = useState(
        algorithm.generateGanttChart(processdata)
    );

    useEffect(() => {
        setGanttChart(algorithm.generateGanttChart(processdata));
    }, [processdata, algorithm]);

    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    Gantt Chart <strong>{algorithm.name}</strong>
                </div>
                <div className="card-body">{renderGanttChart(ganttChart)}</div>
            </div>
        </div>
    );
}

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
