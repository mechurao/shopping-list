import React from 'react';
import PropTypes from 'prop-types';

const ProgressBar = ({ cnt, total }) => {
    const progressWidth = total > 0 ? `${(cnt / total) * 100}%` : '0%';

    const containerStyle = {
        width: '100%',
        height: '10px',
        backgroundColor: 'red',
        borderRadius: '10px',
        overflow: 'hidden',
        position: 'relative',
    };

    const progressStyle = {
        width: progressWidth,
        height: '100%',
        backgroundColor: 'green',
        transition: 'width 0.3s ease',
    };

    return (
        <div style={containerStyle}>
            <div style={progressStyle}></div>
        </div>
    );
};

ProgressBar.propTypes = {
    cnt: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
};

export default ProgressBar;
