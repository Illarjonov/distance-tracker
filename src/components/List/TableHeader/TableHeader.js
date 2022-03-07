import {useDispatch, useSelector} from "react-redux";
import React, {useCallback} from "react";
import {
    sortByDateMinusAction,
    sortByDatePlusAction,
    sortByDistanceMinusAction,
    sortByDistancePlusAction
} from "../../../redux/reducer";
import AddItem from "./AddItem/AddItem";
import classes from './TableHeader.module.css';

const TableHeader = () =>{
    const dispatch = useDispatch();
    useSelector((state)=> state);//обновить чтобы работала сортировка

    const sortByDistancePlus = useCallback(() => {dispatch(sortByDistancePlusAction())},[dispatch]);
    const sortByDistanceMinus = useCallback(() => {dispatch(sortByDistanceMinusAction())},[dispatch]);
    const sortByDatePlus = useCallback(() => {dispatch(sortByDatePlusAction())},[dispatch]);
    const sortByDateMinus = useCallback(() => {dispatch(sortByDateMinusAction())},[dispatch]);

    return(
<div className={classes.tableRow}>
                <td className={classes.info}>

                    <span>Дата</span>

                    <button
                        onClick={ sortByDateMinus }
                        className={classes.btn}
                    ><i className="fa fa-sort-amount-asc"> </i>  </button>

                    <button
                        onClick={ sortByDatePlus }
                        className={classes.btn}
                    ><i className="fa fa-sort-amount-desc"> </i>  </button>
                </td>

                <td className={classes.info}>

                    <span>Расстояние</span>

                    <button
                        onClick={ sortByDistancePlus }
                        className={classes.btn}
                    > <i className="fa fa-sort-amount-asc"> </i>  </button>

                    <button
                        onClick={ sortByDistanceMinus }
                        className={classes.btn}
                    > <i className="fa fa-sort-amount-desc"> </i>  </button>
                </td>

                <td className={classes.infoAdd} >
                    <AddItem/>
                </td>
</div>
            )
       }
export default TableHeader;