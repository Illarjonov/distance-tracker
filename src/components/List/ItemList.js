import Item from "./Item/Item";
import React from "react";
import  './ItemList.css';
import TableHeader from "./TableHeader/TableHeader";


const ItemList = ({items}) =>{

 return(
    <div className='table'>

            <TableHeader/>

            { items && true  //проверить наличие
                ?
                items.map( (item)=> {
                       return  <Item  key={item.id} item={item}/>
                })
                : <div> Данные отсутствуют </div>
            }
    </div>
     )
}
export default ItemList;