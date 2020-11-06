import React, { useState } from 'react';

import '../styles/buttonbar.css';

export default function ButtonBar() {
    const buttonOptions = [
        { id: 'fcfs', label: 'First Come First Serve' },
        { id: 'sjf', label: 'Shortest Job First' },
    ];
    const [selected, setSelected] = useState(buttonOptions[0].id);

    const renderRadioButton = (options) => {
        return (
            <div className="form-check" key={options.id}>
                <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id={options.id}
                    checked={options.id === selected ? true : false}
                    onChange={handleSelection}
                ></input>
                <label className="form-check-label" for={options.id}>
                    {options.label}
                </label>
            </div>
        );
    };

    const handleSelection = (e) => {
        setSelected(e.target.id);
    };

    return (
        <div className="container buttonbar">
            <div className="text-center">
                {buttonOptions.map(renderRadioButton)}
            </div>
            <button type="button" class="btn btn-info btn-lg btn-block">
                Calculate
            </button>
        </div>
    );
}
