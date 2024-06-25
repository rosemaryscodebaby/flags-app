import { fetchCountries, filterCountries } from '../countryService';

// Mocking global.fetch so we don't perform real HTTP requests
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([
      {
        name: { common: "France" },
        languages: { fra: "French" },
        currencies: { EUR: { name: "Euro" } }
      },
      {
        name: { common: "Germany" },
        languages: { deu: "German" },
        currencies: { EUR: { name: "Euro" } }
      }
    ]),
  })
);

beforeEach(() => {
  fetch.mockClear();
});

describe("fetchCountries", () => {
  it("fetches countries successfully from an API", async () => {
    const countries = await fetchCountries();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(countries.length).toBe(2);
    expect(countries[0].name.common).toEqual("France");
  });

  it("handles exceptions from fetching countries", async () => {
    fetch.mockImplementationOnce(() => Promise.reject("API is down"));
    const countries = await fetchCountries();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(countries).toEqual([]);
  });
});

describe("filterCountries", () => {
  const countries = [
    { name: { common: "France" }, languages: { fra: "French" }, currencies: { EUR: { name: "Euro" } } },
    { name: { common: "Germany" }, languages: { deu: "German" }, currencies: { EUR: { name: "Euro" } } }
  ];

  it("filters countries by name", () => {
    const result = filterCountries(countries, "fran");
    expect(result.length).toBe(1);
    expect(result[0].name.common).toEqual("France");
  });

  it("filters countries by language", () => {
    const result = filterCountries(countries, "german");
    expect(result.length).toBe(1);
    expect(result[0].name.common).toEqual("Germany");
  });

  it("returns all countries when query is empty", () => {
    const result = filterCountries(countries, "");
    expect(result.length).toBe(2);
  });
});
