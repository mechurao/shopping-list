import {useCallback, useEffect, useState} from "react";
import Base from "../components/Base";
import ListDetailNavBar from "../components/UI/Navbars/ListDetailNavBar";
import APIService from "../helpers/APIService";
import { IconButton, Switch} from "@mui/material";
import ContentDivider from "../components/UI/Dividers/ContentDivider";
import Strings from "../values/Strings";
import {Add} from "@mui/icons-material";
import ListItemRow from "../UI/DataRows/ListItemRow";
import ApiService from "../helpers/APIService";
import {useNavigate} from "react-router-dom";


function CompletionStatus({ items, newItemAction}) {
    const complete = items?.reduce((count, item) => (item.checked ? count + 1 : count), 0) || 0;

    return (
        <>
            <span>{`${complete}/${items.length} ${Strings.itemsCompleted}`}</span>
            <IconButton onClick={newItemAction}>
                <Add/>
            </IconButton><br/>
        </>
    );
}

function ListDetail({listID}){
    const [list, setList] = useState(undefined);
    const [incompleteOnly, setIncompleteOnly] = useState(false);
    const navigate = useNavigate();

    const getData = useCallback(async ()=>{
        let data = await APIService.getListDetails(listID);
        if(data){
            setList(data);
        }

    }, [listID]);

    const addItemAction = () => {
        alert("New Item");
    }

    const leaveAction = () => {
        alert("Leave");
    }

    const deleteAction = async () => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm(Strings.areYouSure) === false) {
            return;
        }
        const query = await ApiService.deleteList(listID);
        if(query === false){
            alert("List deletion error");
            return;
        }
        alert(Strings.listDeleted);
        navigate("/overview");
    };

    useEffect(()=>{
        void getData();
    }, [getData])

    return (
        list ? (
            <Base
                navbar={<ListDetailNavBar name={list.name} deleteAction={deleteAction} leaveAction={leaveAction} />}
                content={
                    <div>
                        <CompletionStatus items={list.items} newItemAction={addItemAction} />
                        <Switch
                            checked={incompleteOnly}
                            onChange={() => setIncompleteOnly(!incompleteOnly)}
                        />
                        <span>{Strings.incompleteOnly}</span>

                        <div>
                            {list.items.map((item, index) =>
                                (!incompleteOnly || !item.checked) && <ListItemRow key={index} listID={list._id} item={item} />
                            )}
                        </div>

                        <ContentDivider text={Strings.participating} />
                        <div>
                            {list.participants.map((participant, index) => (
                                <span key={index}>{participant}</span>
                            ))}
                        </div>
                    </div>
                }
            />
        ) : (
            <h2>Loading</h2>
        )
    );

}
export default ListDetail;
