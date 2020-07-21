import { fromJS } from 'immutable';

export const defaultState = fromJS({
    companies: [],
    selectedCompanyId: '',
    selectedProjects: {},
    selectedEmployees: {},
    selectedCompanyAddress: {},
    employeeDetails: {}
}); 