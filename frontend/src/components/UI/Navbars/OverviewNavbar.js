import {useCallback, useEffect, useState} from "react";
import APIService from "../../../helpers/APIService";
import {StatusCodes} from "http-status-codes";
import Navbar from "./NavBar";
import Strings from "../../../values/Strings";
import {Icon, IconButton} from "@mui/material";
import {Add, Logout} from "@mui/icons-material";

function OverviewNavbar({openAddForm}) {
    const [username, setUsername] = useState("");

    const getUserData = useCallback(async () => {
        let data = await APIService.getUserDetails();
        if(data.status !== StatusCodes.OK){
            alert("Loading user data failed");
            return;
        }
        const name = data.data.username;
        setUsername(name);

    }, []);

    useEffect(() => {
        void getUserData();
    }, [getUserData]);


    return (<Navbar
        title={Strings.overview}
        leftComponents={[
            <span>{username}</span>,
            <IconButton sx={{ color: 'white' }}>
                <Logout/>
            </IconButton>
        ]}
        rightComponents={[
            <IconButton onClick={openAddForm}>
                <Add/>
            </IconButton>
        ]}
    />);
}

export default OverviewNavbar;
