import {useEffect, useState} from "react";
import {Checkbox, IconButton} from "@mui/material";
import APIService from "../../helpers/APIService";
import {Remove} from "@mui/icons-material";
import PageControl from "../../utils/PageControl";


function ListItemRow({ listID,item }) {
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        setChecked(item.checked);
    }, [item.checked]);

    const checkItem = (async () => {
        let result = await APIService.checkItem(listID, item.id);
        if(result){
            setChecked(result);
          //  item.checked = result;
            PageControl.refresh();
        }
    });

    const removeItem = (async () => {
        const result = await APIService.deleteListItem(listID, item.id);
        if(result){
            PageControl.refresh();
        }
    });


    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            padding: "10px"
        }}>
            <span>{item.name}</span>
            <Checkbox
                checked={checked}
                onChange={checkItem}
            />
            <IconButton onClick={removeItem}>
                <Remove/>
            </IconButton>
        </div>
    );
}

export default ListItemRow;

