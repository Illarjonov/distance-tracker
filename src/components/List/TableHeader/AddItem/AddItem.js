import {addItemAA} from "../../../../redux/asyncAction";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import { Form, Formik, Field } from 'formik/dist/index';
import Modal from 'react-modal';
import * as Yup from 'yup';
import * as moment from 'moment/moment';
import './AddItem.module.css';
import DatePicker from "react-datepicker";
import ru from "date-fns/locale/ru";
import 'react-datepicker/dist/react-datepicker.css';
import classes from './AddItem.module.css';


const AddItem = () => {

    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    let validationSchema = Yup.object().shape({ //проверка валидности
        date: Yup.date().required(),
        distance: Yup.number().required(),
    });

    const submitForm = (values) => {
        const body = {
            id: '',
            date:values.date,
            distance: values.distance,
        };
        body.id = Date.now();
        body.date = moment(body.date).format("MM.DD.YYYY");
        if (body.date !== 'Invalid date'){
            dispatch(addItemAA(body));
        } else {alert('Введите дату')}
        setIsOpen(false)
    };


    return(
<div>
       <button
           onClick={ toggleModal }
           className={classes.btn}
       >   <i className="fa fa-plus"> </i> <span> &nbsp; Добавить</span>   </button>

       <Modal
        className = "modal"
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        style={{
               overlay:{
                   backgroundColor: "rgba(214,235,183,0.9)",
                   position: "fixed",
                   display: "flex",
                   justifyContent: "center",
                   alignItems: "center",
                   transform: "translate(0px, 0px)",
                   inset: "-200px",
               },
               content: {
                   display: "flex",
                   alignItems: "center",
                   flexDirection: "column",
                   backgroundColor: "rgb(214,235,183, 0.9)",
                   position: 'relative',
                   inset: "-20% 0",
                   border: "none",
                   overflow: "initial",
                   borderRadius: '20px',
                   paddingLeft:"20px",
                   paddingRight:"20px"
               }
       }}>

    <Formik
        initialValues={{
            date: "",
            distance: "",
        }}
        onSubmit={''}
        validationSchema={validationSchema}
        render={({ setFieldValue, values}) => (
                <Form>

                    <h4> Введите данные о прогулке </h4>
                    <div>
                        <div>
                            <DatePicker
                                locale = {ru}
                                autoComplete="off"
                                name="date"
                                showYearDropdown
                                maxDate={new Date()}
                                selected={values.date}
                                placeholderText={"Дата"}
                                onChange={(e) => {
                                    setFieldValue('date', e)
                                }}
                            />
                        </div>

                        <div>
                            <Field
                                type="text"
                                name="distance"
                                placeholder={"Расстояние"}
                            />
                        </div>

                        <span>
                            <button
                                onClick={()=>{submitForm(values)}}
                                className={classes.button}
                            >  <i className="fa fa-plus"> </i> &nbsp; Добавить </button>
                        </span>
                    </div>
                </Form>
            )}
        />
    </Modal>
</div>
    )
}

export default AddItem;