import React, {Component} from 'react';
import firebase from "firebase";
import constants from "../../../reusable/config";
import classNames from 'classnames'
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CForm,
    CInput,
    CInputCheckbox,
    CLabel,
    CRow,
    CSpinner,
    CTextarea
} from "@coreui/react";
import {NOTIFICATION, showNotification} from "../../../reusable/Utility";
import {freeSet} from "@coreui/icons";
import {CIcon} from "@coreui/icons-react";
import Skeleton from "react-loading-skeleton";

const db_categories = firebase.firestore().collection(constants.DB_CATEGORIES);
const db_stories = firebase.firestore().collection(constants.DB_STORIES);

export default class GenrePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCategoriesLoading: true,
            isStoriesLoading: true,
            isSaving: false,
            categories: [],
            stories: [],
            selectedCategory: null,
            categoryStories: []
        }
    }

    componentDidMount() {
        db_categories.get()
            .then((querySnapshot) => {
                let cats = [];
                querySnapshot.forEach((doc) => {
                    const {name} = doc.data();
                    cats.push({
                        id: doc.id,
                        name: name
                    })
                });
                this.setState({isCategoriesLoading: false, categories: cats});

                db_stories.get()
                    .then((querySnapshot) => {
                        let stories = [];
                        querySnapshot.forEach((doc) => {
                            const {name} = doc.data();
                            stories.push({
                                id: doc.id,
                                name: name,
                                index: 0,
                                isRemoved: true
                            })
                        })
                        this.setState({isStoriesLoading: false, stories: stories});

                        this.selectCategory(cats[0].id);
                    }).catch(error => {
                    
                    this.setState({isStoriesLoading: false, stories: []});
                })
            })
            .catch(error => {
                
                this.setState({isCategoriesLoading: false, categories: []});
            });
    }

    selectCategory = (id) => {
        if (this.state.selectedCategory === id) {
            return
        }

        this.setState({selectedCategory: id});
        let {stories} = this.state;
        stories.forEach(story => {
            story.isRemoved = true;
            story.index = 0;
        })

        db_categories.doc(id).collection('stories').get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const {index} = doc.data();

                    const position = stories.findIndex(story => story.id === doc.id);
                    let holder = [...stories];
                    holder[position].isRemoved = false;
                    holder[position].index = index;
                    this.setState({stories: [...holder]});
                })
            }).catch(error => {
            
        })
    }

    addToCategory = event => {
        let {checked, id, name} = event.target;
        
        let {stories} = this.state;

        const index = stories.findIndex(story => story.id === id);
        // if (index >= 0) {
        let holder = [...stories];
        holder[index].isRemoved = !checked;
        if (!checked) {
            holder[index].index = 0
        }
        this.setState({stories: [...holder]});
        // } else {
        //     this.setState({stories: [...stories, { id: id, name: name, index: stories.length+1, isRemoved: false }]});
        // }
    }

    updatePriority = ({currentTarget: input}) => {
        let {stories} = this.state;

        const index = stories.findIndex(story => story.id === input.name);
        let holder = [...stories];
        holder[index].index = input.value;
        this.setState({stories: [...holder]});
    };

    handleSubmit = async () => {
        this.setState({isSaving: true})

        let promises = [];
        const {stories, selectedCategory} = this.state;

        stories.forEach(story => {
            if (story.isRemoved) {
                promises.push(db_categories.doc(selectedCategory).collection('stories').doc(story.id).delete());
            } else {
                promises.push(db_categories.doc(selectedCategory).collection('stories').doc(story.id).set({
                    name: story.name,
                    index: parseInt(story.index)
                }, {merge: true}));
            }
        })

        await Promise.all(promises);
        showNotification(NOTIFICATION.SUCCESS, 'Category updated successfully');
        this.setState({isSaving: false})
    }

    render() {
        const {
            isSaving,
            isCategoriesLoading,
            isStoriesLoading,
            categories,
            stories,
            selectedCategory,
            categoryStories
        } = this.state;
        return (
            <div>
                <CRow>
                    <CCol>
                        <CCard>
                            <CCardBody>
                                <div className="d-flex justify-content-between align-items-center">
                                    <h2>Genre Picker - A/B Testing</h2>
                                    <CButton color="primary" className="px-3" onClick={this.handleSubmit}>Save</CButton>
                                </div>
                                <hr/>
                                {
                                    isSaving ?
                                        <div className="text-center">
                                            <CSpinner
                                                className="mt-5"
                                                color="primary"
                                                style={{width: '4rem', height: '4rem'}}
                                            />
                                        </div> :
                                        <CRow>
                                            <CCol lg={2}>
                                                <h5>Categories</h5>
                                                {
                                                    isCategoriesLoading ?
                                                        <Skeleton count={4} height={40}/> :
                                                        categories.map(category => (
                                                            <div key={category.id}
                                                                 className={classNames('border rounded mt-1 px-3 py-2 d-flex justify-content-between align-items-center hoverable', {'selected': selectedCategory === category.id})}
                                                                 onClick={() => this.selectCategory(category.id)}>
                                                                <p className="mb-0">{category.name}</p>
                                                                <CIcon content={freeSet.cilArrowRight} size="sm"
                                                                       className="m-0"/>
                                                            </div>
                                                        ))
                                                }
                                                <p className="mt-4 mb-0 small text-muted">* Remember to save for every
                                                    category separately.</p>
                                            </CCol>
                                            <CCol lg={10}>
                                                <h5>Stories</h5>
                                                <div className="border rounded mt-1 px-3 py-2">
                                                    <CRow>
                                                        {
                                                            isStoriesLoading ? <Skeleton count={4} height={40}/> :
                                                                stories.map(story => (
                                                                    <CCol lg={4}>
                                                                        <div
                                                                            className="mt-1 d-flex justify-content-between align-items-center">
                                                                            <div className="pl-4">
                                                                                <CInputCheckbox id={story.id}
                                                                                                name={story.name}
                                                                                                type="checkbox"
                                                                                                checked={!story.isRemoved}
                                                                                                custom
                                                                                                onChange={this.addToCategory}
                                                                                />
                                                                                <CLabel htmlFor={story.id}
                                                                                        variant="custom-checkbox">
                                                                                    {story.name}
                                                                                </CLabel>
                                                                            </div>
                                                                            <CInput name={story.id} type="number"
                                                                                    placeholder={'Priority'}
                                                                                    disabled={story.isRemoved}
                                                                                    style={{maxWidth: '100px'}}
                                                                                    value={story.index ? story.index : ''}
                                                                                    onChange={this.updatePriority}
                                                                                    required
                                                                            />
                                                                        </div>
                                                                    </CCol>
                                                                ))
                                                        }
                                                    </CRow>
                                                </div>
                                            </CCol>
                                        </CRow>
                                }
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </div>
        )
    }
}
