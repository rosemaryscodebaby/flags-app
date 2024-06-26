import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { fetchCountries } from '../services/countryService';
import SearchBar from './SearchBar';  // Import the SearchBar component

const Flags = () => {
    const [rowData, setRowData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [query, setQuery] = useState('');

    useEffect(() => {
        const getCountries = async () => {
            const countries = await fetchCountries();
            setRowData(countries.map(country => ({
                ...country,
                flagUrl: country.flags.png,
                searchKey: `${country.name.common} ${country.population}`.toLowerCase()
            })));
        };
        getCountries();
    }, []);

    useEffect(() => {
        setFilteredData(rowData.filter(country => country.searchKey.includes(query.toLowerCase())));
    }, [query, rowData]);

    const columns = [
        {
            headerName: "Flag",
            field: "flagUrl",
            cellRenderer: params => <img src={params.value} alt="flag" style={{ width: '32px', height: '24px' }} />
        },
        { headerName: "Country", field: "name.common" },
        { headerName: "Population", field: "population" },
    ];

    return (
        <div className="container mx-auto p-4">
            <SearchBar query={query} setQuery={setQuery} />
            <div className="ag-theme-alpine" style={{ height: '400px', width: '100%' }}>
                <AgGridReact
                    columnDefs={columns}
                    rowData={filteredData}
                    domLayout='autoHeight'
                />
            </div>
        </div>
    );
};

export default Flags;
