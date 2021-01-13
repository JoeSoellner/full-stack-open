import React from 'react'

const FormInput = ({ valueName, value, setValue, type }) => (
    <div>
        {valueName}
        <input
            type={type}
            value={value}
            name={valueName}
            onChange={({ target }) => setValue(target.value)}
        />
    </div>
)

export default FormInput