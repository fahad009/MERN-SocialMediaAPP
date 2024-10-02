import React, {Component} from 'react';
import {CButton, CCol, CContainer, CImg, CRow, CSpinner} from "@coreui/react";
import config from '../reusable/config';
import {NOTIFICATION, showNotification} from "../reusable/Utility";
import firebase from 'firebase';
import 'firebase/firestore';

const db = firebase.firestore().collection(config.DB_USERS);

export default class UserLanding extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: 'abc',
            isLoading: true,
            isSubmitted: false,
            name: 'DICOTA',
            status: null
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        const uid = localStorage.getItem('uid');
        db.doc(uid).get().then(doc => {
            if (doc.exists) {
                const {first_name, last_name, status} = doc.data();
                this.setState({
                    uid: uid,
                    name: `${first_name} ${last_name}`,
                    status: status,
                    isLoading: false,
                    isSubmitted: false
                })
            }
        }).catch(error => {
            
            showNotification(NOTIFICATION.ERROR, 'Failed to load creator data, try refreshing the page.');
        });
    }

    request = () => {
        const uid = localStorage.getItem('uid');
        this.setState({isSubmitted: true});

        db.doc(uid).update({
            status: 'requested',
            totalEarned: 0,
            totalPaid: 0
        }).then(() => {
            showNotification(NOTIFICATION.SUCCESS, 'Request submitted successfully!');
            this.loadData();
        }).catch(reason => {
            
            showNotification(NOTIFICATION.ERROR, 'Something went wrong. Try again!');
        });
    }

    logout = () => {
        this.setState({isLoading: true});
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            localStorage.removeItem('uid');
            localStorage.removeItem('user_type');
            localStorage.removeItem('user_name');
        }).catch((error) => {
            showNotification(NOTIFICATION.ERROR, error.message);
        });
    };

    render() {
        const {isLoading, status} = this.state;

        return (
            <div className="c-app c-default-layout flex-row align-items-center">
                <CContainer>
                    <CRow className="justify-content-center">
                        <CCol md="6" className="text-center">
                            {
                                isLoading ? (
                                    <div className="text-center">
                                        <CSpinner
                                            className="mt-5"
                                            color="primary"
                                            style={{width: '4rem', height: '4rem'}}
                                        />
                                    </div>
                                ) : status === 'requested' ? this.isRequested() :
                                    status === 'denied' ? this.isDenied() :
                                        this.isUser()
                            }
                        </CCol>
                    </CRow>
                </CContainer>
            </div>
        )
    }

    isDenied = () => {
        const {name, isLoading} = this.state;

        return (
            <div>
                <div className="clearfix text-left">
                    <CImg
                        src={'creator.svg'}
                        alt="Become a creator!"
                        className="float-left mr-3"
                        style={{maxWidth: '30%', height: 'auto'}}
                    />
                    <h4 className="pt-3">Welcome back, {name}!</h4>
                    <p className="text-muted">Your request to become a creator has been <span
                        className="text-danger">DENIED</span> by Admin. For further information, please contact Support.
                    </p>
                </div>
                <CButton color="primary" className="mr-1" onClick={this.request} disabled={isLoading}>{
                    isLoading ?
                        (<CSpinner color="white" size="sm"/>)
                        : 'Request Again'
                }</CButton>
                <CButton color="secondary" onClick={this.logout}>Log Out</CButton>
            </div>
        );
    }

    isRequested = () => {
        const {name} = this.state;

        return (
            <div>
                <div className="clearfix text-left">
                    <CImg
                        src={'creator.svg'}
                        alt="Become a creator!"
                        className="float-left mr-3"
                        style={{maxWidth: '30%', height: 'auto'}}
                    />
                    <h4 className="pt-3">Welcome back, {name}!</h4>
                    <p className="text-muted">Your request to become a creator has already been submitted and is
                        awaiting Admin approval.</p>
                </div>
                <CButton color="secondary" onClick={this.logout}>Log Out</CButton>
            </div>
        );
    }

    isUser = () => {
        const {name, isLoading} = this.state;

        return (
            <div>
                <div className="clearfix text-left">
                    <CImg
                        src={'creator.svg'}
                        alt="Become a creator!"
                        className="float-left mr-3"
                        style={{maxWidth: '30%', height: 'auto'}}
                    />
                    <h4 className="pt-3">Welcome, {name}!</h4>
                    <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
                <CButton color="primary" className="mr-1" onClick={this.request} disabled={isLoading}>{
                    isLoading ?
                        (<CSpinner color="white" size="sm"/>)
                        : 'Request Now'
                }</CButton>
                <CButton color="secondary" onClick={this.logout}>Log Out</CButton>
            </div>
        );
    }
}
