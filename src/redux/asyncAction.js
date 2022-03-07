import {addItemAction,
        deleteItemAction,
        editItemAction,
        getItemsAction} from "./reducer";
import axios from 'axios/index';


export const  fetchItems = () => {
        return  (dispatch) => {
            axios.get(`http://localhost:4000/walking`)
                 .then(response=> dispatch(getItemsAction(response.data)))
        }
};

export const deleteItemsAA = (itemID) =>{
        return (dispatch) =>{
            axios.delete(`http://localhost:4000/walking/${itemID}`)
                .then((response)=>{
                        if (response.status){
                            dispatch(deleteItemAction());
                            dispatch(fetchItems())
                            //как сделать с помощью useEffect обновление в данном случае?
                        }
                    }
                )
        }
};
export const editItemAA = (item) => {
        return (dispatch) => {
            axios.put(`http://localhost:4000/walking/${item.id}`, item)
                .then((response)=>{
                    if (response.status) {
                        dispatch(editItemAction(item));
                    }
                })
        }
};
export const addItemAA = (item) =>{
        return (dispatch) => {
                axios.post(`http://localhost:4000/walking/`, item)
                    .then((response) =>{
                        if (response.status) {
                            dispatch(addItemAction(item));
                        }
                    })
        }
};