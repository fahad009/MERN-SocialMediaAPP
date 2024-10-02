import React, {Component, Fragment} from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormGroup,
    CInput,
    CLabel,
    CRow, CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import firebase from "firebase";
import {NOTIFICATION, showNotification} from "../../reusable/Utility";

const directory = '_dev';
const db = firebase.firestore().collection("stories_dev");

class BasicForms extends Component {
    constructor(props) {
        super(props);
        if (props.location.state === undefined) {
            this.backToList();
        } else {
            this.state = { isLoading: false, name: '' };
        }
    }

    onNameChange = ({currentTarget: input}) => {
        this.setState({name: input.value});
    };

    handleSubmit = e => {
        e.preventDefault();
        this.setState({ isLoading: true });

        const { name } = this.state;
        const { storyID, seasonIndex } = this.props.location.state;

        db.doc(storyID).collection('seasons').add({
            name: name,
            index: seasonIndex+1
        })
            .then((docRef) => {
                showNotification(NOTIFICATION.SUCCESS, 'Season added successfully!');
                this.backToList();
            })
            .catch((error) => {
                showNotification(NOTIFICATION.ERROR, 'Something went wrong. Try again!');
                this.setState({ isLoading: false });
            });
    }

    backToList = () => {
        this.props.history.push({
            pathname: '/Stories',
            state: this.props.location.state
        });
    };

    render() {
        return (
            <>
                {
                    this.state.isLoading ? (
                        <div className="text-center">
                            <CSpinner
                                className="mt-5"
                                color="primary"
                                style={{width: '4rem', height: '4rem'}}
                            />
                        </div>
                    ) : (
                        <CRow className='d-flex justify-content-center'>
                            <CCol xs="12" md="6">
                                <CCard>
                                    <CCardHeader>
                                        <h2>Add New Season</h2>
                                    </CCardHeader>
                                    <CCardBody>
                                        <CForm onSubmit={this.handleSubmit} className="form-horizontal">
                                            <CFormGroup row className={'d-flex justify-content-center'}>
                                                <CCol xs="12" md="6">
                                                    <CInput id="name" name="name" type="text" placeholder={'Name'} maxLength={'30'} onChange={this.onNameChange} required/>
                                                </CCol>
                                            </CFormGroup>

                                            <div className="text-center mt-5">
                                                <CButton type="submit" size="sm" color="primary" className="mr-1 px-3"><CIcon
                                                    name="cil-scrubber"/> Save</CButton>
                                                <CButton type="button" onClick={this.backToList} size="sm" color="danger"
                                                         className="px-3"><CIcon name="cil-ban"/> Cancel</CButton>
                                            </div>
                                        </CForm>
                                    </CCardBody>
                                </CCard>
                            </CCol>


                        </CRow>
                    )
                }
            </>
        )
    }
}

export default BasicForms
