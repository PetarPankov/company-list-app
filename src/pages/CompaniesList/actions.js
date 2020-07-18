import * as actionTypes from './actionTypes';

export const getCompanies = () => {
    return {
        type: actionTypes.GET_COMPANIES,
        requestType: 'GET',
        request: `/companies`
    };
};

export const getProjectsByCompanyId = companyId => {
    return {
        type: actionTypes.GET_PROJECTS_BY_COMPANY_ID,
        body: { companyId }
        //requestType: 'GET',
        //request: `/companies`
    };
};

export const getEmployeesByCompanyId = companyId => {
    return {
        type: actionTypes.GET_EMPLOYEES_BY_COMPANY_ID,
        //requestType: 'GET',
        //request: `/get-employees`,
        body: { companyId }
    };
};

export const getCompanyAddress = companyId => {
    return {
        type: actionTypes.GET_COMPANY_ADDRESS,
        //requestType: 'GET',
        //request: `/get-employees`,
        body: { companyId }
    };
};
