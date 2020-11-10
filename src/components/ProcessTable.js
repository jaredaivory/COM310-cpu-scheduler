import React, { useState, useEffect } from 'react';

import '../styles/processtable.css';

const ProcessTable = ({ processdata: data, addProcess, editProcess }) => {
    const [btnDisabled, setBtnDisabled] = useState(true);

    return (
        <div className="container">
            <div className="card shadow-lg">
                <div className="card-header">Process Table</div>
                <div className="card-body">
                    <div id="process-table" className="table-responsive">
                        <table className="table table-bordered table-sm">
                            <thead>
                                <tr>
                                    <th scope="col">Process Name</th>
                                    <th scope="col-5">Burst Time</th>
                                    <th scope="col-5">Insertion</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className="">
                                {data.map((process) => (
                                    <TableRow
                                        key={process.id}
                                        process={process}
                                        editProcess={editProcess}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="text-center">
                        <button
                            className={`btn btn-info btn-add-process ${
                                data.length === 10 ? 'bg-dark' : ''
                            }`}
                            onClick={addProcess}
                            disabled={data.length === 10 ? true : false}
                        >
                            +
                        </button>
                    </div>
                </div>
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
            <td style={{ backgroundColor: `${process.color}` }}>
                Process {process.name}
            </td>
            <td>{renderEditableValue(bursttime, 'Burst Time')}</td>
            <td>{renderEditableValue(insertion, 'Insertion')}</td>
            <td>
                <div className="btn-group">
                    <button
                        className="btn btn-outline-info"
                        onClick={randomizeValues}
                    >
                        Randomize
                    </button>
                    <button className="btn btn-danger">Delete</button>
                </div>
            </td>
        </tr>
    );
};

export default ProcessTable;
