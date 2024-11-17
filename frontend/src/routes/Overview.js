import Base from "../components/Base";
import OverviewNavbar from "../components/UI/Navbars/OverviewNavbar";
import {useCallback, useEffect, useState} from "react";
import { Box, Modal, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddListModal from "../components/UI/Modals/AddListModal";
import ContentDivider from "../components/UI/Dividers/ContentDivider";
import Strings from "../values/Strings";
import APIService from "../helpers/APIService";
import UserListsView from "../components/UI/Lists/UserListsView";

function Overview() {
    const [addFormOpened, setAddFormOpened] = useState(false);
    const [userLists, setUserLists] = useState([]);
    const [participantaList, setParticipantaList] = useState([]);

    const getUserLists = useCallback(async () => {

        const data = await APIService.getOwnerLists();

        if(data){
            setUserLists(data);
        }

    }, []);

    const getParticipantsList = useCallback(async () => {

    }, []);


    const openAddForm = () => {
        setAddFormOpened(!addFormOpened);
    };

    useEffect(() => {
        void getUserLists();
    },[getUserLists] );


    return (
        <Base
            navbar={<OverviewNavbar username={'test'} openAddForm={openAddForm} />}
            content={
                <>
                    <AddListModal addFormOpened={addFormOpened} onClose={() => setAddFormOpened(false)} />
                    <ContentDivider text={Strings.myLists}/>
                    <UserListsView lists={userLists} />

                    <ContentDivider text={Strings.participating}/>
                </>
            }
        />
    );
}

export default Overview;
