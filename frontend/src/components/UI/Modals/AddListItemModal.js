import { Modal, TextField } from "@mui/material";
import ModalBox from "../ModalBox";
import Strings from "../../../values/Strings";
import { useCallback, useState } from "react";
import APIService from "../../../helpers/APIService";
import PageControl from "../../../utils/PageControl";
import SubmitButton from "../SubmitButton";

function AddListItemModal({ listID, onClose, addFormOpened }) {
    const [name, setName] = useState("");

    const submitEnabled = useCallback(() => {
        return name.trim() === "";
    }, [name]);

    const submitAction = async (e) => {
        e.preventDefault();
        const result = await APIService.addListItem(listID, name);
        if (result === true) {
            alert(Strings.listItemAdded);
            PageControl.refresh();
        } else {
            alert("Error");
        }
    };

    return (
        <Modal onClose={onClose} open={addFormOpened}>
            <ModalBox onClose={onClose} title={Strings.addItem}>
                <TextField
                    type="text"
                    placeholder={Strings.itemName}
                    value={name}
                    onChange={(e) => setName(e.target.value)} // Správné nastavení hodnoty
                />
                <br />
                <SubmitButton label={Strings.addItem} disabled={submitEnabled()} onClick={submitAction} />
            </ModalBox>
        </Modal>
    );
}

export default AddListItemModal;
