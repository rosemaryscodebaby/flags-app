// src/utils/formatCountryDetails.js
function formatCountryDetails(countryData) {
    const details = countryData[0];
    const {
        name: { common, official, nativeName },
        capital = [],
        latlng = [],
        borders = [],
        area,
        region: continent,
        maps: { googleMaps } = {}
    } = details;

    const nativeNames = nativeName ? Object.values(nativeName)[0] : { official: '', common: '' };
    let nativeDisplay = nativeNames.official;
    if (nativeNames.common && nativeNames.common !== nativeNames.official) {
        nativeDisplay += ` (${nativeNames.common})`;
    }

    const formattedDetails = `
${common} Details:
Official name (en): ${official},
Native name: ${nativeDisplay}
Capital: ${capital[0] || 'N/A'}
Lat/Long: ${latlng.join(', ') || 'N/A'}
Neighboring Countries: ${borders.join(', ') || 'N/A'}
Size (km^2): ${area || 'N/A'},
Continent(s): ${continent || 'N/A'}
`;

    return { text: formattedDetails, googleMaps: googleMaps || '' };
}

export default formatCountryDetails;
