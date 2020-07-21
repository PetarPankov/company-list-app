import * as actionTypes from './actionTypes';

export const getAllEmployees = () => {
    return {
        type: actionTypes.GET_ALL_EMPLOYEES,
        body: { }
        //requestType: 'GET',
        //request: `/companies`
    };
};