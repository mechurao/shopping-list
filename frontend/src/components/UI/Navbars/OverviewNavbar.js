import {useCallback, useEffect, useState} from "react";
import APIService from "../../../helpers/APIService";
import {StatusCodes} from "http-status-codes";
import Navbar from "./NavBar";
import Strings from "../../../values/Strings";
import {Icon, IconButton, Tooltip} from "@mui/material";
import {Add, Logout} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

function OverviewNavbar({openAddForm}) {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const getUserData = useCallback(async () => {
        let data = await APIService.getUserDetails();
        if(data.status !== StatusCodes.OK){
            alert("Loading user data failed");
            return;
        }
        const name = data.data.username;
        setUsername(name);

    }, []);


    const logoutAction = (async () => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm(Strings.areYouSure) === false) {
            return;
        }
        const query = await APIService.logout();
        if(query !== true){
            alert("Log out failed");
            return;
        }
        navigate("/", {replace: true});

    });


    useEffect(() => {
        void getUserData();
    }, [getUserData]);


    return (<Navbar
        title={Strings.overview}
        leftComponents={[
            <span>{username}</span>,
            <Tooltip title={Strings.logout}>
                <IconButton onClick={logoutAction} sx={{ color: 'white' }}>
                    <Logout/>
                </IconButton>
            </Tooltip>
        ]}
        rightComponents={[
            <IconButton onClick={openAddForm} sx={{ color: 'white' }} >
                <Add/>
            </IconButton>
        ]}
    />);
}

export default OverviewNavbar;
