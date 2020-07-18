import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { getRoute } from './utils/router';

import './routes';

import Projects from './pages/Projects';
import CompaniesList from './pages/CompaniesList';
import Dashboard from './pages/Dashboard';


class Router extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route
						key="dashboard"
						path={getRoute('dashboard').path}
						component={Dashboard}
						exact
					/>
                    <Route
                        key="companies-list"
                        path={getRoute('companies-list').path}
                        component={CompaniesList}
                    />                    
					<Route
						key="projects"
						path={getRoute('projects').path}
						component={Projects}
					/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Router;
