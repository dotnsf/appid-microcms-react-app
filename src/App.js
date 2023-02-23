import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useAppContext, AppContextProvider } from './context/AppContext';

import LandingPage from './pages/LandingPage';
import ItemsPage from './pages/ItemsPage';

const Router = () => {
  const { loginInfo, isLoading, dialog, handleCloseDialog, setPostLoginUrl } = useAppContext();
  const location = useLocation();

  useEffect(() => {
    if (loginInfo == null && location.pathname !== '/' && location.pathname !== '/login') {
      setPostLoginUrl(location.pathname);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {!loginInfo && <Route path="*" element={<Navigate replace to="/" />} />}
        {loginInfo && <React.Fragment>
          <Route path="/top/*" element={<ItemsPage />} />
          <Route path="*" element={<Navigate replace to="/top" />} />
        </React.Fragment>}
      </Routes>
      {/*
      <LoadingDialog open={isLoading} />
      <MessageDialog open={dialog.type === 'Message'} title={dialog.title} body={dialog.body} onClose={handleCloseDialog} />
      <ConfirmDialog open={dialog.type === 'Confirm'} title={dialog.title} body={dialog.body} onClose={handleCloseDialog} />
      */}
    </React.Fragment>
  );
};

const App = () => (
  <AppContextProvider>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </AppContextProvider>
);

export default App;
