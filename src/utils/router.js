import React from 'react';
import { Route } from 'react-router-dom';

const routes = {};

const buildLink = (path = '', parameters = {}) => {
	let result = path;

	Object.keys(parameters).forEach(parameter => {
		const parameterIndex = result.indexOf(`:${parameter}`);

		if (parameterIndex) {
			result = `${result.substr(0, parameterIndex)}${
				parameters[parameter]
			}${result.substr(
				parameterIndex + 1 + parameter.length,
				result.length
			)}`;
		}
	});

	return result;
};

export const getRoutes = () => Object.assign({}, routes);

export const getRoute = (name, parameters) => {
	const route = routes[name];

	if (!route) {
		throw new Error('Route not found' + route );
	}

	return Object.assign({}, route, {
		link: route.static ? route.path : buildLink(route.path, parameters)
	});
};

export const addRoute = (
	name,
	path,
	component = null,
	parentName = null,
	routeProps = {},
	buildRouteComponent = true
) => {
	if (!routes[name]) {
		const thePath =
			parentName && routes[parentName]
				? [routes[parentName].path, path].join('/')
				: path;

		routes[name] = {
			name,
			parent: parentName,
			static: !thePath.includes(':'), // the route has no parameters, this prop allows for easier filtering between navigational routes and a dynamic ones
			path: thePath,
			component:
				component && buildRouteComponent ? (
					<Route
						{...routeProps}
						path={thePath}
						component={component}
					/>
				) : (
					component
				)
		};
	}

	if (buildRouteComponent) {
		return getRoute(name).component;
	}

	return routes[name];
};

export const getRouteLink = (name, parameters) =>
	getRoute(name, parameters).link;
