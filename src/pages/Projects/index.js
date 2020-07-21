import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ProjectsList from './pages/List';
import ProjectEdit from './pages/Edit';
import ProjectCreate from './pages/Create';
import { getRoute } from '../../utils/router';

import './routes';

class Projects extends React.Component {
	render() {
		return (
			<BrowserRouter>
                <Switch>                   
                    <Route
                        key="projects-list"
                        path={getRoute('projects-list').path}
                        component={ProjectsList}
                        exact
                    />
                    <Route
                        key="project-edit"
                        path={getRoute('project-edit').path}
                        component={ProjectEdit}
                        exact
                    />
                    <Route
                        key="project-create"
                        path={getRoute('project-create').path}
                        component={ProjectCreate}
                        exact
                    />
                </Switch>
            </BrowserRouter>
		);
	}
}

export default Projects;
