import React, {Component} from 'react'
import {
    CFormGroup,
    CLabel,
    CButton,
    CCard,
    CCardBody,
    CCol,
    CDataTable,
    CFormText,
    CInput,
    CModal,
    CModalBody,
    CRow,
    CSpinner, CAlert
} from '@coreui/react'
import numeral from 'numeral'
import firebase from "firebase";
import constants from "../../reusable/config";
import {CIcon} from "@coreui/icons-react";
import {freeSet} from "@coreui/icons";
import {NOTIFICATION, showNotification} from "../../reusable/Utility";
import axios from "axios";
import config from "../../reusable/config";

const db_users = firebase.firestore().collection(constants.DB_USERS);
const db_logs = firebase.firestore().collection(constants.DB_CREATOR_LOGS);

export default class Payments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            creators: [],
            totalEarned: 0,
            totalPaid: 0,
            payee: {
                id: null,
                email: ''
            },
            showModal: false,
            amount: 1,
            errorMessage: null
        }
    }

    componentDidMount() {
        let creators = [], totalEarned = 0, totalPaid = 0;

        db_users.where('user_type', '==', 'creator').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let data = doc.data();
                creators.push({
                    id: doc.id,
                    name: `${data.first_name} ${data.last_name}`,
                    email: data.email,
                    account_number: data.account_number,
                    role: data.user_type,
                    total: data.totalEarned ? parseFloat(data.totalEarned) : 0,
                    paid: data.totalPaid ? parseFloat(data.totalPaid) : 0
                });

                if (data.totalEarned) totalEarned += parseFloat(data.totalEarned);
                if (data.totalPaid) totalPaid += parseFloat(data.totalPaid);

                
            });
            this.setState({isLoading: false, creators: creators, totalEarned: totalEarned, totalPaid: totalPaid});
        }).catch(error => {
            
            showNotification(NOTIFICATION.ERROR, 'Failed to load creators.');
            this.setState({isLoading: false, creators: creators, totalEarned: totalEarned, totalPaid: totalPaid});
        });

        // this.submitPayment();
    }

    format = x => {
        return x.toLocaleString();
    }

    toggleModal = async user => {
        if (!user) {
            this.setState({
                payee: {
                    id: null,
                    email: ''
                }
            });
            return;
        }

        try {
            this.setState({isLoading: true});

            let doc = await db_users.doc(user.id).get();
            if (doc.exists) {
                const {account_number} = doc.data();
                if (account_number) {
                    // let response = await axios.get(`${config.SERVER_BASE_URL}/getAccountDetails?id=${account_number}`);
                    // const {charges_enabled} = response.data.data;
                    // if (charges_enabled) {
                    this.setState({payee: user, amount: 1});
                    // } else {
                    // charges not enabled on user account yet
                    // showNotification(NOTIFICATION.ERROR, `Charges not enabled on Creator's account yet.`);
                    // }
                } else {
                    showNotification(NOTIFICATION.ERROR, `Pending Stripe account creation from ${user.name}`);
                }
            } else {
                // error
                showNotification(NOTIFICATION.ERROR, `Failed to load creator details. Try again later.`);
            }
            this.setState({isLoading: false});
        } catch (error) {
            showNotification(NOTIFICATION.ERROR, error.message);
            this.setState({isLoading: false});
        }
    }

    onValueChange = ({currentTarget: input}) => {
        const {payee} = this.state;
        let value = parseFloat(input.value);
        this.setState({[input.name]: parseFloat(value).toString()});
        // if (value > 0.999999999 && value < (payee.total - payee.paid)) { this.setState({[input.name]: parseFloat(value).toString()}); }
        // else if (isNaN(value)) { this.setState({[input.name]: 1}); }
    };

    submitPayment = async () => {

        const {amount, payee} = this.state;

        if (amount < 0.9) {
            showNotification(NOTIFICATION.ERROR, 'Amount cannot be less than $1');
            return;
        } else if (amount > (payee.total - payee.paid)) {
            showNotification(NOTIFICATION.ERROR, `Amount cannot be greater than ${numeral(payee.total - payee.paid).format('$ 0.00 a')}`);
            return;
        }

        let response = await axios.post(`${config.SERVER_BASE_URL}/transferFunds`, {
            amount: parseFloat(amount) * 100,
            destination: payee.account_number
        });
        if (response.data.error) {
            this.setState({errorMessage: response.data.error});
        } else {
            await db_logs.add({
                admin_email: localStorage.getItem('email'),
                admin_id: localStorage.getItem('uid'),
                amount: amount,
                creator_email: payee.email,
                creator_id: payee.id,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });

            await db_users.doc(payee.id).update({
                totalPaid: (parseFloat(payee.paid) + parseFloat(amount)),
            });

            this.componentDidMount();
            showNotification(NOTIFICATION.SUCCESS, `Payment successful!`);
        }
        await this.toggleModal(null);
    }

    render() {
        const {isLoading, creators, totalEarned, totalPaid, payee, amount, errorMessage} = this.state;
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
                        <CRow>
                            <CCol md={3}>
                                <CCard>
                                    <CCardBody>
                                        <div className="d-flex justify-content-start align-items-center mb-2">
                                            <CIcon content={freeSet.cilPeople} size="sm" className="mr-1"/>
                                            <p className="m-0 text-muted font-weight-normal">Total Creators</p>
                                        </div>
                                        <h3>{numeral(creators.length).format('0,0')}</h3>
                                    </CCardBody>
                                </CCard>
                            </CCol>
                            <CCol md={3}>
                                <CCard>
                                    <CCardBody>
                                        <div className="d-flex justify-content-start align-items-center mb-2">
                                            <CIcon content={freeSet.cilCash} size="sm" className="mr-1"/>
                                            <p className="m-0 text-muted font-weight-normal">Total Earned</p>
                                        </div>
                                        <h3>{numeral(totalEarned.toFixed(2)).format('$ 0.00 a')}</h3>
                                    </CCardBody>
                                </CCard>
                            </CCol>
                            <CCol md={3}>
                                <CCard>
                                    <CCardBody>
                                        <div className="d-flex justify-content-start align-items-center mb-2">
                                            <CIcon content={freeSet.cilCash} size="sm" className="mr-1"/>
                                            <p className="m-0 text-muted font-weight-normal">Total Paid</p>
                                        </div>
                                        <h3>{numeral(totalPaid.toFixed(2)).format('$ 0.00 a')}</h3>
                                    </CCardBody>
                                </CCard>
                            </CCol>
                            <CCol md={3}>
                                <CCard>
                                    <CCardBody>
                                        <div className="d-flex justify-content-start align-items-center mb-2">
                                            <CIcon content={freeSet.cilCash} size="sm" className="mr-1"/>
                                            <p className="m-0 text-muted font-weight-normal">Total Pending</p>
                                        </div>
                                        <h3>{numeral((totalEarned - totalPaid).toFixed(2)).format('$ 0.00 a')}</h3>
                                    </CCardBody>
                                </CCard>
                            </CCol>
                        </CRow>
                        {
                            errorMessage &&
                            <CRow>
                                <CCol>
                                    <CAlert color="danger" closeButton>
                                        {errorMessage}
                                    </CAlert>
                                </CCol>
                            </CRow>
                        }
                        <CRow>
                            <CCol>
                                <CCard>
                                    <CCardBody>
                                        <CDataTable
                                            items={creators}
                                            fields={[
                                                // { key: 'name', _classes: 'font-weight-bold' },
                                                'name', 'email', 'pending', 'paid', 'total',
                                                {key: 'action', label: '', sorter: false, filter: false},
                                            ]}
                                            tableFilter
                                            hover
                                            border
                                            responsive
                                            sorter
                                            clickableRows
                                            // onRowClick={(item) => this.props.history.push(`/users/${item.id}`)}
                                            scopedSlots={{
                                                'pending':
                                                    (item) => (
                                                        <td>
                                                            {numeral((item.total - item.paid).toFixed(2)).format('$ 0.00 a')}
                                                        </td>
                                                    ),
                                                'paid':
                                                    (item) => (
                                                        <td>
                                                            {numeral(item.paid.toFixed(2)).format('$ 0.00 a')}
                                                        </td>
                                                    ),
                                                'total':
                                                    (item) => (
                                                        <td>
                                                            {numeral(item.total.toFixed(2)).format('$ 0.00 a')}
                                                        </td>
                                                    ),
                                                'action':
                                                    (item) => (
                                                        <td className="py-2 text-center">
                                                            <CButton
                                                                disabled={(item.total - item.paid) <= 0.9}
                                                                color="primary"
                                                                size="sm"
                                                                onClick={() => this.toggleModal(item)}
                                                            >
                                                                Pay Now
                                                            </CButton>
                                                        </td>
                                                    )
                                            }}
                                        />
                                    </CCardBody>
                                </CCard>
                            </CCol>
                        </CRow>
                    </CCol>
                    {
                        payee.id &&
                        <CModal
                            show={true}
                            onClose={() => this.toggleModal(null)}
                        >
                            <CModalBody>
                                <p>Please confirm the amount (in USD) you wish to pay to {payee.name}.</p>
                                <CFormGroup>
                                    <CLabel htmlFor="nf-email">Amount</CLabel>
                                    <CInput
                                        type="number"
                                        id="amount"
                                        name="amount"
                                        value={amount}
                                        placeholder="Enter amount .."
                                        onChange={this.onValueChange}
                                    />
                                    <CFormText className="help-block mb-2">minimum $1 and
                                        maximum {numeral(payee.total - payee.paid).format('$ 0.00 a')}</CFormText>
                                </CFormGroup>
                                <div className="d-flex justify-content-end">
                                    <CButton
                                        className="mr-1"
                                        color="primary"
                                        size="sm"
                                        onClick={this.submitPayment}>
                                        Confirm
                                    </CButton>
                                    <CButton
                                        color="secondary"
                                        size="sm"
                                        onClick={() => this.toggleModal(null)}>
                                        Cancel
                                    </CButton>
                                </div>
                            </CModalBody>
                        </CModal>
                    }
                </CRow>
            )
        )
    }
}
