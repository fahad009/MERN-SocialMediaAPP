import React, {Component} from 'react'
import {CBadge, CButton, CCard, CCardBody, CCardHeader, CCol, CDataTable, CRow, CSpinner} from '@coreui/react'
import firebase from "firebase";
import 'firebase/firestore';
import constants from "../../reusable/config";
import {CIcon} from "@coreui/icons-react";
import {NOTIFICATION, showNotification} from "../../reusable/Utility";
import axios from "axios";

const db = firebase.firestore().collection(constants.DB_USERS);

export default class AccountLinkRefresh extends Component {

    async componentDidMount() {
        const uid = localStorage.getItem('uid');
        try {

            const doc = await db.doc(uid).get();
            const {account_number} = doc.data();

            if (account_number) {
                let response = await axios.post(`${constants.SERVER_BASE_URL}/onboardUser`, {accountID: account_number});
                window.open(response.data.url, '_self');
            } else {
                
                // go to root.
            }
        } catch (e) {
            
            showNotification(NOTIFICATION.ERROR, e.message);
            // this.props.history.push('/');
        }
    }

    render() {
        return (
            <div>
            </div>
        );
    }

}
