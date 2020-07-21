import * as actionTypes from './actionTypes';

export const createProject = project => {
    return {
        type: actionTypes.CREATE_PROJECT,
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
