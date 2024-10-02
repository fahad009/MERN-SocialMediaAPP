import React, {Component} from 'react';
import firebase from "firebase";
import constants from "../../../reusable/config";
import {CButton, CCard, CCardBody, CCol, CForm, CInput, CRow, CSpinner, CTextarea} from "@coreui/react";
import {NOTIFICATION, showNotification} from "../../../reusable/Utility";

const db = firebase.firestore().collection(constants.DB_UTILS);

export default class PushNotifications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isStoryLoading: true,
            isEpisodeLoading: true,
            storyTitle: '',
            storyBody: '',
            storyIcon: '',
            episodeTitle: '',
            episodeBody: '',
            episodeIcon: ''
        }
    }

    componentDidMount() {
        db.doc('episode_notification').get()
            .then(async doc => {
                if (doc.exists) {
                    const {title, image, body} = doc.data();
                    this.setState({ isEpisodeLoading: false, episodeTitle: title, episodeIcon: image, episodeBody: body });
                } else {
                    this.setState({ isEpisodeLoading: false, episodeTitle: '', episodeIcon: '', episodeBody: '' });
                }
            })

        db.doc('story_notification').get()
            .then(async doc => {
                if (doc.exists) {
                    const {title, image, body} = doc.data();
                    this.setState({isStoryLoading: false, storyTitle: title, storyIcon: image, storyBody: body});
                } else {
                    this.setState({isStoryLoading: false, storyTitle: '', storyIcon: '', storyBody: ''});
                }
            })
    }

    onTextChange = ({currentTarget: input}) => {
        this.setState({[input.name]: input.value});
    };

    handleStorySubmit = e => {
        e.preventDefault();
        this.setState({isStoryLoading: true});
        const {storyTitle, storyBody, storyIcon} = this.state;

        db.doc('story_notification').update({
            title: storyTitle,
            image: storyIcon,
            body: storyBody,
        }).then(() => {
            showNotification(NOTIFICATION.SUCCESS, 'Successfully updated', 2000);
            this.setState({isStoryLoading: false});
        }).catch((error) => {
            
            showNotification(NOTIFICATION.ERROR, 'Something went wrong. Try again!');
            this.setState({isStoryLoading: false});
        });
    }

    handleEpisodeSubmit = e => {
        e.preventDefault();
        this.setState({isEpisodeLoading: true});
        const {episodeTitle, episodeBody, episodeIcon} = this.state;

        db.doc('episode_notification').update({
            title: episodeTitle,
            image: episodeIcon,
            body: episodeBody,
        }).then(() => {
            showNotification(NOTIFICATION.SUCCESS, 'Successfully updated', 2000);
            this.setState({isEpisodeLoading: false});
        }).catch((error) => {
            showNotification(NOTIFICATION.ERROR, 'Something went wrong. Try again!');
            this.setState({isEpisodeLoading: false});
        });
    }

    render() {
        const {
            isStoryLoading,
            isEpisodeLoading,
            storyTitle,
            storyBody,
            storyIcon,
            episodeTitle,
            episodeBody,
            episodeIcon
        } = this.state;

        return (
            <div>
                <CRow>
                    <CCol>
                        <CCard>
                            <CCardBody>
                                <CRow>
                                    <CCol md={6}>
                                        <h5>Story Push Notifications</h5>
                                        <hr className="mt-0"/>
                                        {
                                            isStoryLoading ?
                                                <div className="text-center">
                                                    <CSpinner
                                                        className="mt-5"
                                                        color="primary"
                                                        style={{width: '2rem', height: '2rem'}}
                                                    />
                                                </div> :
                                                <CForm onSubmit={this.handleStorySubmit} className="mt-4">
                                                    <CInput className="mb-2" id="storyTitle" name="storyTitle"
                                                            type="text" placeholder="Title" value={storyTitle}
                                                            onChange={this.onTextChange} required/>
                                                    <CInput className="mb-2" id="storyIcon" name="storyIcon" type="text"
                                                            placeholder="Icon URL" value={storyIcon}
                                                            onChange={this.onTextChange} required/>
                                                    <CTextarea
                                                        className="mb-2"
                                                        name="storyBody"
                                                        id="storyBody"
                                                        placeholder={'Body'}
                                                        rows="3"
                                                        value={storyBody}
                                                        onChange={this.onTextChange} required
                                                    />
                                                    <div className="text-center mt-4">
                                                        <CButton type="submit" size="sm" color="primary"
                                                                 className="px-3">Save</CButton>
                                                    </div>
                                                </CForm>
                                        }
                                    </CCol>
                                    <CCol md={6}>
                                        <h5>Episode Push Notifications</h5>
                                        <hr className="mt-0"/>
                                        {
                                            isEpisodeLoading ?
                                                <div className="text-center">
                                                    <CSpinner
                                                        className="mt-5"
                                                        color="primary"
                                                        style={{width: '2rem', height: '2rem'}}
                                                    />
                                                </div> :
                                                <CForm onSubmit={this.handleEpisodeSubmit} className="mt-4">
                                                    <CInput className="mb-2" id="episodeTitle" name="episodeTitle"
                                                            type="text" placeholder="Title" value={episodeTitle}
                                                            onChange={this.onTextChange} required/>
                                                    <CInput className="mb-2" id="episodeIcon" name="episodeIcon"
                                                            type="text" placeholder="Icon URL" value={episodeIcon}
                                                            onChange={this.onTextChange} required/>
                                                    <CTextarea
                                                        className="mb-2"
                                                        name="episodeBody"
                                                        id="episodeBody"
                                                        placeholder={'Body'}
                                                        rows="3"
                                                        value={episodeBody}
                                                        onChange={this.onTextChange} required
                                                    />
                                                    <div className="text-center mt-4">
                                                        <CButton type="submit" size="sm" color="primary"
                                                                 className="px-3">Save</CButton>
                                                    </div>
                                                </CForm>
                                        }
                                    </CCol>
                                </CRow>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol>
                        <CCard>
                            <CCardBody>
                                <h5>Placeholders</h5>
                                <hr className="mt-0"/>
                                <ul>
                                    <li><sup>%</sup>STORY_NAME<sub>%</sub> - placeholder for story name</li>
                                    <li><sup>%</sup>STORY_ICON<sub>%</sub> - placeholder for story icon URL</li>
                                    <li><sup>%</sup>CREATOR_NAME<sub>%</sub> - placeholder for creator name</li>
                                    <li><sup>%</sup>CATEGORY_NAME<sub>%</sub> - placeholder for category name <span
                                        className="text-muted font-italic">(applicable in story notifications only)</span>
                                    </li>
                                    <li><sup>%</sup>EPISODE_NUMBER<sub>%</sub> - placeholder for episode number <span
                                        className="text-muted font-italic">(applicable in episode notifications only)</span>
                                    </li>
                                </ul>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </div>
        )
    }


}
