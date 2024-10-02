import React, {Component} from 'react'
import {CBadge, CButton, CCard, CCardBody, CCardHeader, CCol, CDataTable, CRow, CSpinner} from '@coreui/react'
import firebase from "firebase";
import 'firebase/firestore';
import constants from "../../reusable/config";
import {CIcon} from "@coreui/icons-react";
import {NOTIFICATION, showNotification} from "../../reusable/Utility";

const db = firebase.firestore().collection(constants.DB_USERS);

export default class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            users: null
        }
    }

    componentDidMount() {
        this.loadCreatorRequests();
    }

    loadCreatorRequests = () => {
        let users = [];

        db.where('status', '!=', null).orderBy('status').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let data = doc.data();
                users.push({
                    id: doc.id,
                    name: `${data.first_name} ${data.last_name}`,
                    email: data.email,
                    status: data.status
                });
            });
            this.setState({isLoading: false, users: users});
        });
    }

    getBadge = status => {
        switch (status) {
            case 'approved':
                return 'success'
            case 'requested':
                return 'warning'
            case 'denied':
                return 'danger'
            default:
                return 'secondary'
        }
    }

    setStatus = (item, status) => {
        this.setState({isLoading: true});

        db.doc(item.id).update({
            status: status,
            user_type: status === 'approved' ? 'creator' : 'user'
        }).then(() => {
            showNotification(NOTIFICATION.SUCCESS, 'Status updated successfully!');
            this.loadCreatorRequests();
        }).catch(reason => {
            
            showNotification(NOTIFICATION.ERROR, 'Something went wrong. Try again!');
        });
    }

    render() {
        const {isLoading, users} = this.state;
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
                            <CCardHeader className="d-flex justify-content-between align-items-baseline">
                                <h2>Creator Requests</h2>
                                {/*<p className="m-0 text-muted">{users.length} users found</p>*/}
                            </CCardHeader>
                            <CCardBody>
                                <CDataTable
                                    items={users}
                                    fields={[
                                        'name', 'email', 'status',
                                        {key: 'action', label: ''},
                                    ]}
                                    tableFilter
                                    hover
                                    border
                                    responsive
                                    sorter
                                    scopedSlots={{
                                        'status':
                                            (item) => (
                                                <td>
                                                    <CBadge color={this.getBadge(item.status)}>
                                                        {item.status || 'N/A'}
                                                    </CBadge>
                                                </td>
                                            ),
                                        'action':
                                            (item) => (
                                                <td className="py-2 text-center">
                                                    {
                                                        item.status === 'requested' ?
                                                            (
                                                                <div>
                                                                    <CButton
                                                                        color="success"
                                                                        size="sm"
                                                                        className="mr-1"
                                                                        onClick={() => this.setStatus(item, 'approved')}
                                                                    >
                                                                        Approve
                                                                    </CButton>
                                                                    <CButton
                                                                        color="danger"
                                                                        size="sm"
                                                                        onClick={() => this.setStatus(item, 'denied')}
                                                                    >
                                                                        Deny
                                                                    </CButton>
                                                                </div>
                                                            ) :
                                                            '-'
                                                    }
                                                </td>
                                            )
                                    }}
                                />
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            )
        )
    }
}
