import Navbar from "./NavBar";
import { IconButton} from "@mui/material";
import {ArrowBack} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

function ListDetailNavBar({name}){
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
    />);
}
export default ListDetailNavBar;
