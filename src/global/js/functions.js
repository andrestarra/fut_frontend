export const api = "http://localhost:8000";

export const query = (url, data = null, method = null, callback) => {
  let parameters = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  if (method) parameters.method = method;
  if (data) parameters.body = JSON.stringify(data);

  fetch(`${api}/${url}`, parameters)
    .then(async response => {
      const status = response.status;
      if (status === 401) {
        window.location.href = "/no_session";
      } else {
        const resp = await response.json();
        callback(null, status, resp)
      }
    }).catch(error => callback(error));
}

export const generateFilters = (filters = []) => {
  return new Promise(resolve => {
    let f = '';
    filters.map(({ key, value }) => (f = `${f}&${key}=${value}`));
    console.log(f);
    resolve(f);
  });
};
