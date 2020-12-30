import React from 'react';

const Contact = ({ name, number, id }) => {
    return (
        <li key={id}>
            {name}: {number}
        </li>
    )
}

export default Contact;