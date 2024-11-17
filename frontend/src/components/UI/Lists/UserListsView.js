import { IconButton } from "@mui/material";
import { ArrowRight } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function UserListView({ lists }) {
    const navigate = useNavigate();

    const openDetails = (id) => {

        navigate(`/overview/${id}`);
    };

    return (
        <div>
            {lists.map((list, index) => (
                <div key={index}>
                    <span>{list.name}</span>
                    <IconButton onClick={() => openDetails(list._id)}>
                        <ArrowRight />
                    </IconButton>
                </div>
            ))}
        </div>
    );
}

export default UserListView;
