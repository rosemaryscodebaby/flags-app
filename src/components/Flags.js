import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { fetchCountries } from '../services/countryService';
import SearchBar from './SearchBar';
import formatCountryDetails from '../utils/util';
import CONSTANTS from '../data/constants';


const Flags = () => {
    const [rowData, setRowData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedCountryDetails, setSelectedCountryDetails] = useState(null);
    const [query, setQuery] = useState('');

    useEffect(() => {
        const getCountries = async () => {
            const countries = await fetchCountries();
            setRowData(countries.map(country => ({
                ...country,
                flagUrl: country.flags.png,
                languages: Object.values(country.languages || {}).join(', '),
                currencies: Object.values(country.currencies || {}).map(cur => `${cur.name} (${cur.symbol})`).join(', '),
                searchKey: `${country.name.common} ${country.population} ${Object.values(country.languages || {}).join(' ')} ${Object.values(country.currencies || {}).map(cur => cur.name).join(' ')}`.toLowerCase()
            })));
        };
        getCountries();
    }, []);

    useEffect(() => {
        setFilteredData(rowData.filter(country => country.searchKey.includes(query.toLowerCase())));
    }, [query, rowData]);

    const columns = [
        { headerName: "Flag", field: "flagUrl", cellRenderer: params => <img src={params.value} alt="flag" style={{ width: '32px', height: '24px' }} /> },
        { headerName: "Country", field: "name.common" },
        { headerName: "Population", field: "population" },
        { headerName: "Languages", field: "languages" },
        { headerName: "Currencies", field: "currencies" }
    ];

    const onRowClicked = async event => {
        const countryName = event.data.name.common;
        try {
            const response = await fetch(`${CONSTANTS.RESTCOUNTRIES_BASE_URL}/name/${countryName}`);
            const data = await response.json();
            const details = formatCountryDetails(data);
            setSelectedCountryDetails(details);
        } catch (error) {
            console.error('Error fetching country details:', error);
        }
    };

    return (
        <div className="container mx-auto p-4 flex">
            <div className="flex-grow">
                <SearchBar query={query} setQuery={setQuery} />
                <div className="ag-theme-alpine" style={{ height: '400px', width: '100%' }}>
                    <AgGridReact
                        columnDefs={columns}
                        rowData={filteredData}
                        domLayout='autoHeight'
                        onRowClicked={onRowClicked}
                    />
                </div>
            </div>
            {selectedCountryDetails ? (
                <div className="flex-none w-96 bg-white p-5 shadow-lg z-10">
                    <div className="text-lg">
                        {selectedCountryDetails.text}
                    </div>
                </div>
            ) : (
                <div className="flex-none w-96 bg-white p-5 shadow-lg z-10">
                    No country selected
                </div>
            )}
        </div>
    );

};

export default Flags;
