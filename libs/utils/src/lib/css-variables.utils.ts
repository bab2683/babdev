/**
 *
 * @param {string} varName  name of the css variable requested
 * @returns {string | null} value of the css var
 */
export function getCssVariableValue(varName: string): string | null {
  const value: string = getComputedStyle(document.documentElement).getPropertyValue(varName);
  return value !== '' ? value.trim() : null;
}

/**
 * @returns object with all variables
 */
export function getAllCssVariables(): { [name: string]: string } {
  const styles: CSSStyleDeclaration = getComputedStyle(document.documentElement);
  return Object.keys(styles).reduce((obj, currentKey) => {
    if (currentKey.indexOf('--') > -1) {
      obj[currentKey] = styles[currentKey];
    }
    return obj;
  }, {});
}
