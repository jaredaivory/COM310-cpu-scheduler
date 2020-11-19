import React, { useState } from 'react';
import ProcessTable from './ProcessTable';
import ButtonBar from './ButtonBar';

import '../styles/app.css';
import Footer from './Footer';
import Header from './Header';
import GanttChart from './GanttChart';
import Algorithms from '../utils/algorithms';
import { DEFAULT_PROCESSES } from '../utils/utils';

const processdata = DEFAULT_PROCESSES.slice(0, 3);
const availableProcesses = DEFAULT_PROCESSES.slice(3);

/*  
    App Component:
        The root component of the appliction
*/

export default function App() {
    const [data, setData] = useState(processdata);
    const [algorithm, setAlgorithm] = useState(Algorithms.FirstComeFirstServe);

    // All of the function defined in this file are to be used by children components
    // and are based through properties
    function addProcess() {
        // adds a process from the available processes stack
        if (availableProcesses) setData([...data, availableProcesses.shift()]);
    }

    function editProcess(editedprocess) {
        // takes a edited process object, finds its index within processdata array and replaces it
        let index = data.findIndex((p) => p.id === editedprocess.id);
        if (index !== -1) {
            data[index] = editedprocess;
            setData([...data]);
        }
    }

    function removeProcess(process) {
        // finds the index of a process and removes it within processdata array
        let index = data.findIndex((p) => p.id === process.id);
        if (index >= 0) {
            availableProcesses.push(process);
            availableProcesses.sort((p0, p1) => (p0.id > p1.id ? 1 : -1));
            setData(data.filter((p) => p.id !== process.id));
        } else {
            console.error(`Error deleting process`, process);
        }
    }

    function handleAlgorithmChange(algorithm) {
        setAlgorithm(algorithm);
    }

    // Returns the rendered JSX
    return (
        <div id="app container">
            <div className="col">
                <Header />
                <ProcessTable
                    className="row"
                    processdata={data}
                    addProcess={addProcess}
                    editProcess={editProcess}
                    removeProcess={removeProcess}
                    algorithm={algorithm}
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
