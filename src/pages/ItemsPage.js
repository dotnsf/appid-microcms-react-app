
import React, { useEffect, useRef, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

import { useAppContext } from '../context/AppContext';
import { getAllItemIds, getItemData, getAllItemsData } from '../services/items_service';

import ItemsTable from './ItemsTable';

import './ItemsPage.css';

const ItemsPage = () => {
  const app = useAppContext();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [itemIds, setItemIds] = useState([]);
  const [loginName, setLoginName] = useState('');

  const logoutAction = async () => {
    try{
      sessionStorage.setItem('loginInfo', '');
      app.setLoginInfo(null);
      navigate('/');
    }catch( e ){
      console.log( e );  //. Popup closed
    }
  }

  useEffect(() => {
    const loginInfoStr = sessionStorage.getItem('loginInfo');
    if (loginInfoStr) {
      const loginInfo = JSON.parse(loginInfoStr);
      setLoginName( loginInfo.name );
    }
  }, []);

  useEffect(() => {
    (async () => {
      async function fetchAllDataAsync(){
        const data = await getAllItemsData();
        setItems( data );
      };
      fetchAllDataAsync();
    })();
  }, []);

  return (
    <>
    <h1>Items</h1>

    <div className='textright'>
    <b>{loginName}</b>
    <button onClick={logoutAction} id="logout">Logout</button>
    </div>

    <ItemsTable items={items}/>
    </>
  )
};

export default ItemsPage;
