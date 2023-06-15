import { createStyles, makeStyles } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import { Box, Button, Modal, Theme } from "@mui/material";
import React from "react";
import DetalheProduto from "../detalheProduto/DetalheProduto";
import "../listaproduto/ListaProduto";
import './ModalProduto.css';


function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            position: 'absolute',
            width: 800,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }),
);

function ModalProduto(idModal: any) {
    console.log(idModal)
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <Box display="flex" justifyContent="flex-end" className="cursor">
                <CloseIcon onClick={handleClose} />
            </Box>
            <DetalheProduto idDetalhe={idModal}/>
        </div>
    );

    return (
        <div>
            <Button
                variant="outlined"
                className="botaoColor"
                onClick={handleOpen}>
                Detalhar
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}
export default ModalProduto;