import React, {Component} from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormGroup, CImg,
    CInput,
    CInputFile,
    CLabel,
    CRow,
    CSpinner,
    CTextarea,
    CSwitch
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'
import constants from '../../reusable/config';
import moment from "moment";
import {NOTIFICATION, showNotification} from "../../reusable/Utility";

const directory = '_dev';
const switchConfig = { size: 'sm', variant: '3d', shape: 'pill' };

class BasicForms extends Component {
    constructor(props) {
        super(props);

        if (props.location.state === undefined) {
            this.backToList();
        } else {
            this.state = {
                isLoading: false,
                name: '',
                isPublished: true,
                script: '',
                icon: {
                    file: null,
                    preview: null
                },
                assets: []
            };
        }
    }

    onTextChange = ({currentTarget: input}) => {
        this.setState({[input.name]: input.value});
    };

    onSwitchChange = ({currentTarget: input}) => {
        this.setState({[input.name]: input.checked});
    };

    onImageChange = event => {
        if (event.target.files[0]) {
            this.getImagePreview(event.target.files[0]).then(preview => {
                this.setState({[event.target.name]: {file: event.target.files[0], preview: preview}});
            });
        }
    };

    onAssetsChange = async event => {
        let files = [];
        for (const file of event.target.files) {
            let preview = await this.getImagePreview(file);
            files.push({
                file: file,
                preview: preview
            });
        }
        if (files.length > 0) this.setState({assets: files});
    };

    handleSubmit = e => {
        e.preventDefault();
        this.setState({isLoading: true});

        const {name, isPublished, icon, assets, script} = this.state;
        const {storyName, storyID, seasonName, seasonID, episodeIndex} = this.props.location.state;
        let promises = [];

        const db = firebase.firestore()
            .collection('stories_dev')
            .doc(storyID)
            .collection('seasons')
            .doc(seasonID)
            .collection('episodes');

        // Add a new document with a generated id.
        db.add({
            name: name,
            isPublished: isPublished,
            index: episodeIndex + 1,
            likes: 0,
            generic_assets:''
        }).then((docRef) => {

            
            const uid = localStorage.getItem('uid');
                firebase.firestore().collection(constants.DB_USERS).doc(uid).collection('activity_feeds').add({
                    parent_id: '',
                    text: `Added new episode : ${name}`,
                    time: firebase.firestore.Timestamp.fromDate(moment.utc().toDate()),
                    user_id: uid
                });


            const path = `${directory}/stories/${storyID}/seasons/${seasonID}/episodes/${docRef.id}`;

            if (icon.file) promises.push(this.uploadFileAsPromise(path, icon.file, 'icon.png'));
            promises.push(this.uploadFileAsPromise(
                path,
                new Blob([script], {type: 'text/plain'}),
                'script.txt'
            ));
            assets.forEach(asset => {
                promises.push(this.uploadFileAsPromise(`${path}/Assets`, asset.file));
            });

            Promise.all(promises).then(r => {
                showNotification(NOTIFICATION.SUCCESS, 'Episode added successfully!');
                this.backToList();
            }).catch(e => {
                db.doc(docRef.id).delete().then(() => {
                    // showNotification(NOTIFICATION.ERROR, 'Something went wrong. Try again!');
                    showNotification(NOTIFICATION.ERROR, e.toString());
                    this.setState({isLoading: false});
                }).catch((error) => {
                    showNotification(NOTIFICATION.ERROR, error.toString());
                    this.setState({isLoading: false});
                });
            });
        }).catch((error) => {
            showNotification(NOTIFICATION.ERROR, 'Something went wrong. Try again!');
            this.setState({isLoading: false});
        });
    };

    getImagePreview = (image) => {
        return new Promise(function (resolve, reject) {
            let reader = new FileReader();
            let url = reader.readAsDataURL(image);
            reader.onloadend = function (e) {
                resolve(reader.result);
            }.bind(this);
        });
    };

