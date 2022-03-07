import {GET_ITEMS,
        SORT_BY_DISTANCE_PLUS,
        SORT_BY_DISTANCE_MINUS,
        SORT_BY_DATE_PLUS,
        SORT_BY_DATE_MINUS,
        DELETE_ITEM,
        EDIT_ITEM,
        ADD_ITEM,
        GET_ID,
        TOGGLE_DELETE_MODAL} from './actionTypes';

export const initialState = {
    items: [],
    itemID: null,
    deleteModalHidden: false,
};


export default function reducer(state = initialState, action) {
    switch(action.type) {

        case GET_ITEMS: return {  ...state, items: action.payload};

        case GET_ID: return{ ...state, itemID: action.payload };

        case SORT_BY_DISTANCE_PLUS:
            return {
                ...state,
                items: state.items.sort((item, item2) => {
                    const a = item.distance;
                    const b = item2.distance;
                    return a - b ;
                })
            };

        case SORT_BY_DISTANCE_MINUS:
            return {
                ...state,
                items: state.items.sort((item, item2) => {
                    const b = item.distance;
                    const a = item2.distance;
                    return a - b;
                })
            };

        case SORT_BY_DATE_PLUS:
            return {
                ...state,
                items: state.items.sort((item, item2) => {
                    const a = new Date(item.date).getTime();
                    const b = new Date(item2.date).getTime();
                    return a < b ? 1 : a > b ? -1 : 0;
                })
            };

        case SORT_BY_DATE_MINUS:
            return {
                ...state,
                items: state.items.sort((item, item2) => {
                    const a = new Date(item.date).getTime();
                    const b = new Date(item2.date).getTime();
                    return a < b ? -1 : a > b ? 1 : 0;
                })
            };

        case TOGGLE_DELETE_MODAL:
            return {
                ...state,
                deleteModalHidden: action.payload,
            };

        case DELETE_ITEM:
            const deleteIndex = state.items.findIndex((item) => item.id === state.itemID);
            state.items.splice(deleteIndex, 0);
            return {
                ...state,
                itemID: null,
            };

        case EDIT_ITEM: // => item = payload
            const index = state.items.findIndex((x) => x.id === action.payload.id);
            state.items[index].distance = action.payload.distance;
            state.items[index].date = action.payload.date;
            return {
                ...state,
                items: state.items,
                itemID: null,
            };

        case ADD_ITEM:
            return {
                ...state,
                items: [...state.items, action.payload]
            }
        default: return state;
    }
};

export const getItemsAction = (payload) => ({type: GET_ITEMS, payload});
export const sortByDistancePlusAction = () => ({type: SORT_BY_DISTANCE_PLUS});
export const sortByDistanceMinusAction = () => ({type: SORT_BY_DISTANCE_MINUS});
export const sortByDatePlusAction = () => ({type: SORT_BY_DATE_PLUS});
export const sortByDateMinusAction = () => ({type: SORT_BY_DATE_MINUS});
export const deleteItemAction = () => ({type: DELETE_ITEM });
export const editItemAction = (value) => ({type: EDIT_ITEM, payload: value});
export const addItemAction = (value) => ({type: ADD_ITEM, payload: value});
export const getID = (id) => ({type: GET_ID, payload: id});
export const toggleDeleteModal = (open) => ({type: TOGGLE_DELETE_MODAL, payload: open});