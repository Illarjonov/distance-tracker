import {deleteItemsAA} from "../../../../redux/asyncAction";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {getID} from "../../../../redux/reducer";
import '../../ItemList.css'
import classes from './ButtonDelete.module.css'
import Modal from 'react-modal';

const ButtonDelete = ({item}) => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState();


    const toggleModal = (id) => {
        dispatch(getID(id));
        setIsOpen(true)
    };
    const closeModal = () =>{
        setIsOpen(false)
    };

    const deleteItemButton = (id) => {
        dispatch(deleteItemsAA(id));
        closeModal();
    };

    return(
    <div>

        <button
            onClick={()=>{toggleModal(item.id)}}
            className={classes.btn}
        >   <i className="fa fa-trash"> </i>
        <span> &nbsp; Удалить </span> </button>

            <Modal
                isOpen={ isOpen }
                onRequestClose={closeModal}
                style={{
                    overlay:{
                        position: "fixed",
                        backgroundColor: "rgba(215, 192, 188, 0.6)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        transform: "translate(0px, 0px)",
                        inset: "-200px",
                    },
                    content: {
                        position: 'relative',
                        inset: "-20% 0",
                        backgroundColor: "rgba(215, 192, 188, 0.6)",
                        border: "none",
                        overflow: "initial",
                        borderRadius: '20px'
                    }
                }}>
                <div className={classes.modal}>

                    <h4>Вы уверены, что хотите удалить?</h4>

                    <div className={classes.buttons}>
                        <button
                            onClick={()=>{deleteItemButton(item.id)}}
                            className={classes.btnDel}
                        ><i className="fa fa-trash">&nbsp; </i> УДАЛИТЬ </button>

                        <button
                            onClick={closeModal}
                            className={classes.btnCancel}
                        > <i className="fa fa-close">&nbsp; </i> ОТМЕНА </button>
                    </div>
                </div>
            </Modal>
    </div>
)
}
export default ButtonDelete;