    //Handle waiting to upload each file using promise
    uploadFileAsPromise(directory, file, filename = null) {
        return new Promise(function (resolve, reject) {
            filename = filename ? filename : file.name ;
            const storageRef = firebase.storage().ref(directory + "/" + filename);
            //Upload file
            let uploadTask = storageRef.put(file);
            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                null,
                (error) => {
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                        case 'storage/unauthorized':
                            
                            break;
                        case 'storage/canceled':
                            
                            break;
                        case 'storage/unknown':
                            
                            break;
                    }
                    reject(error.code);
                }, () => {
                    // Upload completed successfully, now we can get the download URL
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        resolve(downloadURL);
                    });
                }
            );
        });
    }

    backToList = () => {
        

        this.props.history.push({
            pathname: '/Stories',
            state: this.props.location.state
        });
    };


    render() {
        const {isLoading, isPublished, icon, assets} = this.state;
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
                    ) : (
                        <CRow>
                            <CCol>
                                <CCard>
                                    <CCardHeader>
                                        <h2>Add New Episode</h2>
                                    </CCardHeader>
                                    <CCardBody>
                                        <CForm onSubmit={this.handleSubmit} className="form-horizontal">
                                            <CFormGroup row className={'mb-0'}>
                                                <CCol xs="12" md="6">
                                                    <CInput id="name" name="name" type="text" placeholder="Name" maxLength={'30'}
                                                            onChange={this.onTextChange} required/>
                                                </CCol>
                                                <CCol xs="12" md="6" className={'text-right'}>
                                                    <CSwitch id={'publish'} name={'isPublished'} className={'mr-3'} size={'sm'} shape={'pill'} color={'primary'} checked={isPublished} onChange={this.onSwitchChange} />
                                                    <CLabel htmlFor="publish">
                                                        <h3>Publish</h3>
                                                    </CLabel>
                                                </CCol>
                                            </CFormGroup>

                                            <CRow>
                                                <CCol xs={'12'} md={'6'}>
                                                    <CFormGroup row className={'ml-0'}>
                                                        <CCol xs="12">
                                                            <CInputFile id="icon" name="icon" onChange={this.onImageChange} accept="image/png" required/>
                                                            <CLabel htmlFor="icon" variant="custom-file">
                                                                {icon.file ? icon.file.name : 'Select Icon'}
                                                            </CLabel>
                                                        </CCol>
                                                    </CFormGroup>
                                                    <CFormGroup row className={'ml-0'}>
                                                        <CCol xs="12">
                                                            <CInputFile id="assets"
                                                                        name="assets"
                                                                        multiple
                                                                        onChange={this.onAssetsChange}
                                                                        accept="image/png"
                                                                        required
                                                            />
                                                            <CLabel htmlFor="assets" variant="custom-file">
                                                                {assets.length > 0 ? `${assets.length} files selected` : 'Select Assets'}
                                                            </CLabel>
                                                        </CCol>
                                                    </CFormGroup>

                                                    <CFormGroup row>
                                                        <CCol xs="12" className={'pr-0'}>
                                                            <CTextarea
                                                                name="script"
                                                                id="script"
                                                                placeholder={'Enter Script here'}
                                                                rows="9"
                                                                onChange={this.onTextChange} required
                                                            />
                                                        </CCol>
                                                    </CFormGroup>
                                                </CCol>
                                                <CCol xs={'12'} md={'6'}>
                                                    <CRow className={'mb-3'}>
                                                        <CCol xs={'12'} className={'pr-0'}>
                                                            <h6 className={'mb-0 pl-2'}>Icon</h6>
                                                            <div className='border-light rounded p-1' style={{ minHeight: '50px' }}>
                                                                {
                                                                    icon.preview &&
                                                                    <CImg
                                                                        src={icon.preview}
                                                                        width={'auto'}
                                                                        height={50}
                                                                    />
                                                                }
                                                            </div>
                                                        </CCol>
                                                    </CRow>
                                                    <CRow>
                                                        <CCol xs={'12'} className={'pr-0'}>
                                                            <h6 className={'mb-0 pl-2'}>Assets</h6>
                                                            <div className='border-light rounded p-1' style={{ minHeight: '50px' }}>
                                                                {
                                                                    assets.map(asset =>
                                                                        <CImg key={asset.preview}
                                                                              src={asset.preview}
                                                                              width={'auto'}
                                                                              height={50}
                                                                              className="mx-1"
                                                                        />
                                                                    )
                                                                }
                                                            </div>
                                                        </CCol>
                                                    </CRow>
                                                </CCol>
                                            </CRow>

                                            <div className="text-center mt-5">
                                                <CButton type="submit" size="sm" color="primary"
                                                         className="mr-1 px-3"><CIcon
                                                    name="cil-scrubber"/> Save</CButton>
                                                <CButton type="button" onClick={this.backToList} size="sm"
                                                         color="danger"
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
