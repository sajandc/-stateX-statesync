export const clearAllCache = () => {
  caches
    ?.keys()
    ?.then((keyList) => Promise.all(keyList.map((key) => caches?.delete(key))));
};
