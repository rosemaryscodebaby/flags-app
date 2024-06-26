// src/components/__tests__/RowDetailCard.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RowDetailCard from '../RowDetailCard';

const mockDetails = {
    text: `Germany Details:
    Official name (en): Federal Republic of Germany,
    Native name: Bundesrepublik Deutschland (Deutschland)
    Capital: Berlin
    Lat/Long:  51.0, 9.0
    Neighboring Countries: AUT,BEL,CZE,DNK,FRA,LUX,NLD,POL,CHE
    Size (km^2): 357114.0,
    Continent(s): Europe`,
    googleMaps: 'https://goo.gl/maps/mD9FBMq1nvXUBrkv6'
};

test('renders the RowDetailCard with details and link', () => {
    render(<RowDetailCard details={mockDetails.text} googleMaps={mockDetails.googleMaps} />);
    expect(screen.getByRole('link', { name: /View on Google Maps/ })).toBeInTheDocument();
    expect(screen.queryByText(/Germany Details:/)).toBeInTheDocument();
    expect(screen.queryByText(/Official name \(en\): Federal Republic of Germany/)).toBeInTheDocument();
    expect(screen.queryByText(/Native name: Bundesrepublik Deutschland \(Deutschland\)/)).toBeInTheDocument();
});
