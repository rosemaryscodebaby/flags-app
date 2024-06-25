import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { fetchCountries } from '../services/countryService';

const Countries = () => {
  const [rowData, setRowData] = React.useState([]);

  React.useEffect(() => {
    async function getCountries() {
      const countries = await fetchCountries();
      setRowData(countries.map(country => ({
        ...country,
        flagUrl: country.flags.png
      })));
    }
    getCountries();
  }, []);

  const columns = [
    {
      headerName: "Flag",
      field: "flagUrl",
      cellRendererFramework: (params) => (
        <img src={params.value} alt="flag" style={{ width: '32px', height: '24px' }} />
      )
    },
    { headerName: "Country", field: "name.common" },
    { headerName: "Population", field: "population" },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="ag-theme-alpine" style={{ height: '400px', width: '100%' }}>
        <AgGridReact
          columnDefs={columns}
          rowData={rowData}
          domLayout='autoHeight'
        />
      </div>
    </div>
  );
};

export default Countries;