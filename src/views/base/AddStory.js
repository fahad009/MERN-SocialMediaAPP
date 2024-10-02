import React, {Component} from 'react'
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
import {NOTIFICATION, showNotification} from "../../reusable/Utility";
import constants from "../../reusable/config";
import {freeSet} from "@coreui/icons";
import moment from "moment";
import axios from "axios";


// const [collapsed, setCollapsed] = React.useState(true)
// const [showElements, setShowElements] = React.useState(true)

const db = firebase.firestore().collection(constants.DB_STORIES);
const db_users = firebase.firestore().collection(constants.DB_USERS);
const db_categories = firebase.firestore().collection(constants.DB_CATEGORIES);
const db_in_app_keys = firebase.firestore().collection(constants.DB_IN_APP_KEYS);

//const BasicForms = () => {
class BasicForms extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            name: '',
            description: '',
            creator_note: '',
            script: '',
            price: '0.00',
            isPublished: false,
            price_tiers: [],
            categories: [],
            cover: {
                file: null,
                preview: null
            },
            titleArt: {
                file: null,
                preview: null
            },
            defaultIcon: {
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
            creators: [],
            avatarStyles: {
                file: null
            },
            minimum_age: 0,
            subscription_required: false,
            isEreader: false
        }
    }

    async componentDidMount() {
        const role = localStorage.getItem('user_type');
        this.setState({role: role});

        db_categories.where('active_in_genres', '==', true).get().then(response => {
            let all_categories = [];
            response.forEach((doc) => {
                let {name} = doc.data();
                all_categories.push({
                    id: doc.id,
                    name: name,
                    checked: false
                })
            })
            this.setState({categories: all_categories});
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

        db_users.where('user_type', '==', 'creator').get().then((querySnapshot) => {
            let creators = [];
            querySnapshot.forEach((doc) => {
                let {first_name, last_name} = doc.data();
                creators.push({
                    id: doc.id,
                    name: `${first_name} ${last_name}`
                })
            })
            this.setState({creators: creators, creator: creators ? creators[0].id : ''});
        });
    }

    onNameChange = ({currentTarget: input}) => {
        this.setState({name: input.value});
    };

    onSwitchChange = ({currentTarget: input}) => {
        this.setState({[input.name]: input.checked});
    };

    onImageChange = event => {
        let file = event.target.files[0];
        if (file) {
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
                    preview: preview
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

    handleSubmit = e => {
        e.preventDefault();

        const uid = localStorage.getItem('uid');
        const user_name = localStorage.getItem('user_name');
        const {
            name,
            description,
            creator_note,
            price,
            categories,
            cover,
            defaultIcon,
            titleArt,
            explorePageIcon,
            recommendedTitleIcon,
            avatars,
            avatarStyles,
            script,
            isPublished,
            minimum_age,
            creator,
            creators,
            subscription_required,
            role,
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

        // this.setState({isLoading: true});

        const creator_hold = creators.find(c => {
            return c.id === creator
        });

        let db_creator, db_creator_name;

        if (role === 'admin_dicota') {
            if (creator_hold) {
                db_creator = creator_hold.id;
                db_creator_name = creator_hold.name;
            } else {
                db_creator = firebase.firestore.FieldValue.delete();
                db_creator_name = firebase.firestore.FieldValue.delete();
            }
        } else {
            db_creator = uid;
            db_creator_name = user_name;
        }

        // Add a new document with a generated id.
        db.add({
            name: name,
            views: 0,
            reviews: 0,
            likes: 0,
            description: description,
            price: parseFloat(price),
            android_key: this.getIAP(price, 'android'),
            ios_key: this.getIAP(price, 'ios'),
            creator_note: creator_note,
            categories: categoryIDs,
            createdAt: Date.now(),
            creator: db_creator,
            creator_name: db_creator_name,
            status: isPublished ? 'publish' : 'unpublish',
            min_age: parseInt(minimum_age),
            subscription_required: subscription_required,
            isEreader: isEreader,
            updatedAt: Date.now(),
        }).then(async (docRef) => {
            if (isPublished) {
                this.sendStoryNotification(docRef.id, categoryIDs).then(r => {
                })
                // 
                await firebase.firestore().collection(constants.DB_USERS).doc(uid).collection('activity_feeds').add({
                    parent_id: '',
                    text: `Added and Published new story: ${name}`,
                    time: firebase.firestore.Timestamp.fromDate(moment.utc().toDate()),
                    user_id: uid
                });
            }

            await firebase.firestore().collection(constants.EXPLORE_SCREEN).doc('Library').update({
                stories: firebase.firestore.FieldValue.arrayUnion(docRef.id)
            });

            showNotification(NOTIFICATION.SUCCESS, 'Data added successfully!');
            showNotification(NOTIFICATION.INFO, 'Uploading files..');

            let path = `${constants.STORAGE_STORIES}/stories/${docRef.id}`;

            if (cover.file) promises.push(this.uploadFile(path, cover.file, 'cover.png'));
            if (defaultIcon.file) promises.push(this.uploadFile(path, defaultIcon.file, 'icon.png'));
            if (titleArt.file) promises.push(this.uploadFile(path, titleArt.file, 'name.png'));
            if (explorePageIcon.file) promises.push(this.uploadFile(path, explorePageIcon.file, 'rect2x_icon.png'));
            if (recommendedTitleIcon.file) promises.push(this.uploadFile(path, recommendedTitleIcon.file, 'rect_icon.png'));
            if (avatarStyles.file) promises.push(this.uploadFile(`${path}/Avatars`, avatarStyles.file, 'style.txt'));

            promises.push(this.uploadFile(
                path + "/Avatars",
                new Blob([script], {type: 'text/plain'}),
                'style.txt'
            ));

            avatars.forEach(avatar => {
                promises.push(this.uploadFile(`${path}/Avatars`, avatar.file));
            });

            Promise.all(promises).then(r => {
                showNotification(NOTIFICATION.SUCCESS, 'Story added successfully!');
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

    getImagePreview = (image) => {
        return new Promise(function (resolve, reject) {
            let reader = new FileReader();
            let url = reader.readAsDataURL(image);
            reader.onloadend = function (e) {
                resolve(reader.result);
            }.bind(this);
        });
    }

    removeAvatar = (preview) => {
        let holder = this.state.avatars.filter(element => element.preview !== preview);

        this.setState({avatars: [...holder]});
    }

    onTextChange = ({currentTarget: input}) => {
        this.setState({[input.name]: input.value});
    };

    onCheckboxChange = ({currentTarget: input}) => {
        this.setState({[input.name]: input.checked});
    };

    backToList = () => {
        
        //alert("aaa");
        //this.props.history.push('/AddBook');

        this.props.history.push({
            pathname: '/Stories',
            state: this.props.location.state
        });

        // this.props.history.goBack({state: "iamdata22"});
        //this.onChange();
    };

    getIAP = (price, platform) => {
        let response = '';
        if (platform === 'android') {
            switch (price.toString()) {
                case '0.99':
                    response = 'litty.1.00';
                    break;
                case '3.99':
                    response = 'litty.3.99';
                    break;
            }
        } else {
            switch (price.toString()) {
                case '0.99':
                    response = 'litty.1.00';
                    break;
                case '3.99':
                    response = 'litty.3.99';
                    break;
            }
        }
        return response;
    }

    render() {
        const {
            categories,
            cover,
            description,
            notes,
            price,
            titleArt,
            defaultIcon,
            explorePageIcon,
            recommendedTitleIcon,
            avatars,
            creator,
            creators,
            price_tiers,
            isPublished,
            minimum_age,
            subscription_required,
            isEreader,
            role
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
                                        <h2>Add Story</h2>
                                    </CCardHeader>
                                    <CCardBody>
                                        <CForm onSubmit={this.handleSubmit} className="form-horizontal">
                                            <CRow>
                                                <CCol xs={'12'} md={'6'}>
                                                    <CFormGroup row className={'mb-2'}>
                                                        <CCol xs="12">
                                                            <CInput id="name" name="name" onChange={this.onNameChange}
                                                                    placeholder={'Name'} maxLength={'30'} required/>
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
                                                                value={notes}
                                                                onChange={this.onTextChange}
                                                            />
                                                        </CCol>
                                                    </CFormGroup>
                                                    <CFormGroup row className={'mx-0'}>
                                                        <CCol xs="12">
                                                            <CInputFile id="cover" name="cover"
                                                                        onChange={this.onImageChange}
                                                                        accept="image/png" required/>
                                                            <CLabel htmlFor="cover" variant="custom-file">
                                                                {cover.file ? cover.file.name : 'Select Cover'}
                                                            </CLabel>
                                                        </CCol>
                                                    </CFormGroup>
                                                    <CFormGroup row className={'mx-0'}>
                                                        <CCol xs="12">
                                                            <CInputFile id="titleArt" name="titleArt"
                                                                        onChange={this.onImageChange}
                                                                        accept="image/png" required/>
                                                            <CLabel htmlFor="titleArt" variant="custom-file">
                                                                {titleArt.file ? titleArt.file.name : 'Select Title art'}
                                                            </CLabel>
                                                        </CCol>
                                                    </CFormGroup>
                                                    <CFormGroup row className={'mx-0'}>
                                                        <CCol xs="12">
                                                            <CInputFile id="defaultIcon" name="defaultIcon"
                                                                        onChange={this.onImageChange} accept="image/png"
                                                                        required/>
                                                            <CLabel htmlFor="defaultIcon" variant="custom-file">
                                                                {defaultIcon.file ? defaultIcon.file.name : 'Select Default Icon'}
                                                            </CLabel>
                                                        </CCol>
                                                    </CFormGroup>
                                                    <CFormGroup row className={'mx-0'}>
                                                        <CCol xs="12">
                                                            <CInputFile id="explorePageIcon" name="explorePageIcon"
                                                                        onChange={this.onImageChange} accept="image/png"
                                                                        required/>
                                                            <CLabel htmlFor="explorePageIcon" variant="custom-file">
                                                                {explorePageIcon.file ? explorePageIcon.file.name : 'Select Explore Page Icon'}
                                                            </CLabel>
                                                        </CCol>
                                                    </CFormGroup>
                                                    <CFormGroup row className={'mx-0'}>
                                                        <CCol xs="12">
                                                            <CInputFile id="recommendedTitleIcon"
                                                                        name="recommendedTitleIcon"
                                                                        onChange={this.onImageChange} accept="image/png"
                                                                        required/>
                                                            <CLabel htmlFor="recommendedTitleIcon"
                                                                    variant="custom-file">
                                                                {recommendedTitleIcon.file ? recommendedTitleIcon.file.name : 'Select Recommended Title Icon'}
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
                                                                required
                                                            />
                                                            <CLabel htmlFor="avatars" variant="custom-file">
                                                                {
                                                                    avatars.length > 0 ? avatars.length === 1 ? `${avatars.length} file selected` : `${avatars.length} files selected` : 'Select Avatars'
                                                                }
                                                                {/*{avatars.length > 0 ? `${avatars.length} files selected` : 'Select Avatars'}*/}
                                                            </CLabel>
                                                        </CCol>
                                                    </CFormGroup>
                                                    <CFormGroup row className={'mx-0'}>
                                                        <CCol xs="12" className={'px-0'}>
                                                            <CTextarea
                                                                name="script"
                                                                id="script"
                                                                placeholder={'Enter Style here'}
                                                                rows="9"
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
                                                                                                defaultChecked={category.checked}
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
                                                                                        defaultChecked={isPublished}
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
                                                                                        defaultChecked={subscription_required}
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
                                                                    cover.preview &&
                                                                    <CImg
                                                                        src={cover.preview}
                                                                        width={'auto'}
                                                                        height={50}
                                                                    />
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
                                                                    titleArt.preview &&
                                                                    <CImg
                                                                        src={titleArt.preview}
                                                                        width={'auto'}
                                                                        height={50}
                                                                    />
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
                                                                    defaultIcon.preview &&
                                                                    <CImg
                                                                        src={defaultIcon.preview}
                                                                        width={'auto'}
                                                                        height={50}
                                                                    />
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
                                                                    explorePageIcon.preview &&
                                                                    <CImg
                                                                        src={explorePageIcon.preview}
                                                                        width={'auto'}
                                                                        height={50}
                                                                    />
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
                                                                    recommendedTitleIcon.preview &&
                                                                    <CImg
                                                                        src={recommendedTitleIcon.preview}
                                                                        width={'auto'}
                                                                        height={50}
                                                                    />
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
                                                                    avatars.map(avatar =>
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
                                                                                <CIcon content={freeSet.cilX} size="xl"
                                                                                       className="text-white"/>
                                                                            </CButton>
                                                                        </div>
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
