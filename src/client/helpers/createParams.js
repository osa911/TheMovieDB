const getModifierValue = (value, modifier) => {
  const newValue = value;
  return modifier === 'lower' ? newValue.toLowerCase() : value;
};
// eslint-disable-next-line import/prefer-default-export
export const createParams = (filters = {}, params = {}) => {
  const result = Object.keys(filters).map((key, i) => {
    const {
      mainParam = '',
      isFirstParam = true,
      isMultiple = false,
    } = params;

    const filtersKey = filters[key];

    if (key === 'multiple' || !filtersKey) {
      return '';
    }

    const char = (isFirstParam && i === 0) ? '?' : '&';
    let paramKey = mainParam ? `${mainParam}[${key}]` : key;
    if (isMultiple) {
      paramKey = mainParam ? `filters[${mainParam}][]` : mainParam;
    }
    let comparison = '=';
    let paramValue = `${filtersKey}`;
    let modifier = '';

    if (typeof filtersKey === 'object') {
      const { value: filterValue, multiple } = filtersKey;

      if (multiple) {
        return createParams(
          filtersKey, { mainParam: key, isFirstParam: false, isMultiple: true },
        );
      } else if (filterValue === '') {
        return '';
      } else if (filterValue) {
        const { comparison: filterComparison, modifier: filterModifier } = filtersKey;
        comparison = filterComparison ? `=${filterComparison}|` : '=';
        paramValue = encodeURIComponent(getModifierValue(filterValue, filterModifier));
        modifier = filterModifier ? `|${filterModifier}` : ''; // eslint-disable-line no-multi-spaces
      } else {
        return createParams(filtersKey, { mainParam: key, isFirstParam: false });
      }
    }

    const { multiple } = filtersKey;
    return `${char}${paramKey}${multiple ? '[]' : ''}${comparison}${paramValue}${modifier}`;
  });

  // console.log('result: ', result.join('')); // eslint-disable-line no-console

  return result.join('');
};
