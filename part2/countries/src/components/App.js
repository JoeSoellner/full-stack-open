import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CountryForm from './CountryForm';
import DisplaySearchInfo from './DisplaySearchInfo';

const App = () => {
    const [newSearch, setNewSearch] = useState('');
    const [displayedResults, setdisplayedResults] = useState('');
    const [apiCountryData, setApiCountryData] = useState('');

    const hook = () => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setApiCountryData(response.data);
            })
    }
    useEffect(hook, []);

    const changeSearchHandler = (event) => {
        setNewSearch(event.target.value);
    }

    return (
        <div>
            <h2>Get Country Information</h2>
            <CountryForm
                currentSearch={newSearch} changeSearchHandler={changeSearchHandler} />
            <DisplaySearchInfo
                currentSearch={newSearch} displayedResults={displayedResults}
                setdisplayedResults={setdisplayedResults} apiCountryData={apiCountryData} />
        </div>
    )
}

export default App