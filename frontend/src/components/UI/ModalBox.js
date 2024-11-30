import React from 'react';
import Box from '@mui/material/Box';
import {IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ModalBox = ({ children, onClose, title=''}) => {
    return (
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
            <h2>{title}</h2>
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
                {children}
            </Box>
        </Box>
    );
};

export default ModalBox;
