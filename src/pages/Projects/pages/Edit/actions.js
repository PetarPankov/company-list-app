import * as actionTypes from './actionTypes';

export const getProjectById = projectId => {
    return {
        type: actionTypes.GET_PROJECT_BY_ID,
        body: { projectId }
        //requestType: 'GET',
        //request: `/companies`
    };
};

export const editProject = project => {
    return {
        type: actionTypes.EDIT_PROJECT,
        body: { project }
        //requestType: 'GET',
        //request: `/companies`
    };
};

export const onFieldChange = (value, id) => {
    return {
        type: actionTypes.FIELD_CHANGE,
        body: { value, id }
    };
};

