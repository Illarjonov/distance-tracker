import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {editItemAA} from "../../../../redux/asyncAction";
import '../../ItemList.css';
import Modal from 'react-modal';
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import classes from './ItemDistance.module.css'

const ItemDistance = ({item, countDistance}) => {
    const dispatch = useDispatch();
    //можно через инпут реф реализовать фокус на инпуты, но я не понял как
    const [isOpenDistance,setIsOpenDistance] = useState();

    let validationSchema = Yup.object().shape({
        distance: Yup.number().required('Вводите цифры').min(1),
    });

    const submitForm = (values) => {
        const body = {
            id: values.id,
            distance: values.distance,
            date: item.date
        };
        if(body.distance > 0){
            dispatch(editItemAA(body));
        } else {
            body.distance = '0';
            dispatch(editItemAA(body));
        }
        toggleModal()
    };

    const toggleModal = () =>{
        setIsOpenDistance(!isOpenDistance)
    };

    return (
<div>
    <td style={{marginLeft: "100px"}}>
        {isOpenDistance && true
        ?  <Modal
                isOpen={ isOpenDistance }
                onRequestClose={toggleModal}
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
                        padding: "20px",
                        position: 'relative',
                        inset: "-20% 0",
                        backgroundColor: "rgba(215, 192, 188, 0.6)",
                        border: "none",
                        overflow: "initial",
                        borderRadius: '10px'
                    }
                }}>

                <Formik
                    initialValues={{
                        id: item.id,
                        distance: "",
                    }}
                    onSubmit={''}
                    validationSchema={validationSchema}
                    render={({ values}) => (
                        <Form className={classes.Form}>

                            <div>Расстояние</div>
                            <div>
                                <Field
                                    type="text"
                                    name="distance"
                                    placeholder={item.distance}
                                />
                            </div>

                            <button onClick={()=>{submitForm(values)}}
                                    className={classes.button}
                            >Изменить </button>
                        </Form>
                        )}
                    />
        </Modal>
        :   <span style={{paddingRight: "5px", fontSize: "18px" }}
            >  {countDistance} </span>
        }

        <button
            onClick={toggleModal}
            className={classes.btn}
        >   <i className="fa fa-pencil-square-o"> </i>     </button>
    </td>
</div>
    )
};
export default ItemDistance;