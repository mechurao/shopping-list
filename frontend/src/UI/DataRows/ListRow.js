import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { ArrowRight } from "@mui/icons-material";
import ProgressBar from "../ProgressBar";

function ListRow({ list }) {
    const navigate = useNavigate();

    const openDetails = (id) => {
        navigate(`/overview/${id}`);
    };

    const styles = {
        container: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 20px",
            background: "white",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
            marginBottom: "10px",
        },
        leftSection: {
            display: "flex",
            flexDirection: "column",
        },
        title: {
            fontSize: "16px",
            fontWeight: "bold",
        },
        subtitle: {
            fontSize: "14px",
            color: "gray",
        },
        progressSection: {
            display: "flex",
            alignItems: "center",
            gap: "10px",
        },
        progressText: {
            fontSize: "14px",
            fontWeight: "bold",
        },
        rightSection: {
            display: "flex",
            alignItems: "center",
            gap: "10px",
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.leftSection}>
                <span style={styles.title}>{list.name}</span>
                <span style={styles.subtitle}>
                    {list.participants.length} members
                </span>
            </div>
            <div style={styles.progressSection}>
                <span style={styles.progressText}>
                    {list.items.filter((item) => item.checked).length}/
                    {list.items.length} completed
                </span>
                <ProgressBar
                    cnt={list.items.filter((item) => item.checked).length}
                    total={list.items.length}
                />
            </div>
            <div style={styles.rightSection}>
                {list.owner && (
                    <span style={styles.subtitle}>
                        Created by {list.owner.username}
                    </span>
                )}
                <IconButton onClick={() => openDetails(list._id)}>
                    <ArrowRight />
                </IconButton>
            </div>
        </div>
    );
}

export default ListRow;
