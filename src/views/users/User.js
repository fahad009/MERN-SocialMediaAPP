import React, {Component} from 'react'
import {CCard, CCardBody, CCardHeader, CCol, CRow, CSpinner} from '@coreui/react'
import {NOTIFICATION, showNotification} from "../../reusable/Utility";
import firebase from "firebase";
import constants from "../../reusable/config";

const db = firebase.firestore().collection(constants.DB_USERS);

export default class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userDetails: null,
            isLoading: true
        }
    }

    componentDidMount() {
        const {id} = this.props.match.params;

        // const user = usersData.find( user => user.id.toString() === '0')
        //
        // const userDetails = user ? user :
        //     [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]]
        // 
        // this.setState({isLoading: false, userDetails: Object.entries(userDetails)});

        db.doc(id).get().then((doc) => {
            if (doc.exists) {
                
                let userDetails = Object.entries(doc.data());
                
                this.setState({isLoading: false, userDetails: userDetails});
            } else {
                
            }
        }).catch((error) => {
            
            this.setState({isLoading: false, user: null});
            showNotification(NOTIFICATION.ERROR, error.message);
        });
    }

    render() {
        const {userDetails} = this.state;
        const {id} = this.props.match.params;

        return (
            !userDetails ? (
                <div className="text-center">
                    <CSpinner
                        className="mt-5"
                        color="primary"
                        style={{width: '4rem', height: '4rem'}}
                    />
                </div>
            ) : (
                <CRow>
                    <CCol lg={6}>
                        <CCard>
                            <CCardHeader>
                                User id: {id}
                            </CCardHeader>
                            <CCardBody>
                                <table className="table table-striped table-hover">
                                    <tbody>
                                    {
                                        userDetails.map(([key, value], index) => (
                                            <tr key={index.toString()}>
                                                <td>{`${key}:`}</td>
                                                <td><strong>{value.toString()}</strong></td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </table>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            )
        )
    }
}