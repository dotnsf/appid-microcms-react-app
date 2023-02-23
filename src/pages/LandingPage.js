import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useAppContext, AppContextProvider } from '../context/AppContext';
import AppID from 'ibmcloud-appid-js';

// Notes: should be external component for reuse
const DecorateText = ({ text }) => <span dangerouslySetInnerHTML={{ __html: text }} />;

const LandingPage = () => {
  const app = useAppContext();
  const navigate = useNavigate();

  const appID = React.useMemo( () => {
    return new AppID()
  }, [] );
  const [errState, setErrState] = React.useState( false );
  const [errMessage, setErrMessage] = React.useState( '' );
  const [userName, setUserName] = React.useState( '' );

  const loginAction = async () => {
    try{
      const tokens = await appID.signin();
      setErrState( false );
      setUserName( tokens.idTokenPayload.name );

      sessionStorage.setItem('loginInfo', JSON.stringify(tokens.idTokenPayload));
      app.setLoginInfo(tokens.idTokenPayload);
      navigate(app.postLoginUrl);
    }catch( e ){
      console.log( e );  //. Popup closed
      setErrState( true );
      setErrMessage( e.message );
    }
  }

  useEffect(() => {
    const loginInfoStr = sessionStorage.getItem('loginInfo');
    if (loginInfoStr) {
      const loginInfo = JSON.parse(loginInfoStr);
      app.setLoginInfo(loginInfo);
      navigate(app.postLoginUrl);
    }

    ( async () => {
      try{
        await appID.init({
          clientId: process.env.REACT_APP_APPID_CLIENT_ID,
          discoveryEndpoint: process.env.REACT_APP_APPID_ENDPOINT
        });
      }catch( e ){
        console.log( e );
        setErrState( true );
        setErrMessage( e.message );
      }
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {!userName &&
        <button onClick={loginAction} id="login">Login</button>
      }
      {userName &&
        <button>Logout</button>
      }
    </>
  );
};

export default LandingPage;
