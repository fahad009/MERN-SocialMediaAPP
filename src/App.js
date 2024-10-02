import React, {Component} from 'react';
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom';
import './scss/style.scss';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {CSpinner} from "@coreui/react";
import config from "./reusable/config";

const loading = (
    <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
)

// Containers
const TheLayout = React.lazy(() => import(`./containers/TheLayout`));

// Pages
const Login = React.lazy(() => import(`./views/pages/login/Login`));
const Register = React.lazy(() => import(`./views/pages/register/Register`));
const Page404 = React.lazy(() => import(`./views/pages/page404/Page404`));
const Page500 = React.lazy(() => import(`./views/pages/page500/Page500`));
const UserLanding = React.lazy(() => import(`./views/UserLanding`));
const AccountLinkRefresh = React.lazy(() => import(`./views/users/AccountLinkRefresh`));

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            isLoggedIn: false,
            user: firebase.auth().currentUser,
            role: 'user'
        }

        firebase.auth().onAuthStateChanged(async (user) => {
            if (user && !this.state.isLoggedIn) {
                this.setState({isLoading: true});

                // 

                let ref = await firebase.firestore().collection(config.DB_USERS).doc(user.uid).get();
                let data = ref.data(), role = null;

                if (data.user_type) {
                    data.user_type === 'admin' ? role = `${data.user_type}_dicota` : role = data.user_type;
                } else {
                    role = 'user';
                }

                localStorage.setItem('user_type', role);
                localStorage.setItem('user_name', `${data.first_name} ${data.last_name}`);
                localStorage.setItem('uid', user.uid);
                localStorage.setItem('email', user.email);
                this.setState({isLoading: false, user: user, isLoggedIn: true, role: role});
            } else {
                this.setState({isLoading: false, user: null, isLoggedIn: false});
            }
        });

    }

    render() {
        const {isLoading, user, role} = this.state;
        return (
            isLoading ?
                <div className="text-center">
                    <CSpinner
                        className="mt-5"
                        color="primary"
                        style={{width: '4rem', height: '4rem'}}
                    />
                </div> :
                <HashRouter>
                    <React.Suspense fallback={loading}>
                        <Switch>
                            <Route exact path="/login" name="Login Page" render={
                                props => {
                                    if (!user) return <Login {...props}/>;
                                    return <Redirect to="/"/>
                                }}
                            />
                            <Route path="/user-landing" name="Welcome - Litty" render={
                                props => {
                                    if (user && role === 'user') return <UserLanding {...props}/>;
                                    else if (user && role !== 'user') return <Redirect to="/"/>
                                    return <Redirect to="/login"/>
                                }}/>
                            <Route path="/api/onboard-user/refresh" name="Account Link - Refresh" render={
                                props => {
                                    if (user && role === 'user') return <UserLanding {...props}/>;
                                    else if (user && role !== 'creator') return <Redirect to="/"/>
                                    else if (user && role === 'creator') return <AccountLinkRefresh {...props}/>
                                    return <Redirect to="/login"/>
                                }}/>
                            {/*<Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />*/}
                            {/*<Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />*/}
                            {/*<Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />*/}
                            <Route path="/" name="Home" render={
                                props => {
                                    if (user) return <TheLayout {...props}/>;
                                    return <Redirect to="/login"/>
                                }}/>
                        </Switch>
                    </React.Suspense>
                </HashRouter>
        );
    }
}

export default App;
