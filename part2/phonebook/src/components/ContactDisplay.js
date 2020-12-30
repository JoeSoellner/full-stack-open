import React from 'react';
import Contact from './Contact';

const ContactDisplay = ({ contacts, deleteButtonClickHandler }) => {

    return (
        <ul>
            {contacts.map((contact) =>
                <div key={contact.id}>
                    <Contact key={contact.id} name={contact.name} number={contact.number} />
                    <button onClick={() => deleteButtonClickHandler(contact.id)}>delete</button>
                </div>)
            }
        </ul >
    )
}

export default ContactDisplay;