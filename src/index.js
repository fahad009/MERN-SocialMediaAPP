import 'react-app-polyfill/ie11'; // For IE 11 support
import 'react-app-polyfill/stable';
import 'core-js';
import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {icons} from './assets/icons'
import {Provider} from 'react-redux'
import store from './store'
import firebase from "firebase/app";
import 'noty/lib/noty.css'
import 'noty/lib/themes/bootstrap-v4.css'
import config from "./reusable/config";

React.icons = icons
const firebaseConfig = config.LIVE_FIREBASE_CONFIG;
// const firebaseConfig = config.TEST_FIREBASE_CONFIG;
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
