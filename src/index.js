import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

//router
import { BrowserRouter } from 'react-router-dom'

//store

import { Provider } from 'react-redux';
//reducer
import Store from './store'
import { AuthContextProvider } from './UI_components/context/AuthContext';
import { ChatContextProvider } from './UI_components/context/ChatContext';

ReactDOM.render(
  <AuthContextProvider>
    <ChatContextProvider>
      <React.StrictMode>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Provider store={Store}>
                <App />
            </Provider>
        </BrowserRouter>
      </React.StrictMode>
    </ChatContextProvider>
  </AuthContextProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
