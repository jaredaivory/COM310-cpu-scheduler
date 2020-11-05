import React, { useState, useEffect } from 'react';

import '../styles/processtable.css';

const ProcessTable = ({ processdata }) => {
    const [data, setData] = useState(processdata);

    function editProcess(process) {
        let index = data.findIndex((p) => p.id === process.id);
        if (index !== -1) {
            data[index] = process;
            setData([...data]);
        }
    }

    return (
        <div className="container">
            <h5>Process Table</h5>
            <table className="table">
                <thead>
                    <tr>
                        <th>Process Name</th>
                        <th>Burst Time</th>
                        <th>Insertion</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((process) => (
                        <TableRow
                            key={process.id}
                            process={process}
                            editProcess={editProcess}
                        />
                    ))}
                </tbody>
            </table>
            <div className="text-center">
                <button
                    className="btn btn-info btn-add-process"
                    onClick={() => console.log(data)}
                >
                    +
                </button>
            </div>
        </div>
    );
};

const TableRow = ({ process, editProcess }) => {
    //state management for the BurstTime and InsertTime input boxes
    const [bursttime, setBursttime] = useState(process.bursttime);
    const [insertion, setInsertion] = useState(process.insertion);

    // Event handler for input changes to the input boxes.
    // Needed to create a central point of truth or state in react projects.
    function handleChange(event) {
        switch (event.target.placeholder) {
            case 'Burst Time':
                setBursttime(event.target.value);
                break;
            case 'Insertion':
                setInsertion(event.target.value);
                break;
            default:
                break;
        }
    }

    //Function that is invoked whenever the variables defined in second argument, [arg1, arg2...] are altered.
    useEffect(() => {
        process['bursttime'] = parseInt(bursttime);
        process['insertion'] = parseInt(insertion);

        editProcess({
            ...process,
        });

        // This eslint-disable is here because the linter is seeing a potential recursion error.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bursttime, insertion]);

    //Returns the stylized input elements in JSX
    function renderEditableValue(value, placeholder) {
        return (
            <div className="input-group">
                <input
                    value={value}
                    type="number"
                    className="form-control"
                    placeholder={placeholder}
                    onChange={(e) => handleChange(e)}
                />
                <div className="input-group-append">
                    <span className="input-group-text" id="basic-addon2">
                        ms
                    </span>
                </div>
            </div>
        );
    }

    // Randomizes the values within the input boxes.
    function randomizeValues() {
        setBursttime(Math.floor(Math.random() * 30));
        setInsertion(Math.floor(Math.random() * 30));
    }

    //Returns the main JSX element that each row in the table will have.
    return (
        <tr key={process.id}>
            <td>Process {process.name}</td>
            <td>{renderEditableValue(bursttime, 'Burst Time')}</td>
            <td>{renderEditableValue(insertion, 'Insertion')}</td>
            <td>
                <button
                    className="btn btn-outline-info"
                    onClick={randomizeValues}
                >
                    Randomize
                </button>
            </td>
            <td style={{ borderLeft: '1px solid grey' }}>
                <button className="btn btn-danger">Delete</button>
            </td>
        </tr>
    );
};

export default ProcessTable;
