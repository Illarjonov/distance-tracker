import React, {Suspense, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import ItemList from "./components/List/ItemList";
import {fetchItems} from "./redux/asyncAction";
import "./App.css";
import Loader from "./components/UI/loader/loader";

const Chart = React.lazy(() => import('./components/Chart/Chart') );    //ленивая подгрузка

function App() {

    const dispatch = useDispatch();

    useEffect(()=>{
          dispatch(fetchItems())
    },[dispatch]);

    useSelector((state)=> state);//обновить чтобы работала сортировка
    const items = useSelector((state)=> state.items); //получить массив

 return (
     <div className='App'>

         <ItemList items={items}/>

         <Suspense fallback = {<div>  <Loader/>  </div>}>
            <Chart items = {items} />
         </Suspense>

      </div>
 );
}

export default App;
//закинуть в стор диспатч=юсдиспатч