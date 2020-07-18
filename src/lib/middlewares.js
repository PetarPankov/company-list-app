import axios from 'axios';

import Cookie from 'js-cookie';

import { fromJS } from 'immutable';

import {
	FINISHED,
	ERROR,
	SENT,
	FAIL_REQUEST_CODES,
	AUTH_TOKEN_COOKIE_NAME,
	IS_DEV
} from './constants';

import restApiConfig from './restApiConfig';

const apiBasePath = process.env.REACT_APP_BACKEND_URL

const getResponseInformation = ({ data, headers, status, statusText }) => ({
	data,
	headers,
	status,
	statusText
});

function tryFriendlyErrorMessage(error) {
	if (error && error.statusText && error.status && error.responseText) {
		return `${error.statusText} (${error.status}) - ${error.responseText}`;
	}

	return false;
}

const requestMiddleware = store => next => action => {
	const _action = { ...action };
	if (_action.request) {
		_action.state = SENT;

		next(_action);

		// Get the body.
		const body = Array.isArray(_action.body)
			? _action.body.concat([])
			: Object.assign({}, _action.body);

		// Setup headers from defaults.
		const headers = Object.assign(
			{
				'Content-Type': 'application/json'
			},
			restApiConfig.DefaultHeaders
		);

		if (Cookie.get('xsrf-token')) {
			headers['x-xsrf-token'] = Cookie.get('xsrf-token');
		}

		const axiosDefinition = {
			method: _action.requestType || 'POST',
			url: `${_action.specificURL ||
				[
					IS_DEV ? restApiConfig.url : undefined,
					_action.rawRequest ? null : apiBasePath,
					_action.request.startsWith('/')
						? _action.request.substr(1, _action.request.length)
						: _action.request
				]
					.filter(e => e)
					.join('/')}`,
			headers,
			data: body,
			withCredentials: false
		};

		if (_action.jsonrpc) {
			// TODO if needed
		}

		const isJsonRPC = !(_action.jsonrpc === false);

		const token = Cookie.getJSON(AUTH_TOKEN_COOKIE_NAME)
			? Cookie.getJSON(AUTH_TOKEN_COOKIE_NAME).accessToken
			: '';

		const config = Object.assign(axiosDefinition, _action.axios || {});

		// Include Authorization token in all requests
		config.headers[AUTH_TOKEN_COOKIE_NAME] = token;
		return axios(config)
			.then(response => {
				_action.state =
					FAIL_REQUEST_CODES.indexOf(response.status) !== -1
						? ERROR
						: FINISHED;

				const isBlob = response.data instanceof Blob;

				_action.response = isBlob
					? response.data
					: fromJS(getResponseInformation(response || {}).data);

				if (
					isJsonRPC &&
					!isBlob &&
					typeof _action.response === 'object'
				) {
					_action.response =
						_action.response.get('result') || _action.response;
				}

				if (
					!isBlob &&
					typeof _action.response === 'object' &&
					_action.response.get('error')
				) {
					throw new Error({
						response
					});
				}

				next(_action);

				return _action;
			})
			.catch(error => {
				if (error instanceof TypeError || !error.response) {
					throw error;
				}

				_action.state = ERROR;

				_action.response = {
					...getResponseInformation(error.response || {}).data
				};

				// Check if response is empty, and generate an empty map.
				if (!action.response) {
					if (error.hasOwnProperty('status') && error.status === 0) {
						// Check for no connection error.
						_action.response = fromJS({
							message: 'No connection.'
						});
					} else if (error.isAxiosError) {
						const { data } = error.response;

						_action.response = fromJS({
							code: data.messageCode,
							message: data.error
						});
					} else if (error.reason) {
						// If the error has a reason, set it under the message.
						_action.response = fromJS({
							message: error.reason
						});
					} else {
						// Else set the whole error object to the response.
						const friendlyMessage = tryFriendlyErrorMessage(error);

						error =
							friendlyMessage !== false
								? { message: friendlyMessage }
								: error;
						action.response =
							friendlyMessage !== false ? error : fromJS(error);
					}
				}

				// Force logout users with expired session (unauthorized)
				if (error.response && error.response.shouldRelog) {
					//store.dispatch(shouldRelog());
				} else {
					next(_action);
				}

				return _action;
			});
	}

	return new Promise(resolve => {
		if (_action.type === undefined) {
			_action.type = '';
		}
		next(_action);
		resolve();
	});
};

export default [requestMiddleware];
