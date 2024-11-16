import Base from "../components/Base";
import OverviewNavbar from "../components/UI/Navbars/OverviewNavbar";
import { useState } from "react";
import { Box, Modal, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddListModal from "../components/UI/Modals/AddListModal";
import ContentDivider from "../components/UI/Dividers/ContentDivider";
import Strings from "../values/Strings";

function Overview() {
    const [addFormOpened, setAddFormOpened] = useState(false);

    const openAddForm = () => {
        setAddFormOpened(!addFormOpened);
    };

    return (
        <Base
            navbar={<OverviewNavbar username={'test'} openAddForm={openAddForm} />}
            content={
                <>
                    <AddListModal addFormOpened={addFormOpened} onClose={() => setAddFormOpened(false)} />
                    <ContentDivider text={Strings.myLists}/>
                    <ContentDivider text={Strings.participating}/>
                </>
            }
        />
    );
}

export default Overview;
