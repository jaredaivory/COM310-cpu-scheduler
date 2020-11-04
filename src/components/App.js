import React from 'react';
import ProcessTable from './ProcessTable';

const processdata = [
    { id: 0, name: 'A', bursttime: 10, insertion: 0 },
    { id: 1, name: 'B', bursttime: 15, insertion: 5 },
    { id: 2, name: 'C', bursttime: 30, insertion: 3 },
];

export default function App() {
    return (
        <div className="">
            <ProcessTable processdata={processdata} />
        </div>
    );
}
