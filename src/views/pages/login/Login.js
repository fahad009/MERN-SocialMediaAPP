import React, {Component} from 'react'
import {CButton, CCard, CCardBody, CCol, CContainer, CForm, CInput, CRow, CSpinner} from '@coreui/react'
import firebase from "firebase/app";
import 'firebase/auth';
import {NOTIFICATION, showNotification} from "../../../reusable/Utility";

class Login extends Component {
    state = {
        isLoading: false,
        email: '',
        password: ''
    };

    onInputChange = ({currentTarget: input}) => {
        this.setState({[input.name]: input.value});
    };

    handleSubmit = e => {
        e.preventDefault();
        this.setState({isLoading: true});

        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .catch((error) => {
                this.setState({ isLoading: false, password: '' });
                showNotification(NOTIFICATION.ERROR, error.message, 5000);
            })
    }

    render() {
        const { isLoading, email, password } = this.state;
        return (
            <div className="c-app c-default-layout flex-row align-items-center">
                <CContainer>
                    <CRow className="justify-content-center">
                        <CCol md="6" lg="4">
                            <CCard className="p-4">
                                <CCardBody>
                                    <CForm onSubmit={this.handleSubmit}>
                                        <h1>Login</h1>
                                        <p className="text-muted">Sign In to your account</p>
                                        <CInput type="email" name="email" value={email} placeholder="Email" autoComplete="email" className="mb-1" onChange={this.onInputChange}/>
                                        <CInput type="password" name="password" value={password} placeholder="Password" autoComplete="current-password" className="mb-4" onChange={this.onInputChange}/>
                                        <CRow>
                                            <CCol xs="6">
                                                <CButton disabled={isLoading} type="submit" color="primary" className="px-4">
                                                    {
                                                        isLoading ?
                                                            ( <CSpinner color="white" size="sm" /> )
                                                            : 'Login'
                                                    }
                                                </CButton>
                                            </CCol>
                                            {/*<CCol xs="6" className="text-right">*/}
                                            {/*    <CButton color="link" className="px-0">Forgot password?</CButton>*/}
                                            {/*</CCol>*/}
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>
                </CContainer>
            </div>
        )
    }
}

export default Login
