// src/components/__tests__/SearchBar.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SearchBar from '../SearchBar';

describe('SearchBar', () => {
    test('renders SearchBar component with placeholder', () => {
        render(<SearchBar query="" setQuery={() => {}} />);
        expect(screen.getByPlaceholderText('Search by keyword e.g. `Euro`')).toBeInTheDocument();
    });

    test('allows user to enter text', () => {
        const setQuery = jest.fn();
        render(<SearchBar query="" setQuery={setQuery} />);
        const input = screen.getByPlaceholderText('Search by keyword e.g. `Euro`');
        fireEvent.change(input, { target: { value: 'France' } });
        expect(setQuery).toHaveBeenCalledWith('France');
    });
});
