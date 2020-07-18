import { combineReducers } from 'redux';
import companiesList from './pages/CompaniesList/reducer';
import projects from './pages/Projects/reducer';

export default combineReducers({
    companiesList,
    projects
});
