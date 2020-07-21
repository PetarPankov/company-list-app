import * as actionTypes from './actionTypes';
import { fromJS } from 'immutable';

export const defaultState = fromJS({
    projects: [],
    companyId: ''
});

const listProjects = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.GET_PROJECTS_BY_COMPANY_ID: {
            if (action.state === 'finished') {

                state = state
                    .set('companyId', fromJS(action.body.companyId))
                    .set('projects', action.response);

            }

            return state;
        }
        case actionTypes.DELETE_PROJECT: {
            return state;
        }        
    }

    return state;
};

export default listProjects;
