import React from 'react';

function TextField({ name,value, onChange, inputType='text', placeholder='' }) {
    return (
        <input
            name={name}
            type={inputType}
            className="text_input"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    );
}

export default TextField;
