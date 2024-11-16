import { Box, IconButton, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "../../TextField";
import {useState} from "react";
import Strings from "../../../values/Strings";

function AddListModal({ onClose, addFormOpened }) {
    const [listName, setListName] = useState("");
    const [items, setItems] = useState([]);

    const submitAction = async (e) => {
        e.preventDefault();
    }

    return (
        <Modal
            onClose={onClose}
            open={addFormOpened}
        >
            <Box
                sx={{
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 300,
                    bgcolor: 'white',
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 4,
                    textAlign: 'center',
                    position: 'relative',
                }}
            >
                <IconButton
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                    }}
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>

                <Box component="span" sx={{ display: 'block', mb: 2 }}>
                    <TextField inputType={'text'} placeholder={Strings.listName} value={listName} onChange={setListName}></TextField><br/>
                </Box>
            </Box>
        </Modal>
    );
}

export default AddListModal;
