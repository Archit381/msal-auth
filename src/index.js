import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "./styles/theme";
import { BrowserRouter } from "react-router-dom";
import App from './App';

import { PublicClientApplication, EventType } from '@azure/msal-browser';

const pca=new PublicClientApplication({
    auth:{
        clientId: 'cc6ffe01-47f8-4532-a84d-d789df590cb3',
        authority: 'https://login.microsoftonline.com/2c5bdaf4-8ff2-4bd9-bd54-7c50ab219590',
        redirectUri: '/',
    }
})

pca.addEventCallback(event=>{
    if(event.eventType===EventType.LOGIN_SUCCESS){
        console.log(event);
        pca.setActiveAccount(event.payload.account);
    }
})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <App msalInstance={pca}/>
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>
);
