import axios from 'axios';

const baseURL = process.env.REACT_APP_API_BASE_URL;

const useHttp = (loginInfo) => {
  const getConfig = (config, isJson = true) => {
    const defaultConfig = {
      baseURL,
      headers: {}
    };
    if (isJson) {
      defaultConfig.headers['Content-Type'] = 'application/json';
    };
    if (loginInfo) {
      defaultConfig.headers['Authorization'] = `Bearer ${loginInfo.token}`
    }
    return Object.assign(defaultConfig, config);
  };

  const httpGet = async (path, params, config) => {
    const requestConfig = getConfig(Object.assign({ params }, config));
    const res = await axios.get(path, requestConfig);
    return res.data;
  };

  const httpPost = async (path, data, config) => {
    const requestConfig = getConfig(config);
    if (data instanceof FormData) {
      delete requestConfig.headers['Content-Type'];
    }
    const res = await axios.post(path, data, requestConfig);
    return res.data;
  };

  const httpPut = async (path, data, config) => {
    const requestConfig = getConfig(config);
    if (data instanceof FormData) {
      delete requestConfig.headers['Content-Type'];
    }
    const res = await axios.put(path, data, requestConfig);
    return res.data;
  };

  const httpDelete = async (path, params, config) => {
    const requestConfig = getConfig(Object.assign({ params }, config));
    const res = await axios.delete(path, requestConfig);
    return res.data;
  };

  return {
    get: httpGet,
    post: httpPost,
    put: httpPut,
    delete: httpDelete,
  }
};

export default useHttp;