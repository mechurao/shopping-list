import Navbar from "./NavBar";
import { IconButton} from "@mui/material";
import {ArrowBack, Delete, Logout} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

function ListDetailNavBar({name, deleteAction, leaveAction}){
    const navigate = useNavigate();

    const back = () => {
        navigate(-1);
    }
    return(<Navbar
        title={name}
        leftComponents={[
            <IconButton onClick={back}>
                <ArrowBack/>
            </IconButton>
        ]}
        rightComponents={[
            <IconButton onClick={deleteAction} sx={{ color: 'red' }}>
                <Delete/>
            </IconButton>,
            <IconButton onClick={leaveAction}>
                <Logout/>
            </IconButton>
        ]}
    />);
}
export default ListDetailNavBar;
