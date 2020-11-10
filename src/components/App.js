import React, { useState } from 'react';
import ProcessTable from './ProcessTable';
import ButtonBar from './ButtonBar';

import '../styles/app.css';
import Footer from './Footer';
import GanttChart from './GanttChart';
import Algorithms from '../utils/algorithms';
import { randomColor, ALPHA } from '../utils/utils';

const processdata = [
    { id: 0, name: 'A', bursttime: 10, insertion: 0, color: '#B30000' },
    { id: 1, name: 'B', bursttime: 15, insertion: 5, color: '#009DFF' },
    { id: 2, name: 'C', bursttime: 30, insertion: 3, color: '#FFFC33' },
];

export default function App() {
    const [data, setData] = useState(processdata);
    const [algorithm, setAlgorithm] = useState(Algorithms.FirstComeFirstServe);

    function addProcess() {
        let newProcess = {
            id: data.length,
            name: `${ALPHA[data.length]}`,
            bursttime: 10,
            insertion: 0,
            color: `${randomColor()}`,
        };
        setData([...data, newProcess]);
    }
    function editProcess(process) {
        let index = data.findIndex((p) => p.id === process.id);
        if (index !== -1) {
            data[index] = process;
            setData([...data]);
        }
    }

    function handleAlgorithmChange(algorithm) {
        setAlgorithm(algorithm);
    }

    return (
        <div id="app container">
            <div className="col">
                <ProcessTable
                    className="row"
                    processdata={data}
                    addProcess={addProcess}
                    editProcess={editProcess}
                />
                <ButtonBar
                    className="row"
                    handleAlgorithmChange={handleAlgorithmChange}
                />
                <GanttChart processdata={data} algorithm={algorithm} />
                <Footer className="row" />
            </div>
        </div>
    );
}
