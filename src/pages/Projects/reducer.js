import { fromJS } from 'immutable';

import editProject, {
	defaultState as editProjectDefaultState
} from './pages/Edit/reducer';

export const defaultState = fromJS({
	editProject: editProjectDefaultState
});

export default function projects(state = defaultState, action) {
	return state
		.set('editProject', editProject(state.get(editProject), action));
}
