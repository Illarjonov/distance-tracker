import React, {useMemo} from "react";
import classes from './Item.module.css'
import 'moment/locale/ru'
import * as moment from 'moment/moment';
import ButtonDelete from "./ButtonDelete/ButtonDelete";
import ItemDistance from "./ItemDistance/ItemDistance";
import ItemDate from "./ItemDate/ItemDate";

const Item = ({item}) => {

    const countDistance = useMemo(() => {
        if (item.distance === null){
            return "данные отсутствуют"
        } else {
            return item.distance >= 1000 ?
                (item.distance % 1000 === 0 ?
                        Math.floor(item.distance / 1000) + " километров" :
                        `${Math.floor(item.distance / 1000)} километров ${item.distance % 1000} метров`
                )
                : `${item.distance} метров`;
        }
    }, [item.distance]);

    const countDate = useMemo(()=>{
            let m = moment(item.date).locale('ru');
            return m.format("LL") //3 февраля
    },[item.date]);

    return(
            <div className={classes.tableItem} key={item.id}>
                <td>
                    <ItemDate item = {item} countDate = {countDate}/>   </td>
                <td>
                    <ItemDistance item = {item} countDistance={countDistance}/>     </td>
                <td>
                    <ButtonDelete item ={item}/>    </td>
                <hr/>
            </div>
    )
};
export default Item;

// const countDistance = useMemo(() => {
//     return item.distance >= 1000 ?
//         (item.distance % 1000 === 0 ?
//                 Math.floor(item.distance / 1000) + " километра" :
//                 `${Math.floor(item.distance / 1000)} километра ${item.distance % 1000} метров`
//         )
//         :
//         `${item.distance} метров`
// }, [item.distance])

///*НА ЭТУ КНОПКУ ЧТОБЫ ОТКРЫВАЛСЯ МОДАЛ, А В МОДАЛЕ ГЕТИД ИСПОЛЬЗОВАЛ АЙДИШШНИК И ЕС ШО ДЕЛАЛ ОТМЕНУ */
//В ОТОБРАЖЕНИИ СДЕЛАТЬ КАЛЕНДАРЬ С ВЫБОРОМ ДЛЯ ИЗМЕНЕНИЙ+ СДЕЛАТЬ МОДАЛ С ИЗМЕНЕНИЕМ(СКОПИРОВАТЬ), НО РЕАЛИЗОВАТЬ ПОКАЗ ЧЕРЕЗ ЮС МЕМО

