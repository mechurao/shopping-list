import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

function LoadingWheel({ active }) {
    const rootStyle = getComputedStyle(document.documentElement);
    const mainColor = rootStyle.getPropertyValue('--main-color').trim();

    if (!active) return null;

    return (
        <div style={styles.overlay}>
            <ClipLoader
                color={mainColor || "#000000"}
                loading={active}
                cssOverride={{
                    display: "block",
                    margin: "0 auto",
                    borderColor: mainColor,
                    borderWidth: 5,
                }}
                size={100}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
}

const styles = {
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        zIndex: 9999,
    }
};

export default LoadingWheel;
