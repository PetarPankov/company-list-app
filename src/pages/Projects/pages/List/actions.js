import * as actionTypes from './actionTypes';

export const deleteProject = projectId => {
    return {
        type: actionTypes.DELETE_PROJECT,
        requestType: 'DELETE',
        request: `/delete-project?id=${projectId}`,
        body: { projectId }
    };
}

export const getProjectsByCompanyId = companyId => {
    return {
        type: actionTypes.GET_PROJECTS_BY_COMPANY_ID,
        requestType: 'GET',
        request: `/get-projects-by-company-id?id=${companyId}`,
        body: { companyId }
    };
};