// src/utils/util.js
export function formatCountryDetails(countryData) {
    const details = countryData[0];
    const {
        name: { common, official },
        capital = [],
        latlng = [],
        borders = [],
        area,
        region: continent,
        maps: { googleMaps } = {}
    } = details;

    const nativeName = details.name.nativeName;
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
Google Maps: ${googleMaps || 'N/A'}
`;

    return { text: formattedDetails, googleMaps: googleMaps || '' };
}

export function manageFavorites(countryName) {
    const country = countryName.toLowerCase();
    const favs = new Set(JSON.parse(localStorage.getItem('favs') || '[]'));

    if (favs.has(country)) {
        favs.delete(country);
        console.log(`Removed ${country} from favorites`);
    } else {
        favs.add(country);
        console.log(`Added ${country} to favorites`);
    }

    localStorage.setItem('favs', JSON.stringify(Array.from(favs)));
}
