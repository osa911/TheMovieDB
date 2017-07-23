export const setValue = (filters, key, value, obj = false) => {
  if (Array.isArray(key) && key.length > 1) {
    const keys = [...key];
    const currentKey = keys.shift();
    return {
      [currentKey]: {
        ...filters[currentKey],
        ...setValue(filters[currentKey], keys, value, true),
      },
    };
  }
  if (obj) {
    return {
      [key[0]]: value,
    };
  }
  return {
    [key]: value,
  };
};


export const setFiltersValue = (filters, key, value, obj = false) => {
  if (Array.isArray(key) && key.length > 1) {
    const keys = [...key];
    const currentKey = keys.shift();
    return {
      [currentKey]: {
        ...filters[currentKey],
        ...setFiltersValue(filters[currentKey], keys, value, true),
      },
    };
  }
  if (obj) {
    return {
      [key[0]]: { ...filters[key[0]], value },
    };
  }
  return {
    [key]: value,
  };
};
