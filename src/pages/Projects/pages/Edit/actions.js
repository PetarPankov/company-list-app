import * as actionTypes from './actionTypes';

export const getProjectById = projectId => {
    return {
        type: actionTypes.GET_PROJECT_BY_ID,
        requestType: 'GET',
        request: `/get-project-by-id?id=${projectId}`,
        body: { projectId }
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

export const getAllEmployees = () => {
    return {
        type: actionTypes.GET_ALL_EMPLOYEES,
        requestType: 'GET',
        request: `/get-employees`
    };
};

export const handleToggle = (id, type) => {
    return {
        type: actionTypes.HANDLE_TOGGLE,
        body: { id, type }
    };
};


export const assignEmployeesToProject = () => {
    return {
        type: actionTypes.ASSIGN_EMPLOYEES_TO_PROJECT
    };
};


export const removeEmployeesFromProject = () => {
    return {
        type: actionTypes.REMOVE_EMPLOYEES_FROM_PROJECT
    };
};
