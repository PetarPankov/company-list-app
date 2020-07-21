import * as actionTypes from './actionTypes';

export const getCompanies = () => {
    return {
        type: actionTypes.GET_COMPANIES,
        requestType: 'GET',
        request: `/get-companies`
    };
};

export const getProjectsByCompanyId = companyId => {
    return {
        type: actionTypes.GET_PROJECTS_BY_COMPANY_ID,
        requestType: 'GET',
        request: `/get-projects-by-company-id?id=${companyId}`,
        body: { companyId }
    };
};

export const getEmployeesByCompanyId = companyId => {
    return {
        type: actionTypes.GET_EMPLOYEES_BY_COMPANY_ID,
        requestType: 'GET',
        request: `/get-employees-by-company-id?id=${companyId}`,
        body: { companyId }
    };
};

export const getCompanyAddress = companyId => {
    return {
        type: actionTypes.GET_COMPANY_ADDRESS,
        requestType: 'GET',
        request: `/get-company-address?id=${companyId}`,
        body: { companyId }
    };
};

export const getEmployeeDetails = id => {
    return {
        type: actionTypes.GET_EMPLOYEE_BY_ID,
        requestType: 'GET',
        request: `/get-employee-by-id?id=${id}`,
        body: { id }
    };
};
