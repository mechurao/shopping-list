import Navbar from "./NavBar";
import {IconButton, Tooltip} from "@mui/material";
import {Archive, ArrowBack, Delete, Logout, Unarchive} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import Strings from "../../../values/Strings";

function ListDetailNavBar({name, archived,archiveAction,deleteAction, leaveAction}){
    const navigate = useNavigate();

    const back = () => {
        navigate(-1);
    }
    return(<Navbar
        title={name}
        leftComponents={[
            <IconButton onClick={back} sx={{ color: 'white' }}>
                <ArrowBack/>
            </IconButton>
        ]}
        rightComponents={[
            <Tooltip title={(archived === false) ? Strings.archiveList : Strings.unarchiveList}>
                <IconButton onClick={archiveAction} sx={{ color: 'white' }}>
                    {(archived === false) ? <Archive/> : <Unarchive/>}
                </IconButton>,
            </Tooltip>,

            <Tooltip title={Strings.deleteList}>
                <IconButton onClick={deleteAction} sx={{ color: 'red' }}>
                    <Delete/>
                </IconButton>,
            </Tooltip>,

            <Tooltip title={Strings.leaveList}>
                <IconButton onClick={leaveAction} sx={{ color: 'white' }}>
                    <Logout/>
                </IconButton>
            </Tooltip>
        ]}
    />);
}
export default ListDetailNavBar;
