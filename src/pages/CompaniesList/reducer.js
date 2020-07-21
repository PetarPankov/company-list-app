import { defaultState } from './defaultState';
import * as actionTypes from './actionTypes';
import { fromJS } from 'immutable';

const companiesList = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.GET_COMPANIES: {
            if (action.state === 'finished') {
                return state
                    .set('companies', action.response)
            }

            return state;
        }
        case actionTypes.GET_EMPLOYEES_BY_COMPANY_ID: {
			if (action.state === 'finished') {
				state = state
					.setIn(['selectedEmployees', action.body.companyId], action.response)
            }           
        }

        case actionTypes.GET_PROJECTS_BY_COMPANY_ID: {
            if (action.state === 'finished') {

                state = state
                    .set('selectedCompanyId', fromJS(action.body.companyId))
                    .setIn(['selectedProjects', action.body.companyId], action.response)
                    .set('employeeDetails', fromJS({}));

            }

            return state;
        }

        case actionTypes.GET_COMPANY_ADDRESS: {
			if (action.state === 'finished') {
				state = state
					.set('selectedCompanyAddress', action.response);
            } 
            return state;          
        }

        case actionTypes.GET_EMPLOYEE_BY_ID: {
			if (action.state === 'finished') {
				state = state
					.set('employeeDetails', action.response);
            } 
            return state;          
        }
    }

    return state;
};

export default companiesList;
