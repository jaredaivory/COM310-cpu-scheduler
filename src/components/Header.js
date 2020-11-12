import React from 'react';

export default function Header() {
    return (
        <div className="container">
            <div className="jumbotron bg-white">
                <h1 className="display-4">CPU Scheduler</h1>
                <p className="lead">SJC COM310 Project</p>
                <hr />
                <p className="p-2">
                    This program allows you to see the gantt chart of{' '}
                    <strong>10</strong> processes.
                </p>
                <p className="p-2">
                    Each process is characterized by a color and their burst
                    times (ms) and insertion times (ms) can be manipulated.
                </p>
                <p className="p-2">
                    You can randomize the values of the process or remove the
                    process from the table using the buttons
                </p>
            </div>
        </div>
    );
}
