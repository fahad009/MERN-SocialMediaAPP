import React, {Component} from 'react'
import Skeleton from 'react-loading-skeleton';
import './style.css'
import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'
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
    CRow,
    CSpinner,
    CSwitch,
    CTextarea
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {NOTIFICATION, showNotification, updateStoryData} from "../../reusable/Utility";
import constants from '../../reusable/config';
import {freeSet} from "@coreui/icons";
import moment from "moment";
import axios from "axios";

const storage = firebase.storage();
const db = firebase.firestore().collection(constants.DB_STORIES);
const db_categories = firebase.firestore().collection(constants.DB_CATEGORIES);
const db_users = firebase.firestore().collection(constants.DB_USERS);
const db_in_app_keys = firebase.firestore().collection(constants.DB_IN_APP_KEYS);

let storyID = '';

class EditStory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            role: '',
            isLoading: true,
            name: '',
            description: '',
            creator_note: '',
            previous_creator: '',
            creator: '',
            price: '0',
            price_tiers: [],
            in_app_keys: [],
            script: '',
            categories: [],
            cover: {
                file: null,
                preview: null
            },
            defaultIcon: {
                file: null,
                preview: null
            },
            titleArt: {
                file: null,
                preview: null
            },
            explorePageIcon: {
                file: null,
                preview: null
            },
            recommendedTitleIcon: {
                file: null,
                preview: null
            },
            avatars: [],
            avatarStyles: {
                file: null,
                preview: null
            },
            creators: [],
            minimum_age: 0,
            subscription_required: false,
            isEreader: false
        }
    }

    async componentDidMount() {
        if (this.props.location.state === undefined) {
            showNotification(NOTIFICATION.ERROR, 'Story ID not found');
            this.backToList();
            return;
        } else {
            storyID = this.props.location.state.id
        }

        const role = localStorage.getItem('user_type');

        let response = await db_categories.where('active_in_genres', '==', true).get();
        let all_categories = [];
        response.forEach((doc) => {
            let {name} = doc.data();
            all_categories.push({
                id: doc.id,
                name: name,
                checked: false
            })
        })

        db_in_app_keys.get().then(response => {
            let data = [];
            response.forEach((doc) => {
                let {key, platform, price} = doc.data();
                if (price)
                    data.push({
                        key: key,
                        platform: platform,
                        price: price
                    })
            })

            let tiers = [...new Set(data.map(item => item.price))]
            this.setState({in_app_keys: data, price_tiers: tiers});
        })

        db.doc(storyID).get().then(async (doc) => {
            if (doc.exists) {
                // 
                const {
                    name,
                    description,
                    creator_note,
                    categories,
                    price,
                    creator,
                    status,
                    min_age,
                    subscription_required,
                    isEreader
                } = doc.data();
                const path = `${constants.STORAGE_STORIES}/stories/${storyID}`;
                let holder = [...all_categories];

                holder.forEach(category => {
                    if (categories.includes(category.id)) category.checked = true;
                });

                db_users.where('user_type', '==', 'creator').get().then((querySnapshot) => {
                    let creators = [];
                    querySnapshot.forEach((doc) => {
                        let {first_name, last_name} = doc.data();
                        creators.push({
                            id: doc.id,
                            name: `${first_name} ${last_name}`
                        })
                    })
                    this.setState({creators: creators});
                });

                this.setState({
                    name: name,
                    description: description,
                    creator_note: creator_note,
                    price: price ? price : '0',
                    categories: [...holder],
                    creator: creator,
                    previous_creator: creator,
                    role: role,
                    wasPublished: status === 'publish',
                    isPublished: status === 'publish',
                    minimum_age: min_age,
                    subscription_required: subscription_required ? subscription_required : false,
                    isEreader: isEreader ? isEreader : false
                });
                // 

                storage.ref(`${path}/cover.png`).getDownloadURL()
                    .then((url) => {
                        this.setState({cover: {file: null, preview: url}});
                    }).catch((error) => {
                    showNotification(NOTIFICATION.ERROR, 'Error: cover file missing');
                    this.setState({cover: {file: null, preview: 'null'}});
                });

                storage.ref(`${path}/icon.png`).getDownloadURL()
                    .then((url) => {
                        this.setState({defaultIcon: {file: null, preview: url}});
                    }).catch((error) => {
                    showNotification(NOTIFICATION.ERROR, 'Error: icon file missing');
                    this.setState({defaultIcon: {file: null, preview: 'null'}});
                });

                storage.ref(`${path}/name.png`).getDownloadURL()
                    .then((url) => {
                        this.setState({titleArt: {file: null, preview: url}});
                    }).catch((error) => {
                    showNotification(NOTIFICATION.ERROR, 'Error: name file missing');
                    this.setState({titleArt: {file: null, preview: 'null'}});
                });

                storage.ref(`${path}/rect2x_icon.png`).getDownloadURL()
                    .then((url) => {
                        this.setState({explorePageIcon: {file: null, preview: url}});
                    }).catch((error) => {
                    showNotification(NOTIFICATION.ERROR, 'Error: rect2x_icon file missing');
                    this.setState({explorePageIcon: {file: null, preview: 'null'}});
                });

                storage.ref(`${path}/rect_icon.png`).getDownloadURL()
                    .then((url) => {
                        this.setState({recommendedTitleIcon: {file: null, preview: url}});
                    }).catch((error) => {
                    showNotification(NOTIFICATION.ERROR, 'Error: rect_icon file missing');
                    this.setState({recommendedTitleIcon: {file: null, preview: 'null'}});
                });

                storage.ref(`${path}/Avatars/style.txt`).getDownloadURL()
                    .then((url) => {
                        fetch(url).then((response) => {
                            response.text().then((text) => {
                                this.setState({script: text});
                            });
                        }).catch((error) => {
                            
                            showNotification(NOTIFICATION.ERROR, 'Error fetching script file');
                        });
                    }).catch((error) => {
                    showNotification(NOTIFICATION.ERROR, 'Styles file not found');
                });

                const avatars = await this.getFiles(`${path}/Avatars`);
                avatars.forEach(avatar => {
                    if (avatar.endsWith('png')) {
                        storage.ref(avatar).getDownloadURL()
                            .then((url) => {
                                // this.setState({ recommendedTitleIcon: {file: null, preview: url} });
                                this.setState({
                                    avatars: [...this.state.avatars, {
                                        file: null,
                                        preview: url,
                                        path: avatar,
                                        delete: false
                                    }]
                                });
                            }).catch((error) => {
                            showNotification(NOTIFICATION.ERROR, error.toString());
                        });
                    }
                });
                this.setState({isLoading: false});
            } else {
                showNotification(NOTIFICATION.ERROR, 'Invalid book ID!');
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

    onNameChange = ({currentTarget: input}) => {
        this.setState({name: input.value});
    };
    onImageChange = event => {
        if (event.target.files[0]) {
            let file = event.target.files[0];
            if (file.name.endsWith('.png')) {
                this.getImagePreview(file).then(preview => {
                    this.setState({[event.target.name]: {file: file, preview: preview}});
                });
            } else {
                showNotification(NOTIFICATION.WARNING, 'Only .png files allowed', 1000);
            }
        }
    };
    onAvatarsChange = async event => {
        let files = [];
        for (const file of event.target.files) {
            if (file.name.endsWith('.png')) {
                let preview = await this.getImagePreview(file);
                files.push({
                    file: file,
                    preview: preview,
                    path: null,
                    delete: false
                });
            } else {
                showNotification(NOTIFICATION.WARNING, 'Only .png files allowed', 1000);
            }
        }
        if (files.length > 0) this.setState({avatars: [...this.state.avatars, ...files]});
    };
    onFileChange = event => {
        let file = event.target.files[0];
        if (file.name.endsWith('.txt')) {
            this.setState({[event.target.name]: {file: file}});
        } else {
            showNotification(NOTIFICATION.WARNING, 'Only .txt files allowed', 1000);
        }
    };
    onCategoryChange = event => {
        let {checked, id} = event.target;
        let {categories} = this.state;

        const index = categories.findIndex(category => category.id === id);
        let holder = [...categories];
        holder[index].checked = checked;
        this.setState({categories: [...holder]});
    };

    removeAvatar = (preview) => {
        let holder = [...this.state.avatars];
        holder.forEach(avatar => {
            if (avatar.preview === preview) avatar.delete = true;
        });
        this.setState({avatars: [...holder]});
    }

    onTextChange = ({currentTarget: input}) => {
        this.setState({[input.name]: input.value});
    };

    onCheckboxChange = ({currentTarget: input}) => {
        this.setState({[input.name]: input.checked});
    };

    handleSubmit = e => {
        e.preventDefault();

        const {
            name,
            description,
            creator_note,
            price,
            categories,
            cover,
            titleArt,
            defaultIcon,
            explorePageIcon,
            recommendedTitleIcon,
            avatars,
            creator,
            previous_creator,
            creators,
            script,
            isPublished,
            wasPublished,
            minimum_age,
            subscription_required,
            isEreader
        } = this.state;

        if (name.trim() === '') {
            showNotification(NOTIFICATION.WARNING, 'Name is required', 1500);
            return;
        }

        let promises = [];

        let categoryIDs = [];
        categories.forEach(category => {
            if (category.checked) categoryIDs.push(category.id);
        })
        if (categoryIDs.length === 0) {
            showNotification(NOTIFICATION.ERROR, 'At least 1 category is required');
            return;
        }

        this.setState({isLoading: true});
        const creator_hold = creators.find(c => {
            return c.id === creator
        });

        // Add a new document with a generated id.
        db.doc(storyID).update({
            name: name ? name : '',
            description: description ? description : '',
            creator_note: creator_note ? creator_note : '',
            categories: categoryIDs,
            price: parseFloat(price),
            android_key: this.getIAP(price, 'android'),
            ios_key: this.getIAP(price, 'ios'),
            creator: creator_hold ? creator_hold.id : firebase.firestore.FieldValue.delete(),
            creator_name: creator_hold ? creator_hold.name : firebase.firestore.FieldValue.delete(),
            status: isPublished ? 'publish' : 'unpublish',
            min_age: parseInt(minimum_age),
            subscription_required: subscription_required,
            isEreader: isEreader,
            updatedAt: Date.now()
        }).then(() => {
            // 
            if (!wasPublished && isPublished) {
                // send notification if published
                this.sendStoryNotification(storyID, categoryIDs).then(r => {
                })

                const uid = creator;
                if (uid !== undefined) {
                    firebase.firestore().collection(constants.DB_USERS).doc(uid).collection('activity_feeds').add({
                        parent_id: '',
                        text: `Edit and Published story: ${name}`,
                        time: firebase.firestore.Timestamp.fromDate(moment.utc().toDate()),
                        user_id: uid
                    });
                }
            }

            if (creator) {
                db_users.doc(creator).update({
                    creator_stories: firebase.firestore.FieldValue.arrayUnion(storyID)
                })
            }

            if (previous_creator) {
                db_users.doc(previous_creator).update({
                    creator_stories: firebase.firestore.FieldValue.arrayRemove(storyID)
                })
            }

            // saveState(null);
            let path = `${constants.STORAGE_STORIES}/stories/${storyID}`;
            // 
            if (cover.file) promises.push(this.uploadFile(path, cover.file, 'cover.png'));
            if (defaultIcon.file) promises.push(this.uploadFile(path, defaultIcon.file, 'icon.png'));
            if (titleArt.file) promises.push(this.uploadFile(path, titleArt.file, 'name.png'));
            if (explorePageIcon.file) promises.push(this.uploadFile(path, explorePageIcon.file, 'rect2x_icon.png'));
            if (recommendedTitleIcon.file) promises.push(this.uploadFile(path, recommendedTitleIcon.file, 'rect_icon.png'));
            // if (avatarStyles.file) promises.push(this.uploadFile(`${path}/Avatars`, avatarStyles.file, 'style.txt'));

            promises.push(this.uploadFile(
                `${path}/Avatars`,
                new Blob([script], {type: 'text/plain'}),
                'style.txt'
            ));
            // 

            avatars.forEach(avatar => {
                if (avatar.file && !avatar.delete) {
                    promises.push(this.uploadFile(`${path}/Avatars`, avatar.file));
                } else if (!avatar.file && avatar.delete) {
                    promises.push(this.deleteFile(avatar.path));
                }
            });
            const updatedAt = Date.now();

            Promise.all(promises).then(r => {
                updateStoryData(storyID, name, isPublished ? 'publish' : 'unpublish', minimum_age, updatedAt);
                showNotification(NOTIFICATION.SUCCESS, 'Story updated successfully!');
                this.backToList();
            }).catch(e => {
                
                showNotification(NOTIFICATION.ERROR, 'Failed to upload files. Try again!');
                this.setState({isLoading: false});
            });

        }).catch((error) => {
            
            showNotification(NOTIFICATION.ERROR, 'Something went wrong. Try again!');
            this.setState({isLoading: false});
        });
    };

    sendStoryNotification = async (id, categories) => {
        let promises = [];

        for (const category of categories) {
            promises.push(axios.post(`${constants.SERVER_BASE_URL}/sendStoryNotification`, {
                categoryID: category,
                storyID: id
            }))

            // 
        }

        // showNotification(NOTIFICATION.SUCCESS, 'All subscribed users have been notified.', 5000);
        const responses = await Promise.all(promises);
        // 
    }

    //Handle waiting to upload each file using promise
    uploadFile(directory, file, filename = null) {
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

    getImagePreview = (image) => {
        return new Promise(function (resolve, reject) {
            let reader = new FileReader();
            let url = reader.readAsDataURL(image);
            reader.onloadend = function (e) {
                resolve(reader.result);
            }.bind(this);
        });
    }

    backToList = () => {
        
        //alert("aaa");
        //this.props.history.push('/AddBook');

        this.props.history.push({
            pathname: '/dashboard',
            state: this.props.location.state
        });

        // this.props.history.goBack({state: "iamdata22"});
        //this.onChange();
    };

    getIAP = (price, platform) => {
        
        if (price == 0) return 'free';

        const tier = this.state.in_app_keys.find(element => {
            return element.price == price && element.platform == platform;
        });
        return tier.key;
    }

    render() {
        const {
            name,
            description,
            creator_note,
            categories,
            price,
            price_tiers,
            cover,
            titleArt,
            defaultIcon,
            explorePageIcon,
            recommendedTitleIcon,
            avatars,
            creator,
            creators,
            script,
            role,
            isPublished,
            minimum_age,
            subscription_required,
            isEreader
        } = this.state;

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
                        <CRow>
                            <CCol xs="12">
                                <CCard>
                                    <CCardHeader>
                                        <h2>Edit Story</h2>
                                    </CCardHeader>
                                    <CCardBody>
                                        <CForm onSubmit={this.handleSubmit} className="form-horizontal">
                                            <CRow>
                                                <CCol xs={'12'} md={'6'}>
                                                    <CFormGroup row className={'mb-2'}>
                                                        <CCol xs="12">
                                                            <CInput id="name" name="name" placeholder={'Name'}
                                                                    value={name} maxLength={'30'}
                                                                    onChange={this.onNameChange} required
                                                            />
                                                        </CCol>
                                                    </CFormGroup>

                                                    <CFormGroup row className={'mx-0'}>
                                                        <CCol xs="12" className={'px-0'}>
                                                            <CTextarea
                                                                name="description"
                                                                id="description"
                                                                placeholder={'Enter description here'}
                                                                rows="5"
                                                                value={description}
                                                                onChange={this.onTextChange} required
                                                            />
                                                        </CCol>
                                                    </CFormGroup>

                                                    <CFormGroup row className={'mx-0'}>
                                                        <CCol xs="12" className={'px-0'}>
                                                            <CTextarea
                                                                name="creator_note"
                                                                id="creator_note"
                                                                placeholder={'Enter notes here'}
                                                                rows="5"
                                                                value={creator_note}
                                                                onChange={this.onTextChange}
                                                            />
                                                        </CCol>
                                                    </CFormGroup>

                                                    <CFormGroup row className={'mx-0'}>
                                                        <CCol xs="12">
                                                            <CInputFile id="cover" name="cover"
                                                                        onChange={this.onImageChange}
                                                                        accept="image/png"/>
                                                            <CLabel htmlFor="cover" variant="custom-file">
                                                                {cover.preview ? 'Replace Cover' : 'Select Cover'}
                                                            </CLabel>
                                                        </CCol>
                                                    </CFormGroup>

                                                    <CFormGroup row className={'mx-0'}>
                                                        <CCol xs="12">
                                                            <CInputFile id="titleArt" name="titleArt"
                                                                        onChange={this.onImageChange}
                                                                        accept="image/png"/>
                                                            <CLabel htmlFor="titleArt" variant="custom-file">
                                                                {titleArt.preview ? 'Replace Title Art' : 'Select Title Art'}
                                                            </CLabel>
                                                        </CCol>
                                                    </CFormGroup>

                                                    <CFormGroup row className={'mx-0'}>
                                                        <CCol xs="12">
                                                            <CInputFile id="defaultIcon" name="defaultIcon"
                                                                        onChange={this.onImageChange} accept="image/png"
                                                            />
                                                            <CLabel htmlFor="defaultIcon" variant="custom-file">
                                                                {defaultIcon.preview ? 'Replace Default Icon' : 'Select Default Icon'}
                                                            </CLabel>
                                                        </CCol>
                                                    </CFormGroup>
                                                    <CFormGroup row className={'mx-0'}>
                                                        <CCol xs="12">
                                                            <CInputFile id="explorePageIcon" name="explorePageIcon"
                                                                        onChange={this.onImageChange} accept="image/png"
                                                            />
                                                            <CLabel htmlFor="explorePageIcon" variant="custom-file">
                                                                {explorePageIcon.preview ? 'Replace Explore Page Icon' : 'Select Explore Page Icon'}
                                                            </CLabel>
                                                        </CCol>
                                                    </CFormGroup>
                                                    <CFormGroup row className={'mx-0'}>
                                                        <CCol xs="12">
                                                            <CInputFile id="recommendedTitleIcon"
                                                                        name="recommendedTitleIcon"
                                                                        onChange={this.onImageChange} accept="image/png"
                                                            />
                                                            <CLabel htmlFor="recommendedTitleIcon"
                                                                    variant="custom-file">
                                                                {recommendedTitleIcon.preview ? 'Replace Recommended Title Icon' : 'Select Recommended Title Icon'}
                                                            </CLabel>
                                                        </CCol>
                                                    </CFormGroup>
                                                    <CFormGroup row className={'mx-0'}>
                                                        <CCol xs="12">
                                                            <CInputFile
                                                                id="avatars"
                                                                name="avatars"
                                                                multiple
                                                                onChange={this.onAvatarsChange}
                                                                accept="image/png"

                                                            />
                                                            <CLabel htmlFor="avatars" variant="custom-file">
                                                                Add Avatars
                                                            </CLabel>
                                                        </CCol>
                                                    </CFormGroup>

                                                    <CFormGroup row className={'mx-0'}>
                                                        <CCol xs="12" className={'px-0'}>
                                                            <CTextarea
                                                                name="script"
                                                                id="script"
                                                                placeholder={'Enter Script here'}
                                                                rows="9"
                                                                value={script}
                                                                onChange={this.onTextChange} required
                                                            />
                                                        </CCol>

                                                    </CFormGroup>
                                                </CCol>
                                                <CCol xs={'12'} md={'6'}>
                                                    <CRow>
                                                        <CCol xs={3} className="pr-0">
                                                            <div className="mb-3">
                                                                <h6>Content Type</h6>
                                                                <CSwitch name="isEreader" className={'ml-1 mb-0'}
                                                                         shape={'pill'} color={'primary'}
                                                                         labelOn={'E-Reader'} labelOff={'Blocks'}
                                                                         defaultChecked={isEreader}
                                                                         style={{width: '100px'}}
                                                                         onChange={this.onCheckboxChange}/>
                                                            </div>
                                                            <CFormGroup className={'mx-0'}>
                                                                <h6>Categories</h6>
                                                                <div className={'ml-4'}>
                                                                    {
                                                                        categories.map(category => (
                                                                            <div key={category.id}>
                                                                                <CInputCheckbox id={category.id}
                                                                                                name="category[]"
                                                                                                type="checkbox"
                                                                                                checked={category.checked}
                                                                                                custom
                                                                                                onChange={this.onCategoryChange}/>
                                                                                <CLabel htmlFor={category.id}
                                                                                        variant="custom-checkbox">
                                                                                    {category.name}
                                                                                </CLabel>
                                                                            </div>
                                                                        ))
                                                                    }
                                                                </div>
                                                            </CFormGroup>
                                                        </CCol>
                                                        <CCol xs={9} className="pl-0">
                                                            <CRow>
                                                                <CCol className="pl-0">
                                                                    <h6>Minimum Age</h6>
                                                                    <select id="minimum_age" className="custom-select"
                                                                            name="minimum_age"
                                                                            value={minimum_age}
                                                                            onChange={this.onTextChange}>
                                                                        <option value="0">0</option>
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
                                                                        <option value="11">11</option>
                                                                        <option value="12">12</option>
                                                                        <option value="13">13</option>
                                                                        <option value="14">14</option>
                                                                        <option value="15">15</option>
                                                                        <option value="16">16</option>
                                                                        <option value="17">17</option>
                                                                        <option value="18">18</option>
                                                                        <option value="19">19</option>
                                                                        <option value="20">20</option>
                                                                    </select>
                                                                </CCol>
                                                                <CCol className="pl-0">
                                                                    <h6>Support Price</h6>
                                                                    <select id="price" className="custom-select"
                                                                            name="price"
                                                                            value={price} onChange={this.onTextChange}>
                                                                        <option value={'0'}>Free</option>
                                                                        {
                                                                            price_tiers.map(tier => (
                                                                                <option value={tier}>$ {tier}</option>
                                                                            ))
                                                                        }
                                                                    </select>
                                                                </CCol>
                                                                {
                                                                    role === 'admin_dicota' &&
                                                                    <CCol className="pl-0">
                                                                        <h6>Creator</h6>
                                                                        <select id="creator" className="custom-select"
                                                                                name="creator" value={creator}
                                                                                onChange={this.onTextChange}>
                                                                            <option value="">None</option>
                                                                            {
                                                                                creators.map(creator => (
                                                                                    <option
                                                                                        value={creator.id}>{creator.name}</option>
                                                                                ))
                                                                            }
                                                                        </select>
                                                                    </CCol>
                                                                }
                                                            </CRow>
                                                            <CRow className="mt-3">
                                                                <CCol className="pl-4 d-flex justify-content-start">
                                                                    <div>
                                                                        <CInputCheckbox id="publish"
                                                                                        name="isPublished"
                                                                                        type="checkbox"
                                                                                        checked={isPublished}
                                                                                        custom
                                                                                        onChange={this.onCheckboxChange}/>
                                                                        <CLabel htmlFor="publish"
                                                                                variant="custom-checkbox">
                                                                            Published
                                                                        </CLabel>
                                                                    </div>
                                                                    <div className="ml-5">
                                                                        <CInputCheckbox id="subscription_required"
                                                                                        name="subscription_required"
                                                                                        type="checkbox"
                                                                                        checked={subscription_required}
                                                                                        custom
                                                                                        onChange={this.onCheckboxChange}/>
                                                                        <CLabel htmlFor="subscription_required"
                                                                                variant="custom-checkbox">
                                                                            Requires Subscription
                                                                        </CLabel>
                                                                    </div>
                                                                </CCol>
                                                            </CRow>
                                                        </CCol>
                                                    </CRow>
                                                    <CRow className={'mb-3 mr-0'}>
                                                        <CCol xs={'12'} className={'pr-0'}>
                                                            <h6 className={'mb-0 pl-2'}>Cover</h6>
                                                            <div className='border-light rounded p-1'
                                                                 style={{minHeight: '50px'}}>
                                                                {
                                                                    (cover.preview &&
                                                                        <CImg
                                                                            src={cover.preview}
                                                                            width={'auto'}
                                                                            height={50}
                                                                        />) || <Skeleton height={40}/>
                                                                }
                                                            </div>
                                                        </CCol>
                                                    </CRow>
                                                    <CRow className={'mb-3 mr-0'}>
                                                        <CCol xs={'12'} className={'pr-0'}>
                                                            <h6 className={'mb-0 pl-2'}>Title Art</h6>
                                                            <div className='border-light rounded p-1'
                                                                 style={{minHeight: '50px'}}>
                                                                {
                                                                    (titleArt.preview &&
                                                                        <CImg
                                                                            src={titleArt.preview}
                                                                            width={'auto'}
                                                                            height={50}
                                                                        />) || <Skeleton height={40}/>
                                                                }
                                                            </div>
                                                        </CCol>
                                                    </CRow>
                                                    <CRow className={'mb-3 mr-0'}>
                                                        <CCol xs={'12'} className={'pr-0'}>
                                                            <h6 className={'mb-0 pl-2'}>Default Icon</h6>
                                                            <div className='border-light rounded p-1'
                                                                 style={{minHeight: '50px'}}>
                                                                {
                                                                    (defaultIcon.preview &&
                                                                        <CImg
                                                                            src={defaultIcon.preview}
                                                                            width={'auto'}
                                                                            height={50}
                                                                        />) || <Skeleton height={40}/>
                                                                }
                                                            </div>
                                                        </CCol>
                                                    </CRow>
                                                    <CRow className={'mb-3 mr-0'}>
                                                        <CCol xs={'12'} className={'pr-0'}>
                                                            <h6 className={'mb-0 pl-2'}>Explore Page Icon</h6>
                                                            <div className='border-light rounded p-1'
                                                                 style={{minHeight: '50px'}}>
                                                                {
                                                                    (explorePageIcon.preview &&
                                                                        <CImg
                                                                            src={explorePageIcon.preview}
                                                                            width={'auto'}
                                                                            height={50}
                                                                        />) || <Skeleton height={40}/>
                                                                }
                                                            </div>
                                                        </CCol>
                                                    </CRow>
                                                    <CRow className={'mb-3 mr-0'}>
                                                        <CCol xs={'12'} className={'pr-0'}>
                                                            <h6 className={'mb-0 pl-2'}>Recommended Title Icon</h6>
                                                            <div className='border-light rounded p-1'
                                                                 style={{minHeight: '50px'}}>
                                                                {
                                                                    (recommendedTitleIcon.preview &&
                                                                        <CImg
                                                                            src={recommendedTitleIcon.preview}
                                                                            width={'auto'}
                                                                            height={50}
                                                                        />) || <Skeleton height={50}/>
                                                                }
                                                            </div>
                                                        </CCol>
                                                    </CRow>
                                                    <CRow className={'mb-3 mr-0'}>
                                                        <CCol xs={'12'} className={'pr-0'}>
                                                            <h6 className={'mb-0 pl-2'}>Avatars</h6>
                                                            <div className='border-light rounded p-1'
                                                                 style={{minHeight: '50px'}}>
                                                                {
                                                                    avatars.length > 0 ? avatars.map(avatar =>
                                                                        !avatar.delete ?
                                                                            (
                                                                                <div key={avatar.preview}
                                                                                     className="overlay-container mx-1"
                                                                                     style={{display: 'inline-block'}}>
                                                                                    <CImg
                                                                                        src={avatar.preview}
                                                                                        width={'auto'}
                                                                                        height={50}
                                                                                    />
                                                                                    <div className="overlay"/>
                                                                                    <CButton
                                                                                        className="absolute-center"
                                                                                        variant="ghost"
                                                                                        shape="square"
                                                                                        size="sm"
                                                                                        onClick={(param) => this.removeAvatar(avatar.preview)}
                                                                                    >
                                                                                        <CIcon content={freeSet.cilX}
                                                                                               size="xl"
                                                                                               className="text-white"/>
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

export default EditStory;
