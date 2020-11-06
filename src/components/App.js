import React from 'react';
import ProcessTable from './ProcessTable';
import ButtonBar from './ButtonBar';

import '../styles/app.css';
import Footer from './Footer';
import GanttChart from './GanttChart';

const processdata = [
    { id: 0, name: 'A', bursttime: 10, insertion: 0, color: '#B30000' },
    { id: 1, name: 'B', bursttime: 15, insertion: 5, color: '#009DFF' },
    { id: 2, name: 'C', bursttime: 30, insertion: 3, color: '#FFFC33' },
];

export default function App() {
    return (
        <div id="app container">
            <div className="col">
                <ProcessTable className="row" processdata={processdata} />
                <ButtonBar className="row" />
                <GanttChart className="row" />
                <Footer className="row" />
            </div>
        </div>
    );
}
