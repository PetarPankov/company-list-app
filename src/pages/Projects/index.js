import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ProjectsList from './pages/List';
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
                </Switch>
            </BrowserRouter>
		);
	}
}

export default Projects;
