import * as actionTypes from './actionTypes';
import { fromJS } from 'immutable';

export const defaultState = fromJS({
    selectedProject: {
        id: '',
        name: '',
        department: '',
        employeesId: [],
        companyId: ''
    }
});

const editProject = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.GET_PROJECT_BY_ID: {

            return state
                .set('selectedProject', fromJS({
                    "id": "0b08928d-4244-4d76-b7ac-72e17183247a",
                    "name": "Sleek Concrete Shoes",
                    "department": "Kids",
                    "employeesId": [],
                    "companyId": "3c26ed77-821c-4fc8-91d3-034ccfdc2179"
                }));

        }
        case actionTypes.EDIT_PROJECT: {

            return state
                .set('selectedProject', fromJS({
                    "id": "0b08928d-4244-4d76-b7ac-72e17183247a",
                    "name": "Sleek Concrete Shoes",
                    "department": "Kids",
                    "employeesId": [],
                    "companyId": "3c26ed77-821c-4fc8-91d3-034ccfdc2179"
                }));

        }
        case actionTypes.FIELD_CHANGE: {
            const { value, id } = action.body;
            return state
                .setIn(['selectedProject', id], value);

        }
    }

    return state;
};

export default editProject;
