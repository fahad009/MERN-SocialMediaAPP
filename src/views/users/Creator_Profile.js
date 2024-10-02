import React, {Component} from 'react'
import {CButton, CCard, CCardBody, CCol, CForm, CFormGroup, CInput, CLabel, CRow, CSpinner} from '@coreui/react'
import firebase from "firebase";
import constants from "../../reusable/config";
import {NOTIFICATION, showNotification} from "../../reusable/Utility";

const db = firebase.firestore().collection(constants.DB_USERS);

export default class Creator_Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isSubmitted: false
        }
    }

    componentDidMount() {
        const uid = localStorage.getItem('uid');
        db.doc(uid).get().then(doc => {
            if (doc.exists) {
                const {first_name, last_name, email, account_number} = doc.data();
                this.setState({
                    uid: uid,
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    account_number: account_number
                })
            }
        }).catch(error => {
            // 
            showNotification(NOTIFICATION.ERROR, 'Failed to load creator data, try refreshing the page.');
            this.setState({totalEarned: 0, totalPaid: 0});
        })
    }

    onValueChange = ({currentTarget: input}) => {
        this.setState({[input.name]: input.value});
    };

    handleSubmit = e => {
        e.preventDefault();
        this.setState({isSubmitted: true});

        const {uid, first_name, last_name} = this.state;
        db.doc(uid).update({
            first_name: first_name,
            last_name: last_name
        }).then(() => {
            showNotification(NOTIFICATION.SUCCESS, 'Profile updated successfully.');
            this.setState({isSubmitted: false});
        }).catch(error => {
            // 
            showNotification(NOTIFICATION.ERROR, 'Failed to save data, try again later.');
            this.setState({isSubmitted: false});
        })
    }

    render() {
        const {isLoading, isSubmitted, first_name, last_name, email, account_number} = this.state;

        return (
            isLoading ? (
                <div className="text-center">
                    <CSpinner
                        className="mt-5"
                        color="primary"
                        style={{width: '4rem', height: '4rem'}}
                    />
                </div>
            ) : (
                <CRow>
                    <CCol>
                        <CCard>
                            <CCardBody>
                                <h2>My Profile</h2>
                                <hr/>
                                <CForm onSubmit={this.handleSubmit} className="form-horizontal">
                                    <CRow>
                                        <CCol xs={'12'} md={'6'}>
                                            <CFormGroup>
                                                <CLabel htmlFor="first_name">First Name</CLabel>
                                                <CInput id="first_name" name="first_name" value={first_name}
                                                        onChange={this.onValueChange}
                                                        placeholder={'First Name'} required/>
                                            </CFormGroup>
                                        </CCol>
                                        <CCol xs={'12'} md={'6'}>
                                            <CFormGroup>
                                                <CLabel htmlFor="last_name">Last Name</CLabel>
                                                <CInput id="last_name" name="last_name" value={last_name}
                                                        onChange={this.onValueChange}
                                                        placeholder={'Last Name'} required/>
                                            </CFormGroup>
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol xs={'12'} md={'6'}>
                                            <CFormGroup>
                                                <CLabel htmlFor="email">Email Address</CLabel>
                                                <CInput type="email" id="email" name="email" value={email}
                                                        placeholder={'Email Address'} disabled/>
                                            </CFormGroup>
                                        </CCol>
                                        <CCol xs={'12'} md={'6'}>
                                            <CFormGroup>
                                                <CLabel htmlFor="account_number">Stripe Account Number</CLabel>
                                                <CInput id="account_number" name="account_number" value={account_number}
                                                        onChange={this.onValueChange}
                                                        placeholder={'Stripe Account Number'} disabled/>
                                            </CFormGroup>
                                        </CCol>
                                    </CRow>
                                    <div className="text-center mt-2">
                                        <CButton type="submit" size="sm" color="primary"
                                                 className="mr-1 px-3" disabled={isSubmitted}>
                                            {
                                                isSubmitted ?
                                                    (<CSpinner color="white" size="sm"/>)
                                                    : 'Save'
                                            }
                                        </CButton>
                                    </div>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            )
        )
    }

}
