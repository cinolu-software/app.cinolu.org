import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

const GridExample = () => {

    const [rowData, setRowData] = useState([
        {make: "Tesla", modle: "Model Y", price: 64000, electric: true},
        {make: "Toyota", modle: "Corolla", price: 50000, electric: false},
        {make: "Ford", modle: "Fiesta", price: 45000, electric: true},
    ]);

    const [colDefs, setColDefs] = useState([
        {field: "make"},
        {field: "model"},
        {field: "price"},
        {field: "electric"},
    ]);


    return (
        <div className={'ag-theme-quartz'} style={{ height: 400, width: '100%' }}>
            <AgGridReact rowData={rowData} columnDefs={colDefs} />
        </div>
    );
};

export default GridExample;


