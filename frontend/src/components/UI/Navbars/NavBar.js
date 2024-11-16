import React from 'react';
import PropTypes from 'prop-types';

const Navbar = ({ title, leftComponents, rightComponents }) => {
    const navbarStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        background: 'none',
        padding: '0 15px',
        boxSizing: 'border-box',
        borderBottom: '1px solid #ddd',
    };

    const sideStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    };

    const titleStyle = {
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        fontWeight: 'bold',
        fontSize: '18px',
    };

    return (
        <div style={navbarStyle}>
            <div style={sideStyle}>{leftComponents}</div>
            <div style={titleStyle}>{title}</div>
            <div style={sideStyle}>{rightComponents}</div>
        </div>
    );
};

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    leftComponents: PropTypes.arrayOf(PropTypes.node),
    rightComponents: PropTypes.arrayOf(PropTypes.node),
};

Navbar.defaultProps = {
    leftComponents: [],
    rightComponents: [],
};

export default Navbar;
