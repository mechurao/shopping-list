import {Modal} from "@mui/material";

function AddListItemModal({listID,onClose, addFormOpened}) {

    return (
        <Modal
            onClose={onClose}
            open={addFormOpened}
        >

        </Modal>
    );
}
