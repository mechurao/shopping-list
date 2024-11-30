import { Box, IconButton, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "../../TextField";
import {useCallback, useEffect, useState} from "react";
import Strings from "../../../values/Strings";
import {Add, Remove} from "@mui/icons-material";
import APIService from "../../../helpers/APIService";
import SubmitButton from "../SubmitButton";
import PageControl from "../../../utils/PageControl";
import ModalBox from "../ModalBox";


function NewItemRow({name, remove, index}){
    return (
        <div key={index} style={{borderBottom: '1px solid #ccc', padding: '8px'}}>
            {name}
            <IconButton onClick={() => remove(index)}>
                <Remove/>
            </IconButton>
        </div>
    );

}


function AddListModal({onClose, addFormOpened}) {
    const [listName, setListName] = useState("");
    const [items, setItems] = useState(['item1', 'item2', 'item3']);
    const [newItemName, setNewItemName] = useState("");
    const [addItemDisabled, setAddItemDIsabled] = useState(true);



    const addItem = () => {
        setItems([...items, newItemName]);
        setNewItemName("");
    }

    const deleteItem = (targetIndex) => {
        setItems((prevItems) => prevItems.filter((_, index) => index !== targetIndex));
    }


    const newItemEnabled = useCallback(() => {
        return newItemName.trim() === "";
    }, [newItemName]);




    const submitAction = async (e) => {
        e.preventDefault();
        const list = {
            name: listName,
            items: items,
        }

        let result = await APIService.addList(list);
        if(result === true){
            alert(Strings.listAdded);
            PageControl.refresh();
        }else{
            alert("error");
        }
    }


    useEffect(() => {
        setAddItemDIsabled((newItemEnabled()));
    },[newItemEnabled]);


    return (
        <Modal
            onClose={onClose}
            open={addFormOpened}
        >
            <ModalBox onClose={onClose} title={Strings.addList}>
                <TextField
                    inputType={'text'}
                    placeholder={Strings.listName}
                    value={listName}
                    onChange={setListName}>

                </TextField><br/>
                <TextField
                    inputType={'text'}
                    placeholder={Strings.addItem}
                    value={newItemName}
                    onChange={setNewItemName}/>
                <IconButton
                    disabled={addItemDisabled}
                    onClick={addItem}>
                    <Add/>
                </IconButton>
                <br/>
                <h3>{Strings.items}</h3><br/>
                <div>
                    {items.map((item, index) => (
                        <NewItemRow name={item} index={index} remove={deleteItem}/>
                    ))
                    }
                </div><br/>
                <SubmitButton label={Strings.add} onClick={submitAction}/>
            </ModalBox>
        </Modal>
    );
}

export default AddListModal;
