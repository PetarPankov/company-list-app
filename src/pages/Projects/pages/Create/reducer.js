import * as actionTypes from './actionTypes';
import { fromJS } from 'immutable';

export const defaultState = fromJS({
    selectedProject: {},
    allEmployees: [],
    assignedEmployees: [],
    assignedEmployeesIds: [],
    checkedEmployees: {
        newEmployees: [],
        assignedEmployees: []
    }
});

const createProject = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_PROJECT: {
            console.log(state.toJS());
            return state;
        }

        case actionTypes.GET_ALL_EMPLOYEES: {
            if (action.state === 'finished') {
                let assignedEmployees = [];
                const assignedEmployeesIds = [];
                const allEmployees = action.response.toJS();
                let newAllEmployees = [];

                allEmployees.map(emp => {
                    if (assignedEmployeesIds.length > 0) {
                        assignedEmployeesIds.map(id => {
                            if (id === emp.id) {
                                assignedEmployees.push(emp);

                            }
                            newAllEmployees.push({ ...emp, isAssign: id === emp.id })
                        })
                    }
                    else {
                        newAllEmployees.push({ ...emp, isAssign: false })
                    }
                })



                state = state
                    .set('assignedEmployees', fromJS(assignedEmployees))
                    .set('allEmployees', fromJS(newAllEmployees));
            }
            return state;

        }

        case actionTypes.FIELD_CHANGE: {
            const { value, id } = action.body;
            state = state
                .setIn(['selectedProject', id], value);

            return state;

        }

        case actionTypes.HANDLE_TOGGLE: {
            const { id, type } = action.body;

            const checked = state.getIn(['checkedEmployees', type]);

            const currentIndex = checked.indexOf(id);
            const newChecked = [...checked];

            if (currentIndex === -1) {
                newChecked.push(id);
            } else {
                newChecked.splice(currentIndex, 1);
            }

            state = state
                .setIn(['checkedEmployees', type], fromJS(newChecked));

            return state;

        }

        case actionTypes.ASSIGN_EMPLOYEES_TO_PROJECT: {
            const employeesIds = state.getIn(['checkedEmployees', 'newEmployees']).toJS();
            const allEmployees = state.get('allEmployees').toJS();
            const assignedEmployees = state.get('assignedEmployees').toJS();
            const assignedEmployeesIds = state.get('assignedEmployeesIds').toJS();

            const newEmployees = [...assignedEmployees];
            const newEmployeesIds = [...assignedEmployeesIds, ...employeesIds];
            let newAllEmployees = [];
            
            allEmployees.map(emp => {
                if (employeesIds.length > 0) {
                    let isAssign = emp.isAssign;
                    employeesIds.map(id => {
                        if (emp.id === id) {
                            newEmployees.push(emp);
                            isAssign = true;
                        }
                    })
                    newAllEmployees.push({ ...emp, isAssign: isAssign })
                }
                else {
                    newAllEmployees.push(emp)
                }

            });

            state = state
                .setIn(['selectedProject', 'employeesId'], fromJS(newEmployeesIds))
                .setIn(['checkedEmployees', 'newEmployees'], fromJS([]))
                .set('assignedEmployees', fromJS(newEmployees))
                .set('assignedEmployeesIds', fromJS(newEmployeesIds))
                .set('allEmployees', fromJS(newAllEmployees));

            return state;
        }


        case actionTypes.REMOVE_EMPLOYEES_FROM_PROJECT: {
            let employeesIds = state.getIn(['checkedEmployees', 'assignedEmployees']).toJS();
            const assignedEmployees = state.get('assignedEmployees').toJS();
            const allEmployees = state.get('allEmployees').toJS();
            const newAssignedEmployeesIds = [];
            const newAssignedEmployees = [];
            let newAllEmployees = [];

            assignedEmployees.map(emp => {
                employeesIds.map(id => {
                    if (emp.id !== id) {
                        newAssignedEmployees.push(emp);
                        newAssignedEmployeesIds.push(emp.id);
                    }                                       
                })               
            });


            allEmployees.map(emp => {
                let isAssign = emp.isAssign;
                if (newAssignedEmployeesIds.length > 0) {
                    newAssignedEmployeesIds.map(id => {
                        if (emp.id !== id) {
                            isAssign = false;
                        }                
                    })
                    newAllEmployees.push({ ...emp, isAssign: isAssign })
                }
                else {
                    newAllEmployees.push({ ...emp, isAssign: false })
                }
            });

            state = state
                .set('assignedEmployees', fromJS(newAssignedEmployees))
                .set('assignedEmployeesIds', fromJS(newAssignedEmployeesIds))
                .setIn(['checkedEmployees', 'assignedEmployees'], fromJS([]))
                .set('allEmployees', fromJS(newAllEmployees))
                .setIn(['selectedProject', 'employeesId'], fromJS(newAssignedEmployeesIds));

            return state;
        }
    }

    return state;
};

export default createProject;
