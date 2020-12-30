import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DisplaySearchInfo = (props) => {
    //const [currFlag, setCurrFlag] = useState('');
    const currentSearch = props.currentSearch;
    const apiCountryData = props.apiCountryData;

    // return all country objects whose names contain the search string
    const countriesContainingSearch = (search) => {
        if (apiCountryData === '' || search === '') {
            return [];
        }

        let countriesMatchingSearch = [];

        apiCountryData.forEach(currCountryObj => {
            const currCountryName = currCountryObj.name.toLowerCase();
            if (currCountryName.includes(search)) {
                countriesMatchingSearch.push(currCountryObj);
            }
        })
        return countriesMatchingSearch;
    }

    const getCountryNames = (countryObjs) => {
        if (apiCountryData === '') {
            return [];
        }

        const countryNames = [];

        countryObjs.forEach(currCountryObj => {
            countryNames.push(currCountryObj.name);
        })
        return countryNames;
    }

    /*
    const getFlagHook = () => {
        axios
            .get('https://restcountries.eu/data/che.svg')
            .then(response => {
                setCurrFlag(response.data);
            })
    }
    useEffect(getFlagHook, [currFlag]);
    */

    let displayCountries = countriesContainingSearch(currentSearch);
    let displayCountryName = getCountryNames(displayCountries);
    console.log(displayCountryName, displayCountryName.length);

    if (currentSearch === '') {
        return (
            <div></div>
        )
    } else if (displayCountryName.length === 1) {
        const currCountry = displayCountries[0];
        console.log(currCountry);
        // doing this so the hook runs and fetches the flag
        // setCurrFlag('run hook');

        return (
            <div>
                <h1>{currCountry.name}</h1>
                <p>Capital: {currCountry.capital}</p>
                <p>Population: {currCountry.population}</p>

                <h2>Languages</h2>
                <ul>
                    {currCountry.languages
                        .map((language, i) => <li key={i}>{language.name}</li>
                        )}
                </ul>
            </div>
        )
    } else if (displayCountryName.length >= 10) {
        return (
            <div>Too many matches, try being more specific in your search.</div>
        )
    } else {
        return (
            <div>
                {displayCountryName
                    .map((countryName, i) => <p key={i}>{countryName}</p>
                    )}
            </div>
        )
    }
}

export default DisplaySearchInfo