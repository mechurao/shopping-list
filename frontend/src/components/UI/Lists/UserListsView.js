import { useNavigate } from "react-router-dom";
import ListRow from "../../../UI/DataRows/ListRow";

function UserListView({ lists }) {
    const navigate = useNavigate();



    return (
        <div>
            {lists.map((list, index) => (
                <ListRow list={list}/>
            ))}
        </div>
    );
}

export default UserListView;
