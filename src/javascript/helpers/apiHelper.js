const API_URL = 'https://api.github.com/repos/binary-studio-academy/stage-2-es6-for-everyone/contents/resources/api/';

function callApi(endpoind, method) {
  const url = API_URL + endpoind;
  const options = {
    method
  };

  return fetch(url, options)
    .then(response =>
      response.ok ? response.json() : Promise.reject(Error('Failed to load'))
    )
    .catch(error => {
      throw error;
    });
}

async function getData(urlEndpoint){
  try {
    const apiResult = await callApi(urlEndpoint, 'GET');

    return JSON.parse(atob(apiResult.content));
  } catch (error) {
    throw error;
  }
}

export { getData }