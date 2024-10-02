import Noty from 'noty';

var my_state = null;

export const showNotification = ( type, text, timeout = 3000) => {
    new Noty({
        theme: 'bootstrap-v4',
        type: type,
        layout: 'bottomLeft',
        text: text,
        timeout: timeout,
        progressBar: false,
        closeWith: ['button']
    }).show();
}

export const NOTIFICATION = {
    ALERT: 'alert',
    SUCCESS: 'success',
    WARNING: 'warning',
    ERROR: 'error',
    INFO: 'info',
}

export const saveState = (state) => {
    my_state = state;
}

export const getState = () => {
    return my_state;
}

export const updateStoryData = (id, name, status = 'publish') => {
    let stories = [...my_state.stories];
    if (stories) {
        stories.forEach(story => {
            if (story.id === id) {
                story.name = name;
                story.status = status;
            }
        });
        my_state.stories = [...stories];
    }
}

export const updateEpisodeName = (id, name) => {
    let episodes = [...my_state.episodes];
    if (episodes) {
        episodes.forEach(episode => {
            if (episode.id === id) episode.name = name;
        });
        my_state.episodes = [...episodes];
    }
}
