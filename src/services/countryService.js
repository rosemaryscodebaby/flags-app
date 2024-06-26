// src/service/countryService.js
export const fetchCountries = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching countries:', error);
      return [];
    }
  };
  
  // export const filterCountries = (countries, query) => {
  //   if (!query) return countries;
  
  //   return countries.filter(country => {
  //     const name = country.name.common.toLowerCase();
  //     const languages = country.languages ? Object.values(country.languages).join(', ').toLowerCase() : '';
  //     const currencies = country.currencies ? Object.values(country.currencies).map(cur => cur.name).join(', ').toLowerCase() : '';
  
  //     return name.includes(query) || languages.includes(query) || currencies.includes(query);
  //   });
  // };

  export const filterCountries = (countries, query) => {
    if (!query) return countries;

    return countries.filter(country => {
        const name = country.name.common.toLowerCase();
        const languages = country.languages ? Object.values(country.languages).join(', ').toLowerCase() : '';
        const currencies = country.currencies ? Object.values(country.currencies).map(cur => cur.name).join(', ').toLowerCase() : '';

        return name.includes(query) || languages.includes(query) || currencies.includes(query);
    });
};

  