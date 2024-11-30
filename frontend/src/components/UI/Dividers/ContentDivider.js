function ContentDivider({ text, leftOption, rightOption }) {
    const containerStyle = {
        width: '100%',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 15px',
    };

    const textStyle = {
        fontWeight: 'bold',
        fontSize: '18px',
        textAlign: 'center',
        flex: 1,
    };

    const optionStyle = {
        flexShrink: 0,
    };

    return (
        <div style={containerStyle}>
            <div style={optionStyle}>{leftOption || null}</div>
            <div style={textStyle}>{text}</div>
            <div style={optionStyle}>{rightOption || null}</div>
        </div>
    );
}

export default ContentDivider;
