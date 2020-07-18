export const FINISHED = 'finished';
export const REQUESTED = 'requested';
export const SENT = 'sent';
export const ERROR = 'error';

export const REQUEST_TYPES = {
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	DELETE: 'DELETE',
	PATCH: 'PATCH'
};

export const apiBasePath = 'https://api-company-task.herokuapp.com';

//export const apiBasePath = 'https://api-movie-news-tab-dev.herokuapp.com';

// export const apiBasePath = 'https://api.swnewtab.com';

export const IS_DEV = process.env.NODE_ENV === 'development';

export const AUTH_TOKEN_COOKIE_NAME = 'Authorization';

export const FAIL_REQUEST_CODES = ['501', '404', '401', '412', '400'];
