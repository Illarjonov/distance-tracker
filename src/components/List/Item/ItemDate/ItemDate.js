import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {editItemAA} from "../../../../redux/asyncAction";
import '../../ItemList.css';
import s from './ItemDate.module.css'
import Modal from 'react-modal';
import {Form, Formik} from "formik";
import * as Yup from "yup";
import * as moment from 'moment/moment';
import 'moment/locale/ru'
import DatePicker from "react-datepicker";
import ru from "date-fns/locale/ru";
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const ItemDate = ({item, countDate}) => {
    const dispatch = useDispatch();
    //можно через инпут реф реализовать фокус на инпуты, но я не понял как7
    const [isOpenDate,setIsOpenDate] = useState();

    let validationSchema = Yup.object().shape({
        date: Yup.date().required(),
    });

    const submitForm = (values) => {
        const body = {
            id: values.id,
            date: values.date,
            distance: item.distance
        };
        body.date = moment(body.date).format("MM.DD.YYYY");
        if (body.date !== 'Invalid date'){
            dispatch(editItemAA(body));
        } else {alert('Введите дату')}
        toggleModal()
    };

    const toggleModal = () =>{
        setIsOpenDate(!isOpenDate)
    };

    return (
        <div className={s.FormGlobal}>
            {isOpenDate && true
                ?  <Modal
                    isOpen={ isOpenDate }
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
                            position: 'relative',
                            inset: "-20% 0",
                            backgroundColor: "rgba(215, 192, 188, 0.6)",
                            border: "none",
                            overflow: "initial",
                            borderRadius: '10px'
                        }
                    }}
                    >
                    <Formik
                        initialValues={{
                            id: item.id,
                            date: "",
                        }}
                        onSubmit={''}
                        validationSchema={validationSchema}
                        render={({ setFieldValue, values}) => (
                            <Form>

                                <div className={s.header}>Дата (MM/DD/YYYY)</div>

                                <div className={s.form}>
                                    <DatePicker
                                        locale = {ru}
                                        autoComplete="off"
                                        name="date"
                                        showYearDropdown
                                        maxDate={new Date()}
                                        selected={values.date}
                                        placeholderText={item.date}
                                        onChange={(e) => {
                                            setFieldValue('date', e)
                                        }}
                                    />
                                </div>

                                <button
                                    onClick={()=>{submitForm(values)}}
                                    className={s.button}
                                >Изменить </button>
                            </Form>
                        )}
                    />
                </Modal>
                :   <span style={{paddingRight: "5px", fontSize: "18px" }}>  {countDate} </span>
            }

            <button
                onClick={toggleModal}
                className={s.btn}
            >   <i className="fa fa-pencil-square-o"> </i>     </button>
        </div>
    )
};
export default ItemDate;