import React, { useState } from 'react';
import { FirstComeFirstServe, ShortestJobFirst } from '../utils/algorithms';

import '../styles/buttonbar.css';

/*
    ButtonBar Component:
        Serves as location to select the prefered algorithm
*/

export default function ButtonBar({ handleAlgorithmChange }) {
    const buttonOptions = [{ ...FirstComeFirstServe }, { ...ShortestJobFirst }];
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
                <label className="form-check-label" htmlFor={options.id}>
                    {options.name}
                </label>
            </div>
        );
    };

    const handleSelection = (e) => {
        setSelected(e.target.id);

        switch (e.target.id) {
            case FirstComeFirstServe.id:
                handleAlgorithmChange(FirstComeFirstServe);
                break;
            case ShortestJobFirst.id:
                handleAlgorithmChange(ShortestJobFirst);
                break;
            default:
                break;
        }
    };

    return (
        <div className="container buttonbar">
            <div className="text-center">
                {buttonOptions.map(renderRadioButton)}
            </div>
        </div>
    );
}
