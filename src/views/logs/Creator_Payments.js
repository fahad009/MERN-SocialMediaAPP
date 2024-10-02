import React, {Component} from 'react'
import {CCard, CCardBody, CCol, CDataTable, CRow, CSpinner} from '@coreui/react'
import numeral from 'numeral';
import firebase from "firebase";
import constants from "../../reusable/config";
import {CIcon} from "@coreui/icons-react";
import {freeSet} from "@coreui/icons";
import moment from "moment";

const db = firebase.firestore().collection(constants.DB_CREATOR_LOGS);

export default class CreatorPayments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            logs: [],
            totalPaid: 0,
            admins: [],
            creators: []
        }
    }

    componentDidMount() {
        const uid = localStorage.getItem('uid');
        let logs = [], totalPaid = 0, admins = [], creators = [];
        db.where('creator_id', '==', uid).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const {amount, admin_email, creator_email, admin_id, timestamp, creator_id} = doc.data();
                const amount_d = parseFloat(amount);
                logs.push({
                    id: doc.id,
                    admin_email: admin_email,
                    amount: amount_d,
                    date: moment(timestamp.toDate()).local().format('MMM Do YYYY, hh:mm a')
                });
                totalPaid += amount_d;
                if (admins.indexOf(admin_id) === -1) admins.push(admin_id);
            });
            
            this.setState({isLoading: false, logs: logs, totalPaid: totalPaid, admins: admins, creators: creators});
        });
    }

    render() {
        const { isLoading, logs, totalPaid, admins } = this.state;

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
                            <CCol md={4}>
                                <CCard>
                                    <CCardBody>
                                        <div className="d-flex justify-content-start align-items-center mb-2">
                                            <CIcon content={freeSet.cilCash} size="sm" className="mr-1"/>
                                            <p className="m-0 text-muted font-weight-normal">Total Transfers</p>
                                        </div>
                                        <h3>{numeral(logs.length).format('0,0')}</h3>
                                    </CCardBody>
                                </CCard>
                            </CCol>
                            <CCol md={4}>
                                <CCard>
                                    <CCardBody>
                                        <div className="d-flex justify-content-start align-items-center mb-2">
                                            <CIcon content={freeSet.cilShortText} size="sm" className="mr-1"/>
                                            <p className="m-0 text-muted font-weight-normal">Total Received</p>
                                        </div>
                                        <h3>{numeral(totalPaid.toFixed(2)).format('$ 0.00 a')}</h3>
                                    </CCardBody>
                                </CCard>
                            </CCol>
                            <CCol md={4}>
                                <CCard>
                                    <CCardBody>
                                        <div className="d-flex justify-content-start align-items-center mb-2">
                                            <CIcon content={freeSet.cilPeople} size="sm" className="mr-1"/>
                                            <p className="m-0 text-muted font-weight-normal">Distinct Admins</p>
                                        </div>
                                        <h3>{numeral(admins.length).format('0,0')}</h3>
                                    </CCardBody>
                                </CCard>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol>
                                <CCard>
                                    <CCardBody>
                                        <CDataTable
                                            items={logs}
                                            fields={[
                                                {key: 'admin_email', label: 'Admin'},
                                                {key: 'amount', label: 'Amount'},
                                                {key: 'date', label: 'Date/Time'},
                                            ]}
                                            tableFilter
                                            hover
                                            border
                                            responsive
                                            sorter
                                            // clickableRows
                                            // onRowClick={(item) => this.props.history.push(`/users/${item.id}`)}
                                            scopedSlots={{
                                                'amount':
                                                    (item) => (
                                                        <td>
                                                            {numeral(item.amount.toFixed(2)).format('$ 0.00 a')}
                                                        </td>
                                                    ),
                                                // 'date':
                                                //     (item) => (
                                                //         <td>
                                                //             {numeral(item.paid.toFixed(2)).format('($ 0.00 a)')}
                                                //         </td>
                                                //     )
                                            }}
                                        />
                                    </CCardBody>
                                </CCard>
                            </CCol>
                        </CRow>
                    </CCol>
                </CRow>
            )
        )
    }
}
