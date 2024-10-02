import React, {Component} from 'react';
import Skeleton from 'react-loading-skeleton';
import MDEditor from '@uiw/react-md-editor';
import 'react-quill/dist/quill.snow.css';
import './style.css';
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
    CInputCheckbox,
    CInputFile,
    CLabel,
    CNav,
    CNavItem,
    CNavLink,
    CRow,
    CSpinner,
    CTabContent,
    CTabPane,
    CTabs,
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
import axios from "axios";

let db = null;
const storage = firebase.storage();

const modules = {
    toolbar: [
        [{'header': [1, 2, false]}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean']
    ],
}

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
]

class EditEpisode extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            name: '',
            isPublished: false,
            price: 'free',
            script: '',
            icon: {
                file: null,
                preview: null
            },
            starting_blocks: 1,
            isScriptUpdated: false,
            isContentUpdated: false,
            eReaderText: '',
            assets: [],
            gen_assets: []
        };
    }

    async componentDidMount() {

        let path = `${constants.STORAGE_GENERIC_ASSETS}`;
        const assets = await this.getFiles(`${path}/`);
        
        if (assets.length > 0) {
            assets.forEach(asset => {
                if (asset.endsWith('mp4')) {
                    
                    var id = uuid();
                    this.setState({
                        assets: [...this.state.assets, {
                            file: null,
                            preview: 'video/mp4',
                            path: asset,
                            delete: false,
                            uuid: id
                        }],
                        gen_assets: [...this.state.gen_assets, {
                            file: null,
                            preview: 'video/mp4',
                            path: asset,
                            delete: false,
                            uuid: id
                        }]
                    });
                } else if (asset.endsWith('mp3') || asset.endsWith('wav')) {
                    var id = uuid();
                    this.setState({
                        assets: [...this.state.assets, {
                            file: null,
                            preview: 'audio/mpeg',
                            path: asset,
                            delete: false,
                            uuid: id
                        }],
                        gen_assets: [...this.state.gen_assets, {
                            file: null,
                            preview: 'audio/mpeg',
                            path: asset,
                            delete: false,
                            uuid: id
                        }]
                    });
                } else {
                    storage.ref(asset).getDownloadURL()
                        .then((url) => {
                            var id = uuid();
                            this.setState({
                                assets: [...this.state.assets, {
                                    file: null,
                                    preview: url,
                                    path: asset,
                                    delete: false,
                                    uuid: id
                                }],
                                gen_assets: [...this.state.gen_assets, {
                                    file: null,
                                    preview: url,
                                    path: asset,
                                    delete: false,
                                    uuid: id
                                }]
                            });
                        }).catch((error) => {
                        showNotification(NOTIFICATION.ERROR, error.toString());
                    });
                }
                this.setState({isLoading: false});
            });
        }

        if (this.props.location.state === undefined) {
            showNotification(NOTIFICATION.ERROR, 'Episode ID not found');
            this.backToList();
            return;
        }
        const {storyID, seasonID, episodeID} = this.props.location.state;
        path = `${constants.STORAGE_STORIES}/stories/${storyID}/seasons/${seasonID}/episodes/${episodeID}`;
        db = firebase.firestore()
            .collection(constants.DB_STORIES)
            .doc(storyID)
            .collection('seasons')
            .doc(seasonID)
            .collection('episodes');

        db.doc(episodeID).get().then(async (doc) => {
            if (doc.exists) {
                let {isPublished, index, name, price, starting_blocks, generic_assets, data} = doc.data();
                if (starting_blocks === undefined) {
                    starting_blocks = this.state.starting_blocks;
                }

                this.setState({
                    generic_assets: generic_assets,
                    index: index,
                    name: name,
                    eReaderText: data ? data : '',
                    price: price ? price : 'free',
                    starting_blocks: starting_blocks,
                    isPublished: (isPublished === true)
                });

                storage.ref(`${path}/icon.png`).getDownloadURL()
                    .then((url) => {
                        this.setState({icon: {file: null, preview: url}});
                    }).catch((error) => {
                    showNotification(NOTIFICATION.ERROR, 'Icon not found');
                });

                storage.ref(`${path}/script.txt`).getDownloadURL()
                    .then((url) => {
                        fetch(url).then((response) => {
                            response.text().then((text) => {
                                this.setState({script: text});
                            });
                        }).catch((error) => {
                            showNotification(NOTIFICATION.ERROR, 'Error fetching script file');
                        });
                    }).catch((error) => {
                    showNotification(NOTIFICATION.ERROR, 'Script file not found');
                });

                // storage.ref(`${path}/content.txt`).getDownloadURL()
                //     .then((url) => {
                //         fetch(url).then((response) => {
                //             response.text().then((text) => {
                //                 this.setState({eReaderText: text});
                //             });
                //         }).catch((error) => {
                //             showNotification(NOTIFICATION.ERROR, 'Error fetching e-reader content file');
                //         });
                //     }).catch((error) => {
                //     showNotification(NOTIFICATION.ERROR, 'E-reader content file not found');
                // });

                let assets = await this.getFiles(`${path}/Assets`);
                if (assets.length > 0) {
                    assets.forEach(asset => {
                        if (asset.endsWith('mp4')) {
                            this.setState({
                                assets: [...this.state.assets, {
                                    file: null,
                                    preview: 'video/mp4',
                                    path: asset,
                                    delete: false,
                                    uuid: uuid()
                                }]
                            });
                        } else if (asset.endsWith('mp3')) {
                            this.setState({
                                assets: [...this.state.assets, {
                                    file: null,
                                    preview: 'audio/mpeg',
                                    path: asset,
                                    delete: false,
                                    uuid: uuid()
                                }]
                            });
                        } else if (asset.endsWith('wav')) {
                            this.setState({
                                assets: [...this.state.assets, {
                                    file: null,
                                    preview: 'audio/wav',
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
                    });


                    if (generic_assets !== undefined) {

                        const gen_assets = this.state.gen_assets;
                        assets = this.state.assets;
                        
                        gen_assets.forEach(globel_asset => { // loop on globel gen_assets
                            generic_assets.forEach(db_asset => {    // loop on in db
                                if (globel_asset.path === db_asset.path && db_asset.delete) globel_asset.delete = true;
                            });
                        });

                        gen_assets.forEach(globel_asset => { // loop on globel gen_assets
                            let a = 0;
                            assets.forEach(asset => { // loop to change value to asset if deleted
                                if (globel_asset.path === asset.path && globel_asset.delete) assets[a].delete = true;
                                a++;
                            });
                        });

                        // 
                        // 

                        this.setState({assets: assets, gen_assets: gen_assets})
                    }
                } else {
                    showNotification(NOTIFICATION.ERROR, 'Assets not found');
                }
                this.setState({isLoading: false});
            } else {
                showNotification(NOTIFICATION.ERROR, 'Invalid episode ID!');
                this.backToList();
            }
        }).catch((error) => {
            showNotification(NOTIFICATION.ERROR, `Error: ${error.toString()}`);
            this.backToList();
        });
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

    onTextChange = ({currentTarget: input}) => {
        this.setState({[input.name]: input.value});
    };

    onSwitchChange = ({currentTarget: input}) => {
        this.setState({[input.name]: input.checked});
    };

    onCheckboxChange = ({currentTarget: input}) => {
        this.setState({[input.name]: input.checked});
    };

    onQuillChange = (value) => {
        this.setState({eReaderText: value});
    }

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
            let preview = null;
            
            if (file.type === 'video/mp4') {
                preview = 'video/mp4';
            } else if (file.type === 'audio/mpeg') {
                preview = 'audio/mpeg';
            } else if (file.type === 'audio/wav') {
                preview = 'audio/wav';
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

        var holder1 = [...this.state.gen_assets];
        holder1.forEach(asset => {
            if (asset.uuid === uuid) asset.delete = true;
        });
        


        this.setState({assets: [...holder], gen_assets: [...holder1]});
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({isLoading: true});

        const {
            index,
            name,
            isPublished,
            icon,
            assets,
            script,
            eReaderText,
            price,
            starting_blocks,
            isScriptUpdated,
            isContentUpdated
        } = this.state;
        const {storyID, seasonID, episodeID} = this.props.location.state;
        let promises = [];
        

        if (name.trim() === '') {
            showNotification(NOTIFICATION.WARNING, 'Name is required', 1500);
            return;
        }

        if (!isPublished) {
            // send episode notification
            axios.post(`${constants.SERVER_BASE_URL}/sendEpisodeNotification`, {
                storyID: storyID,
                index: index
            }).then(r => {
            }).catch(reason => {
            });
        }

        // Add a new document with a generated id.
        db.doc(episodeID).update({
            name: name,
            isPublished: true,
            price: price,
            starting_blocks: starting_blocks,
            data: eReaderText,
            updatedAt: Date.now(),
            generic_assets: this.state.gen_assets
        }).then(() => {
            const path = `${constants.STORAGE_STORIES}/stories/${storyID}/seasons/${seasonID}/episodes/${episodeID}`;

            if (icon.file) promises.push(this.uploadFileAsPromise(path, icon.file, 'icon.png'));
            if (isScriptUpdated) {
                promises.push(this.uploadFileAsPromise(
                    path,
                    new Blob([script], {type: 'text/plain'}),
                    'script.txt'
                ));
            }
            // if (isContentUpdated && eReaderText) {
            //     promises.push(this.uploadFileAsPromise(
            //         path,
            //         new Blob([eReaderText], {type: 'text/plain'}),
            //         'content.txt'
            //     ));
            // }

            showNotification(NOTIFICATION.INFO, 'Uploading file..');
            showNotification(NOTIFICATION.WARNING, 'Do not refresh the page');
            assets.forEach(asset => {
                // 
                if (asset.file && !asset.delete) {
                    
                    promises.push(this.uploadFileAsPromise(`${path}/Assets`, asset.file));
                } else if (!asset.file && asset.delete) {
                    const filepath = asset.path;
                    const n = filepath.includes("Generic");
                    if (!n) {
                        promises.push(this.deleteFile(asset.path));
                    }
                }
            });

            Promise.all(promises).then(async r => {
                const response = await axios.post(`${constants.SERVER_BASE_URL}/translateScriptToBlock`, {
                    'filePath': `${path}/script.txt`
                })
                // 
                showNotification(NOTIFICATION.SUCCESS, 'Translated script successfully..');
                updateEpisodeName(episodeID, name);
                showNotification(NOTIFICATION.SUCCESS, 'Episode updated successfully.');
                saveState(null);
                this.backToList();
            }).catch(e => {
                
                showNotification(NOTIFICATION.ERROR, 'Failed to update files. Try again!');
                this.setState({isLoading: false});
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
        const {
            isLoading,
            name,
            icon,
            assets,
            script,
            price,
            starting_blocks,
            isScriptUpdated,
            isContentUpdated,
            eReaderText
        } = this.state;
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
                                        <h2>Edit Episode</h2>
                                    </CCardHeader>
                                    <CCardBody>
                                        <CForm onSubmit={this.handleSubmit} className="form-horizontal">
                                            <CRow>
                                                <CCol xs={'12'} md={'6'}>
                                                    <CFormGroup row className={'mb-2'}>
                                                        <CCol xs="12">
                                                            <CInput id="name" name="name" type="text" value={name}
                                                                    maxLength={'30'}
                                                                    onChange={this.onTextChange} required/>
                                                        </CCol>
                                                    </CFormGroup>
                                                    <CFormGroup row className={'mx-0'}>
                                                        <CCol xs="12">
                                                            <CInputFile id="icon" name="icon"
                                                                        onChange={this.onImageChange}
                                                                        accept="image/png"/>
                                                            <CLabel htmlFor="icon" variant="custom-file">
                                                                {icon.preview ? 'Replace Icon' : 'Select Icon'}
                                                            </CLabel>
                                                        </CCol>
                                                    </CFormGroup>
                                                    <CFormGroup row className={'mx-0'}>
                                                        <CCol xs="12">
                                                            <CInputFile id="assets"
                                                                        name="assets"
                                                                        multiple
                                                                        onChange={this.onAssetsChange}
                                                                        accept="image/*, .mp4, .mp3, .wav"
                                                            />
                                                            <CLabel htmlFor="assets" variant="custom-file">
                                                                Add Assets
                                                            </CLabel>
                                                        </CCol>
                                                    </CFormGroup>

                                                    <CRow className="mb-3">
                                                        <CCol xs={6} className="">
                                                            <h6 className={'mb-1 pl-2'}>Price</h6>
                                                            <select id="price" className="custom-select" name="price"
                                                                    value={price} onChange={this.onTextChange}>
                                                                <option value="free">Free</option>
                                                                <option value="optional">Optional</option>
                                                                <option value="premium">Premium</option>
                                                            </select>
                                                        </CCol>

                                                        <CCol xs={6} className="">
                                                            {/*<CSwitch id={'publish'} name={'isPublished'} size={'sm'}*/}
                                                            {/*         shape={'pill'} color={'primary'}*/}
                                                            {/*         checked={isPublished}*/}
                                                            {/*         onChange={this.onSwitchChange}/>*/}
                                                            {/*<CLabel htmlFor="publish" className="ml-2">*/}
                                                            {/*    <h3>Publish</h3>*/}
                                                            {/*</CLabel>*/}

                                                            <h6 className={'mb-1 pl-2'}>Starting blocks</h6>
                                                            <select id="starting_blocks" className="custom-select"
                                                                    name="starting_blocks"
                                                                    value={starting_blocks}
                                                                    onChange={this.onTextChange}>
                                                                <option value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4</option>
                                                                <option value="5">5</option>
                                                                <option value="6">6</option>
                                                                <option value="7">7</option>
                                                                <option value="8">8</option>
                                                                <option value="9">9</option>
                                                                <option value="10">10</option>
                                                            </select>
                                                        </CCol>
                                                    </CRow>
                                                </CCol>
                                                <CCol xs={'12'} md={'6'}>
                                                    <CRow className={'mb-3'}>
                                                        <CCol xs={'12'}>
                                                            <h6 className={'mb-0 pl-2'}>Icon</h6>
                                                            <div className='border-light rounded p-1'
                                                                 style={{minHeight: '50px'}}>
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
                                                    <CRow className="mb-3">
                                                        <CCol xs={'12'}>
                                                            <h6 className={'mb-0 pl-2'}>Assets</h6>
                                                            <div className='border-light rounded p-1'
                                                                 style={{minHeight: '50px'}}>
                                                                {
                                                                    assets.length > 0 ? assets.map(asset =>
                                                                        !asset.delete ?
                                                                            (
                                                                                <div key={asset.uuid}
                                                                                     className="overlay-container mx-1"
                                                                                     style={{display: 'inline-block'}}>
                                                                                    <CImg
                                                                                        src={asset.preview === 'video/mp4' ? 'https://logodix.com/logo/1169537.jpg' : asset.preview === 'audio/mpeg' || asset.preview === 'audio/wav' ? 'https://images.squarespace-cdn.com/content/58b0997615d5db7211687444/1552762095547-NJ4IIN6YBKSTTQYC4QXL/image-asset.png?content-type=image%2Fpng' : asset.preview}
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
                                                                                        <CIcon content={freeSet.cilX}
                                                                                               size="xl"
                                                                                               className="text-white m-0"/>
                                                                                    </CButton>
                                                                                </div>
                                                                            ) : ''
                                                                    ) : <Skeleton height={50}/>
                                                                }
                                                            </div>
                                                        </CCol>
                                                    </CRow>
                                                </CCol>
                                            </CRow>

                                            <CRow>
                                                <CCol>
                                                    <CTabs>
                                                        <CNav variant="tabs">
                                                            <CNavItem>
                                                                <CNavLink>
                                                                    Markdown Editor
                                                                </CNavLink>
                                                            </CNavItem>
                                                            <CNavItem>
                                                                <CNavLink>
                                                                    Script System
                                                                </CNavLink>
                                                            </CNavItem>
                                                        </CNav>
                                                        <CTabContent>
                                                            <CTabPane>
                                                                <h5 className="mt-3">Markdown Editor</h5>
                                                                <div className="ml-4">
                                                                    <CInputCheckbox id="isContentUpdated"
                                                                                    name="isContentUpdated"
                                                                                    type="checkbox"
                                                                                    checked={isContentUpdated}
                                                                                    custom
                                                                                    onChange={this.onCheckboxChange}
                                                                    />
                                                                    <CLabel htmlFor="isContentUpdated"
                                                                            variant="custom-checkbox">
                                                                        Update content
                                                                    </CLabel>
                                                                    <p className="small text-muted">Make sure to check
                                                                        this
                                                                        box to
                                                                        save any changes made in content below</p>
                                                                </div>
                                                                {/*<ReactQuill value={eReaderText}*/}
                                                                {/*            onChange={this.onQuillChange}*/}
                                                                {/*            modules={modules}*/}
                                                                {/*            formats={formats}*/}
                                                                {/*            style={{height: '350px'}}*/}
                                                                {/*/>*/}
                                                                <MDEditor
                                                                    value={eReaderText}
                                                                    onChange={this.onQuillChange}
                                                                    height={371}
                                                                />
                                                            </CTabPane>
                                                            <CTabPane>
                                                                <h5 className="mt-3">Script System</h5>
                                                                <div className="ml-4">
                                                                    <CInputCheckbox id="isScriptUpdated"
                                                                                    name="isScriptUpdated"
                                                                                    type="checkbox"
                                                                                    checked={isScriptUpdated}
                                                                                    custom
                                                                                    onChange={this.onCheckboxChange}
                                                                    />
                                                                    <CLabel htmlFor="isScriptUpdated"
                                                                            variant="custom-checkbox">
                                                                        Update script
                                                                    </CLabel>
                                                                    <p className="small text-muted">Make sure to check
                                                                        this box to
                                                                        save any changes made in script below</p>
                                                                </div>

                                                                <CFormGroup row>
                                                                    <CCol xs="12">
                                                                        <CTextarea
                                                                            name="script"
                                                                            id="script"
                                                                            placeholder={'Enter Script here'}
                                                                            rows="17"
                                                                            value={script}
                                                                            onChange={this.onTextChange}
                                                                        />
                                                                    </CCol>
                                                                </CFormGroup>
                                                            </CTabPane>
                                                        </CTabContent>
                                                    </CTabs>
                                                </CCol>
                                            </CRow>

                                            <div className="text-center mt-5">
                                                <CButton type="submit" size="sm" color="primary"
                                                         className="mr-1 px-3">Save</CButton>
                                                <CButton type="button" onClick={this.backToList} size="sm"
                                                         color="danger"
                                                         className="px-3">Cancel</CButton>
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

export default EditEpisode;
