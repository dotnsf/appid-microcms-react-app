import { createClient } from 'microcms-js-sdk';

const client = createClient({
  serviceDomain: process.env.REACT_APP_CMS_DOMAIN,
  apiKey: process.env.REACT_APP_CMS_APIKEY
});

export default client;
