import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {FireBase,AuthFireBase} from './Store/FirebaseContex'
import { Apps,Auth } from './Firebase/config';
import Contex from './Store/AuthContexProvider';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FireBase.Provider value={{data:Apps}}>
      <AuthFireBase.Provider value={{Auth}}>
        <Contex>
          <App />
        </Contex>
      </AuthFireBase.Provider>
    </FireBase.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

