import React, { useEffect } from 'react';

function SubmitButton({ label = "Submit", onClick, disabled = false }) {
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Enter' && !disabled) {
                onClick(event);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClick, disabled]);

    return (
        <button
            type="button"
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
