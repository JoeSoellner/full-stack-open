import React from 'react';

const ContactForm = (props) => {
    return (
        <form onSubmit={props.submitHandler}>
            <div>
                name: <input value={props.newName} onChange={props.changeNameHandler} />
            </div>
            <div>
                number: <input value={props.newNumber} onChange={props.changeNumberHandler} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default ContactForm;