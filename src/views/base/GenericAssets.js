import React, {Component} from 'react'
import {
    CButton,
    CCard,
    CCardBody, CCardHeader,
    CCol,
    CForm,
    CFormGroup, CImg,
    CInput,
    CInputFile,
    CLabel,
    CRow,
    CSpinner
} from '@coreui/react'
import {uuid} from 'uuidv4';
import firebase from "firebase";
import constants from "../../reusable/config";
import {NOTIFICATION, saveState, showNotification, updateEpisodeName} from "../../reusable/Utility";
import {CIcon} from "@coreui/icons-react";
import {freeSet} from "@coreui/icons";
import './style.css'

const path = `${constants.STORAGE_GENERIC_ASSETS}`;
const storage = firebase.storage();

export default class Creator_Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            assets: [],
        }
    }

    async componentDidMount() {
        const assets = await this.getFiles(`${path}/`);
        if (assets.length > 0) {
            assets.forEach(asset => {
                if (asset.endsWith('mp4')) {
                    this.setState({
                        assets: [...this.state.assets, {
                            file: null,
                            preview: 'video',
                            path: asset,
                            delete: false,
                            uuid: uuid()
                        }]
                    });
                } else if (asset.endsWith('mp3') || asset.endsWith('wav')) {
                    this.setState({
                        assets: [...this.state.assets, {
                            file: null,
                            preview: 'audio',
                            path: asset,
                            delete: false,
                            uuid: uuid()
                        }]
                    });
                } else {
                    storage.ref(asset).getDownloadURL()
                        .then((url) => {
                            this.setState({
                                assets: [...this.state.assets, {
                                    file: null,
                                    preview: url,
                                    path: asset,
                                    delete: false,
                                    uuid: uuid()
                                }]
                            });
                        }).catch((error) => {
                        showNotification(NOTIFICATION.ERROR, error.toString());
                    });
                }
                this.setState({isLoading: false});
            });
        } else {
            showNotification(NOTIFICATION.ERROR, 'No generic assets found.');
            this.setState({isLoading: false});
        }
    }

    getFiles = (fullPath) => {
        return new Promise((resolve, reject) => {
            storage.ref(fullPath).listAll()
                .then((res) => {
                    let files = [];
                    res.items.forEach((itemRef) => {
                        files.push(itemRef.fullPath);
                    });
                    resolve(files);
                }).catch((error) => {
                showNotification(NOTIFICATION.ERROR, error.toString());
                resolve([]);
            });
        });
    };

    onAssetsChange = async event => {
        let files = [];
        for (const file of event.target.files) {
            let preview = null;
            
            if (file.type === 'video/mp4') {
                preview = 'video';
            } else if (file.type === 'audio/mpeg' || file.type === 'audio/wav') {
                preview = 'audio';
            } else {
                preview = await this.getImagePreview(file);
            }

            files.push({
                file: file,
                preview: preview,
                path: null,
                delete: false,
                uuid: uuid()
            });
        }
        if (files.length > 0) this.setState({assets: [...this.state.assets, ...files]});
    };

    removeAsset = (uuid) => {
        let holder = [...this.state.assets];
        holder.forEach(asset => {
            if (asset.uuid === uuid) asset.delete = true;
        });
        this.setState({assets: [...holder]});
    }

    handleSubmit = () => {
        this.setState({isLoading: true});

        const {assets} = this.state;
        let promises = [];

        assets.forEach(asset => {
            if (asset.file && !asset.delete) {
                promises.push(this.uploadFileAsPromise(`${path}/`, asset.file));
            } else if (!asset.file && asset.delete) {
                promises.push(this.deleteFile(asset.path));
            }
        });

        Promise.all(promises).then(r => {
            showNotification(NOTIFICATION.SUCCESS, 'Generic assets updated successfully!');
            this.backToList();
        }).catch(e => {
            
            showNotification(NOTIFICATION.ERROR, 'Failed to update files. Try again!');
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
            filename = filename ? filename : file.name;
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

    deleteFile = (fullPath) => {
        return new Promise((resolve, reject) => {
            storage.ref(fullPath).delete().then(() => {
                resolve();
            }).catch((error) => {
                reject(error);
            });
        });
    }

    backToList = () => {
        this.props.history.push({
            pathname: '/dashboard',
            state: this.props.location.state
        });
    };

    render() {
        const {isLoading, assets} = this.state;

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
                                <CCard className="h-100">
                                    <CCardHeader className="d-flex justify-content-between">
                                        <h2 className="m-0">Generic Assets</h2>
                                        <CFormGroup row className={'m-0'}>
                                            <CCol xs="12">
                                                <CInputFile id="assets"
                                                            name="assets"
                                                            multiple
                                                            onChange={this.onAssetsChange}
                                                            accept="image/*, .mp4, .mp3, .wav"
                                                />
                                                <CLabel htmlFor="assets" variant="custom-file">
                                                    Add Generic Assets
                                                </CLabel>
                                            </CCol>
                                        </CFormGroup>
                                    </CCardHeader>
                                    <CCardBody className="pb-0">
                                        <CRow>
                                            <CCol>
                                                <div className='border-light rounded p-1' style={{minHeight: '50px'}}>
                                                    {
                                                        assets.length > 0 ? assets.map(asset =>
                                                            !asset.delete ?
                                                                (
                                                                    <div key={asset.uuid}
                                                                         className="overlay-container mx-1"
                                                                         style={{display: 'inline-block'}}>
                                                                        <CImg
                                                                            src={asset.preview === 'video' ? 'https://logodix.com/logo/1169537.jpg' : asset.preview === 'audio' ? 'https://images.squarespace-cdn.com/content/58b0997615d5db7211687444/1552762095547-NJ4IIN6YBKSTTQYC4QXL/image-asset.png?content-type=image%2Fpng' : asset.preview}
                                                                            width={'auto'}
                                                                            height={50}
                                                                            alt={'Asset'}
                                                                        />
                                                                        <div className="overlay"/>
                                                                        <CButton
                                                                            className="absolute-center"
                                                                            variant="ghost"
                                                                            shape="square"
                                                                            size="sm"
                                                                            onClick={() => this.removeAsset(asset.uuid)}
                                                                        >
                                                                            <CIcon content={freeSet.cilX} size="xl"
                                                                                   className="text-white m-0"/>
                                                                        </CButton>
                                                                    </div>
                                                                ) : ''
                                                        ) : <h4 className="font-weight-light m-2">No assets found</h4>
                                                    }
                                                </div>
                                            </CCol>
                                        </CRow>
                                        <div className="text-center mt-5">
                                            <CButton type="submit" size="sm" color="primary"
                                                     className="mr-1 px-3" onClick={this.handleSubmit}>Save</CButton>
                                            <CButton type="button" onClick={this.backToList} size="sm"
                                                     color="danger"
                                                     className="px-3">Cancel</CButton>
                                        </div>
                                    </CCardBody>
                                </CCard>
                            </CCol>
                        </CRow>
                    )
                }
            </>
        );
    }

}
