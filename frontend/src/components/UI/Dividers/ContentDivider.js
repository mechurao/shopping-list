function ContentDivider({text}){

    const styles = {
        width: '100%',
        height: '40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 15px',
    }

    const textStyle = {
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        fontWeight: 'bold',
        fontSize: '18px',
    };

    return (
        <div style={styles}>
            <span style={textStyle}>{text}</span>

        </div>
    );
}

export default ContentDivider;
