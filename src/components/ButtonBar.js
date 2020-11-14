import React from 'react';
import { FirstComeFirstServe, ShortestJobFirst } from '../utils/algorithms';

import '../styles/buttonbar.css';

/*
    ButtonBar Component:
        Serves as location to select the prefered algorithm
*/

export default function ButtonBar({ handleAlgorithmChange }) {
    const buttonOptions = [{ ...FirstComeFirstServe }, { ...ShortestJobFirst }];

    const renderRadioButton = (options) => {
        return (
            <option key={options.id} value={options.id} id={options.id}>
                {options.name}
            </option>
        );
    };

    const handleSelection = (e) => {
        switch (e.target.value) {
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
            <div className="row justify-content-center">
                <select
                    className="text-center custom-select custom-select-lg mb-3 col-sm-4 text-dark"
                    onChange={handleSelection}
                >
                    {buttonOptions.map(renderRadioButton)}
                </select>
            </div>
        </div>
    );
}
