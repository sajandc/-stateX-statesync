import axios from "axios";
import qs from "qs";
import { clearAllCache } from "./cache";

const createOptions = (
  url,
  apiMethod,
  query,
  isFormData,
  isBlobRes,
  isFormEncodeInPut
) => {
  const options = {
    method: apiMethod.toUpperCase(),
    url: url,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  switch (apiMethod.toLowerCase()) {
    case "get": {
      options.params = query;
      if (isBlobRes) {
        options.responseType = "blob";
      }
      break;
    }
    case "post": {
      if (isFormData) {
        options.headers["Content-Type"] = "multipart/form-data";
        options.data = query;
      } else {
        options.data = qs.stringify(query);
        options.headers["Content-Type"] = "application/x-www-form-urlencoded";
      }
      break;
    }
    case "put": {
      if (isFormEncodeInPut) {
        options.data = qs.stringify(query);
        options.headers["Content-Type"] = "application/x-www-form-urlencoded";
      } else {
        options.data = query;
      }
      break;
    }
    case "delete": {
      options.data = query;
      break;
    }
    default:
      options.data = query;
  }

  return options;
};

export const callApi = (
  url,
  apiMethod,
  query,
  isFormData = false,
  hasRole,
  isBlobRes = false,
  isFormEncodeInPut = false,
  isCache = false
) =>
  new Promise((resolve, reject) => {
    const options = createOptions(
      url,
      apiMethod,
      query,
      isFormData,
      hasRole,
      isBlobRes,
      isFormEncodeInPut,
      isCache
    );

    !isCache
      ? callAxois(options, url, resolve, reject, undefined, query)
      : caches.open(cacheName).then((cache) => {
          cache.match(options.url).then((cachedResponse) => {
            if (!cachedResponse) {
              callAxois(options, url, resolve, reject, cache);
            } else {
              (async () => {
                let json = await cachedResponse.json();
                resolve(handleSuccess(json));
              })();
            }
          });
        });
  });

const callAxois = (options, url, resolve, reject, cache, query) => {
  axios(options)
    .then((response) => {
      cache?.put(options.url, new Response(JSON.stringify(response)));
      resolve(handleSuccess(response));
    })
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        handleLogout(error.response);
      } else {
        reject(
          handleError(
            error.response || {
              status: 0,
              statusText: error.stack,
              data: { res_str: error.message },
            }
          )
        );
      }
    });
};

const handleSuccess = (response) => {
  const { data } = response;
  return data;
};
const handleError = (error) => {
  const { status, statusText, data } = error;
  const errRes = {
    status,
    statusText,
    logout: false,
    data,
  };

  return errRes;
};

export const handleLogout = () => {
  clearAllCache();
};
