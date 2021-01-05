import React, { useState, useEffect } from 'react';
import ContactDisplay from './ContactDisplay';
import ContactForm from './ContactForm';
import ErrorNotification from './ErrorNotification';
import contactService from '../services/contacts';

const App = () => {
    const [contacts, setContacts] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [errorMessage, setErrorMessage] = useState('')

    const hook = () => {
        console.log("hello?")
        contactService
            .getAll()
            .then(responseData => {
                setContacts(responseData)
            })
    }
    useEffect(hook, []);

    const checkIfNameInContacts = (name) => {
        for (let i = 0; i < contacts.length; i++) {
            if (name === contacts[i].name) {
                return true;
            }
        }
        return false;
    }

    const getContactsWithName = (name) => {
        for (let i = 0; i < contacts.length; i++) {
            if (name === contacts[i].name) {
                return contacts[i];
            }
        }
        return {};
    }

    const addContacts = (event) => {
        event.preventDefault();
        if (checkIfNameInContacts(newName)) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)) {
                const contactToBeUpdated = getContactsWithName(newName);

                contactService
                    .update(contactToBeUpdated.id, { ...contactToBeUpdated, number: newNumber })
                    .then(responseData => {
                        setContacts(
                            contacts.map(contact => contact.id !== contactToBeUpdated.id ? contact : responseData));
                    })
                    .catch(error => {
                        console.log('fail', error);
                    });
            }
        } else {
            const newContact = { name: newName, number: newNumber };

            contactService
                .add(newContact)
                .then(responseData => {
                    setContacts(contacts.concat(responseData));
                    setNewName('');
                    setNewNumber('');

                    setErrorMessage(
                        `contact '${newContact.name}' was added`
                    )
                    setTimeout(() => {
                        setErrorMessage(null)
                    }, 5000)
                })
                .catch(error => {
                    console.log('fail', error);
                });
        }
    }

    const handleInputChangeName = (event) => {
        setNewName(event.target.value);
    }

    const handleInputChangeNumber = (event) => {
        setNewNumber(event.target.value);
    }

    const deleteButtonClickHandler = (id) => {
        const contactsID = id;
        contactService.remove(contactsID);
        setContacts(contacts.filter((contact) => contact.id !== contactsID))
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <ErrorNotification message={errorMessage} />
            <ContactForm
                submitHandler={addContacts} newName={newName} newNumber={newNumber}
                changeNameHandler={handleInputChangeName} changeNumberHandler={handleInputChangeNumber} />
            <h2>Numbers</h2>
            <ContactDisplay contacts={contacts} setContacts={setContacts}
                deleteButtonClickHandler={deleteButtonClickHandler} />
        </div>
    )
}

export default App