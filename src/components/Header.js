import React from 'react';

import '../styles/header.css';

export default function Header() {
    return (
        <div className="container">
            <div className="jumbotron bg-white">
                <h1 className="display-4">CPU Scheduler</h1>
                <p className="lead">SJC COM310 Project</p>
                <hr />
                <h4 className="p-2">Assumptions</h4>
                <p className="p-2">
                    This program allows you to see the gantt chart of{' '}
                    <strong>10</strong> processes.
                </p>
                <p className="p-2">
                    Each process is characterized by a color and their{' '}
                    <strong>burst times (ms)</strong> and{' '}
                    <strong>insertion times (ms)</strong>
                    can be manipulated.
                </p>
                <p className="p-2">
                    You can randomize the values of the process or remove the
                    process from the table using the buttons.
                </p>
                <p className="p-2">
                    These randomized values are between <strong>0ms</strong> and{' '}
                    <strong>50ms</strong>
                </p>
                <p className="p-2">
                    The wait times and turnaround times are calculated and
                    displayed in the bottom most table.
                </p>
            </div>
        </div>
    );
}
