import { fromJS } from 'immutable';

import editProject, {
	defaultState as editProjectDefaultState
} from './pages/Edit/reducer';

import createProject, {
	defaultState as createProjectDefaultState
} from './pages/Create/reducer';

import listProjects, {
	defaultState as listProjectsDefaultState
} from './pages/List/reducer';

export const defaultState = fromJS({
    editProject: editProjectDefaultState,    
	createProject: createProjectDefaultState,
	listProjects: listProjectsDefaultState,
});

const EDIT_PROJECT = 'editProject';
const CREATE_PROJECT = 'createProject';
const LIST_PROJECTS = 'listProjects';

export default function projects(state = defaultState, action) {
	return state
		.set(EDIT_PROJECT, editProject(state.get(EDIT_PROJECT), action))
		.set(CREATE_PROJECT, createProject(state.get(CREATE_PROJECT), action))
		.set(LIST_PROJECTS, listProjects(state.get(LIST_PROJECTS), action));
}
