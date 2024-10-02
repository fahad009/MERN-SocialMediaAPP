import React, {Component} from 'react'
import Skeleton from 'react-loading-skeleton';
import './style.css'
// import './scene_box.css'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormGroup,
    CImg,
    CInput,
    CInputFile,
    CLabel,
    CRow,
    CSpinner,
    CSwitch,
    CTextarea,
} from '@coreui/react'
import {uuid} from 'uuidv4';
import CIcon from '@coreui/icons-react'
import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'
import {NOTIFICATION, saveState, showNotification, updateEpisodeName} from "../../reusable/Utility";
import constants from '../../reusable/config';
import {freeSet} from "@coreui/icons";

export default class EditScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            storyID: '',
            seasonID: '',
            episodeID: '',
            scenes: [],
            selectedScene: null
        }
    }

    componentDidMount() {
    }


    render() {
        const {isLoading, scenes, selectedScene} = this.state;

        return (
            <>
                {
                    isLoading ? (
                        <div className="text-center">
                            <CSpinner
                                className="mt-5"
                                color="primary"
                                style={{width: '4rem', height: '4rem'}}
                            />
                        </div>
                    ) : <CRow style={{height: '75vh'}}>
                        <CCol className="bg-white border border-right-0 rounded-left p-0 text-body">
                            {
                                scenes.map(scene => (
                                    <div className="d-flex justify-content-between border-bottom hover-able"
                                         onClick={() => this.selectScene(scene.id)}>
                                        <div className="d-flex justify-content-start align-items-center">
                                            <img src="https://via.placeholder.com/50" alt="#" className="img-fluid"
                                                 height={50} width={50}/>
                                            <div className="ml-3">
                                                <p className="m-0">{scene.name}</p>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center mr-2">
                                            <div className="text-muted text-right">
                                                <p className="m-0 small font-weight-light">Last modified</p>
                                                <p className="m-0 small font-weight-light">01/03/2021</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                            <div className="d-flex justify-content-start align-items-center bg-white border-bottom">
                                <div className="p-1">
                                    <CIcon content={freeSet.cilPlus} size="xl" className="m-2 text-warning"/>
                                </div>
                                <div className="ml-3 text-warning">
                                    <p className="m-0 font-italic font-weight-bolder">Add New Scene</p>
                                </div>
                            </div>
                        </CCol>
                        <CCol className="bg-white border p-0 text-body">
                            {/*<div className="d-flex justify-content-start align-items-center p-3 border-bottom bg-light">*/}
                            {/*    <img src="https://via.placeholder.com/100" alt="#" className="img-fluid rounded" style={{ maxHeight: '64px', width: 'auto' }}/>*/}
                            {/*</div>*/}
                            <div className="container-fluid text-white py-2"
                                 style={{height: '100%', background: '#000'}}>
                                <div className="row pr-2 pl-4 mb-2">
                                    <div className="col p-0 d-flex justify-content-end align-items-center">
                                        <div className="mr-2">
                                            <div className="rounded-pill bg-primary px-3 py-1">
                                                <p className="m-0 small">Are you...alive?</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-2 text-right pl-0">
                                        <img src="https://via.placeholder.com/50" alt="#" className="img-fluid"
                                             style={{maxHeight: '50px'}}/>
                                    </div>
                                    <div className="col-1 p-0 d-flex justify-content-center align-items-center">
                                        <div className="rounded-pill bg-gray-900 px-1 py-1">
                                            <CIcon content={freeSet.cilApps} size="sm" className="text-white-50"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row pr-2 pl-4 mb-2 justify-content-end">
                                    <div className="col pl-0">
                                        <div className="bg-gray-900 rounded text-center py-3">
                                            <p className="m-0 small">She hesitates briefly...</p>
                                        </div>
                                    </div>
                                    <div className="col-1 p-0 d-flex justify-content-center align-items-center">
                                        <div className="rounded-pill bg-gray-900 px-1 py-1">
                                            <CIcon content={freeSet.cilApps} size="sm" className="text-white-50"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row pr-2 pl-4 mb-2">
                                    <div className="col-2 p-0">
                                        <img src="https://via.placeholder.com/50" alt="#" className="img-fluid"
                                             style={{maxHeight: '50px'}}/>
                                    </div>
                                    <div className="col pl-0 d-flex justify-content-start align-items-center">
                                        <div className="rounded-pill bg-warning px-3 py-1">
                                            <p className="m-0 small">But you have to believe me...</p>
                                        </div>
                                    </div>
                                    <div className="col-1 p-0 d-flex justify-content-center align-items-center">
                                        <div className="rounded-pill bg-gray-900 px-1 py-1">
                                            <CIcon content={freeSet.cilApps} size="sm" className="text-white-50"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CCol>
                        <CCol className="bg-white border border-left-0 rounded-right text-body p-0">
                            {/*<CFormGroup className="mb-0 w-100 p-3 bg-light border-bottom">*/}
                            {/*    <CLabel htmlFor="filter">Filter by</CLabel>*/}
                            {/*    <select id="filter" className="custom-select" name="filter" onChange={this.onTextChange}>*/}
                            {/*        <option value={'0'}>Last 7 days</option>*/}
                            {/*    </select>*/}
                            {/*</CFormGroup>*/}
                            <div>
                                <div
                                    className="d-flex justify-content-between align-items-center border-bottom text-muted mx-3 px-2 py-3 border-bottom">
                                    <div className="d-flex justify-content-start align-items-center">
                                        <CIcon content={freeSet.cilFingerprint} size="lg" className="mr-1"/>
                                        <p className="m-0 font-weight-light">Taps: 0</p>
                                    </div>
                                    <div className="d-flex justify-content-start align-items-center">
                                        <CIcon content={freeSet.cilAvTimer} size="lg" className="mr-1"/>
                                        <p className="m-0 font-weight-light">Avg Time: 0</p>
                                    </div>
                                    <div className="d-flex justify-content-start align-items-center">
                                        <CIcon content={freeSet.cilCommentBubble} size="lg" className="mr-1"/>
                                        <p className="m-0 font-weight-light">Comments: 0</p>
                                    </div>
                                </div>
                            </div>
                        </CCol>
                    </CRow>
                }
            </>
        );
    }

    selectScene = id => {
        this.setState({selectedScene: id});
    }
}
