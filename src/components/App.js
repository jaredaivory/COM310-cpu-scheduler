import React, { useState } from 'react';
import ProcessTable from './ProcessTable';
import ButtonBar from './ButtonBar';

import '../styles/app.css';
import Footer from './Footer';
import GanttChart from './GanttChart';
import Algorithms from '../utils/algorithms';
import { DEFAULT_PROCESSES } from '../utils/utils';

const processdata = DEFAULT_PROCESSES.slice(0, 3);
const newProcessStack = DEFAULT_PROCESSES.slice(3);

export default function App() {
    const [data, setData] = useState(processdata);
    const [algorithm, setAlgorithm] = useState(Algorithms.FirstComeFirstServe);

    function addProcess() {
        // Old New Process function that allowed for any amount of processes
        // let newProcess = {
        //     id: data.length,
        //     name: `${ALPHA[data.length]}`,
        //     bursttime: 10,
        //     insertion: 0,
        //     color: `${randomColor()}`,
        // };
        // setData([...data, newProcess]);
        let p = newProcessStack.shift();
        console.log(p);
        setData([...data, p]);
    }
    function editProcess(process) {
        let index = data.findIndex((p) => p.id === process.id);
        if (index !== -1) {
            data[index] = process;
            setData([...data]);
        }
    }

    function deleteProcess(process) {
        newProcessStack.push(process);
        newProcessStack.sort((p0, p1) => (p0.id > p1 ? 1 : -1));
        setData(data.filter((p) => p.id !== process.id));
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
                    deleteProcess={deleteProcess}
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
