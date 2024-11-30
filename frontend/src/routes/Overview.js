import Base from "../components/Base";
import OverviewNavbar from "../components/UI/Navbars/OverviewNavbar";
import {useCallback, useEffect, useState} from "react";
import AddListModal from "../components/UI/Modals/AddListModal";
import ContentDivider from "../components/UI/Dividers/ContentDivider";
import Strings from "../values/Strings";
import APIService from "../helpers/APIService";
import UserListsView from "../components/UI/Lists/UserListsView";
import PageControl from "../utils/PageControl";
import {Switch} from "@mui/material";

function Overview() {
    const [addFormOpened, setAddFormOpened] = useState(false);
    const [userLists, setUserLists] = useState([]);
    const [participantaList, setParticipantaList] = useState([]);
    const [showArchived, setShowArchived] = useState(true);

    // set page title
    PageControl.setTitle(Strings.overview);
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
                    <ContentDivider
                        text={Strings.myLists}
                        rightOption={
                            <>
                                <span>{Strings.showArchived}</span>
                                <Switch
                                    checked={showArchived}
                                    onChange={() => setShowArchived(!showArchived)}
                                />
                            </>
                        }
                    />
                    <UserListsView lists={userLists} />

                    <ContentDivider text={Strings.participating}/>
                </>
            }
        />
    );
}

export default Overview;
