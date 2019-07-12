interface ICallApi {
  content: string
}

const API_URL: string = 'https://api.github.com/repos/binary-studio-academy/stage-2-es6-for-everyone/contents/resources/api/';

function callApi(endpoind: string, method: string): Promise<ICallApi> {
  const url: string = API_URL + endpoind;
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

interface IData {
  _id: string;
  name: string;
  health?: number;
  attack?: number;
  defense?: number;
  source: string;
}

interface IGetData {
  (urlEndpoint: string): Promise<IData[] | IData>;
}

const getData: IGetData = async function (urlEndpoint) {
  try {
    const apiResult = await callApi(urlEndpoint, 'GET');
    const content: string = apiResult.content;

    return JSON.parse(atob(content));
  } catch (error) {
    throw error;
  }
}

export { getData, IData }