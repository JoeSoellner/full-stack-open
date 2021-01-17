import React from 'react'

const FormInput = ({ valueName, value, setValue, type, id }) => (
    <div>
        {valueName}
        <input
			id={id}
            type={type}
            value={value}
            name={valueName}
            onChange={({ target }) => setValue(target.value)}
        />
    </div>
)

export default FormInput