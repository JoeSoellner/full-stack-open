import React from 'react';

const ErrorNotification = ({ message }) => {
    if (message == null) {
        return null;
    }

    return (
        <div>
            {message}
        </div>
    )
}

export default ErrorNotification;