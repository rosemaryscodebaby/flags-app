import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Modal from 'react-modal';
import { fetchCountries } from '../services/countryService';
import SearchBar from './SearchBar';
import { formatCountryDetails, manageFavorites } from '../utils/util';
import CONSTANTS from '../data/constants';

Modal.setAppElement('#root');

const Flags = () => {
    const [rowData, setRowData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedCountryDetails, setSelectedCountryDetails] = useState(null);
    const [query, setQuery] = useState('');
    const [favorites, setFavorites] = useState(new Set(JSON.parse(localStorage.getItem('favs') || '[]')));
    const [favoritesModalOpen, setFavoritesModalOpen] = useState(false);

    useEffect(() => {
        const loadCountries = async () => {
            const countries = await fetchCountries();
            setRowData(countries.map(country => ({
                ...country,
                flagUrl: country.flags.png,
                languages: Object.values(country.languages || {}).join(', '),
                currencies: Object.values(country.currencies || {}).map(cur => `${cur.name} (${cur.symbol})`).join(', '),
                searchKey: `${country.name.common} ${country.population} ${Object.values(country.languages || {}).join(' ')} ${Object.values(country.currencies || {}).map(cur => cur.name).join(' ')}`.toLowerCase()
            })));
        };
        loadCountries();
    }, []);

    useEffect(() => {
        setFilteredData(rowData.filter(country => country.searchKey.toLowerCase().includes(query.toLowerCase())));
    }, [query, rowData]);

    const toggleFavorite = (countryName) => {
        manageFavorites(countryName);
        setFavorites(new Set(JSON.parse(localStorage.getItem('favs'))));
    };

    const removeAllFavorites = () => {
        localStorage.setItem('favs', JSON.stringify([]));
        setFavorites(new Set());
    };

    const onRowClicked = async event => {
        const countryName = event.data.name.common;
        toggleFavorite(countryName);

        try {
            const details = await formatCountryDetails(await fetch(`${CONSTANTS.RESTCOUNTRIES_BASE_URL}/name/${countryName}`).then(res => res.json()));
            setSelectedCountryDetails(details);
        } catch (error) {
            console.error('Error fetching country details:', error);
        }
    };

    const openFavoritesModal = () => {
        setSelectedCountryDetails(null);
        setFavoritesModalOpen(true);
    };

    const closeFavoritesModal = () => {
        setFavoritesModalOpen(false);
    };

    const columns = [
        {
            headerName: "Fav",
            field: "fav",
            width: 50,
            cellRendererFramework: (params) => (
                <input
                    type="checkbox"
                    checked={favorites.has(params.data.name.common)}
                    onChange={() => toggleFavorite(params.data.name.common)}
                    onClick={(e) => e.stopPropagation()}
                />
            )
        },
        { headerName: "Flag", field: "flagUrl", cellRenderer: params => <img src={params.value} alt="flag" style={{ width: '32px', height: '24px' }} /> },
        { headerName: "Country", field: "name.common" },
        { headerName: "Population", field: "population" },
        { headerName: "Languages", field: "languages" },
        { headerName: "Currencies", field: "currencies" }
    ];

    return (
        <div className="container mx-auto p-4 flex flex-col md:flex-row">
            <div className="flex-grow" style={{ minWidth: '63%' }}>
                <button
                    className="bg-blue-500 text-white p-2 rounded cursor-pointer mb-4 flex items-center"
                    onClick={openFavoritesModal}
                >
                    Favorites
                </button>
                <SearchBar query={query} setQuery={setQuery} />
                <div className="ag-theme-alpine" style={{ height: '400px', width: '100%' }}>
                    <AgGridReact columnDefs={columns} rowData={filteredData} domLayout='autoHeight' onRowClicked={onRowClicked} />
                </div>
            </div>
            {!favoritesModalOpen && selectedCountryDetails && (
                <div className="flex-none w-96 bg-light-blue-100 p-5 shadow-lg m-4 rounded-lg" style={{ zIndex: '10' }}>
                    <div className="text-lg font-bold">{selectedCountryDetails.text.split('\n')[0]}</div>
                    <div className="text-sm">{selectedCountryDetails.text.split('\n').slice(1).join('\n')}</div>
                </div>
            )}
            <Modal
                isOpen={favoritesModalOpen}
                onRequestClose={closeFavoritesModal}
                style={{ content: { top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)', zIndex: '1050' } }}
            >
                <h2 className="font-bold">{favorites.size > 0 ? 'My Favorites' : 'No Flags Saved'}</h2>
                {favorites.size > 0 ? (
                    <ul>
                        {Array.from(favorites).map(country => (
                            <li key={country}>
                                <img src={rowData.find(item => item.name.common.toLowerCase() === country)?.flagUrl} alt={country} style={{ width: '20px', marginRight: '8px' }} />
                                {country.charAt(0).toUpperCase() + country.slice(1)}
                            </li>
                        ))}
                    </ul>
                ) : null}
                <button onClick={removeAllFavorites} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">Remove All</button>
                <button onClick={closeFavoritesModal} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Close</button>
            </Modal>
        </div>
    );
};

export default Flags;
