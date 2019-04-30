import fetch from 'dva/fetch';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));
}

export async function post(url, params) {
  const response = await fetch('/giant' + url, {
    credentials: 'same-origin',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // 'Eccom-Token': window.localStorage.getItem('Eccom-Token'),
    },
    body: JSON.stringify(params),
  });
  const { status } = response;
  if (status === 401) {
    window.location.href = '/login';
    // window.localStorage.removeItem('Eccom-Token');
  } else {
    return response.json()
      .then((json) => {
        return {
          fetchSuccess: true,
          ...json,
        };
      }).catch((error) => {
        return {
          fetchSuccess: false,
          statusCode: status,
          message: error.message,
        };
      });
  }
}
