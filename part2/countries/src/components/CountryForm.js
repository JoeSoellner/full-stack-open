import React from 'react';

const CountryForm = (props) => {

    return (
        <form>
            <div>
                Enter country: <input value={props.newSearch} onChange={props.changeSearchHandler} />
            </div>
        </form>
    )
}

export default CountryForm