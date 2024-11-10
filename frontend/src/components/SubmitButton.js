import React from 'react';

function SubmitButton({ label = "Submit", onClick, disabled = false }) {
    return (
        <button
            type="submit"
            onClick={onClick}
            disabled={disabled}
            style={{
                padding: '10px 20px',
                fontSize: '16px',
                backgroundColor: disabled ? '#cccccc' : '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: disabled ? 'not-allowed' : 'pointer'
            }}
        >
            {label}
        </button>
    );
}

export default SubmitButton;
