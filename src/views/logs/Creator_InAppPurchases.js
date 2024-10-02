import React, {Component} from 'react'
import {CCard, CCardBody, CCol, CDataTable, CRow, CSpinner} from '@coreui/react'
import numeral from 'numeral';
import firebase from "firebase";
import constants from "../../reusable/config";
import {CIcon} from "@coreui/icons-react";
import {freeSet} from "@coreui/icons";
import moment from "moment";

const db = firebase.firestore().collection(constants.DB_IN_APP_LOGS);

export default class InAppPurchases extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            logs: [],
            stories: [],
            users: [],
            creators: []
        }
    }

    componentDidMount() {
        const uid = localStorage.getItem('uid');
        let logs = [], stories = [], users = [];
        db.where('creator_id', '==', uid).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const {
                    story_name,
                    story_id,
                    amount,
                    store_tax,
                    litty_tax,
                    user_id,
                    user_email,
                    timestamp,
                    creator_id
                } = doc.data();
                logs.push({
                    id: doc.id,
                    user_email: user_email,
                    story_name: story_name,
                    amount: parseFloat(amount),
                    store_tax: store_tax ? parseFloat(store_tax) : 0,
                    litty_tax: litty_tax ? parseFloat(litty_tax) : 0,
                    date: moment(timestamp.toDate()).local().format('MMM Do YYYY, hh:mm a')
                });
                if (stories.indexOf(story_id) === -1) stories.push(story_id);
                if (users.indexOf(user_id) === -1) users.push(user_id);
            });

            logs.forEach(element => {
                const {store_tax, litty_tax, amount} = element;
                let store_amount = store_tax ? amount * (store_tax / 100) : 0;
                let holder_amount = amount - store_amount;
                let litty_amount = litty_tax ? holder_amount - (holder_amount * (litty_tax / 100)) : 0;

                element.litty_tax = litty_amount;
                element.store_tax = store_amount;
                element.amount = amount - store_amount - litty_amount;
            })

            this.setState({isLoading: false, logs: logs, stories: stories, users: users});
        });
    }

    render() {
        const { isLoading, logs, stories, users } = this.state;

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
                                            <p className="m-0 text-muted font-weight-normal">Total Purchases</p>
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
                                            <p className="m-0 text-muted font-weight-normal">Distinct Stories</p>
                                        </div>
                                        <h3>{numeral(stories.length).format('0,0')}</h3>
                                    </CCardBody>
                                </CCard>
                            </CCol>
                            <CCol md={4}>
                                <CCard>
                                    <CCardBody>
                                        <div className="d-flex justify-content-start align-items-center mb-2">
                                            <CIcon content={freeSet.cilPeople} size="sm" className="mr-1"/>
                                            <p className="m-0 text-muted font-weight-normal">Distinct Users</p>
                                        </div>
                                        <h3>{numeral(users.length).format('0,0')}</h3>
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
                                                // { key: 'name', _classes: 'font-weight-bold' },
                                                {key: 'user_email', label: 'User'},
                                                {key: 'story_name', label: 'Story'},
                                                {key: 'litty_tax', label: 'Litty Tax'},
                                                {key: 'store_tax', label: 'Store Tax'},
                                                {key: 'amount', label: 'Earned'},
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
                                                'litty_tax':
                                                    (item) => (
                                                        <td>
                                                            {numeral(item.litty_tax.toFixed(2)).format('$ 0.00 a')}
                                                        </td>
                                                    ),
                                                'store_tax':
                                                    (item) => (
                                                        <td>
                                                            {numeral(item.store_tax.toFixed(2)).format('$ 0.00 a')}
                                                        </td>
                                                    ),
                                                'amount':
                                                    (item) => (
                                                        <td>
                                                            {numeral(item.amount.toFixed(2)).format('$ 0.00 a')}
                                                        </td>
                                                    )
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
