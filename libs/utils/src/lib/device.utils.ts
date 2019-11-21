import isMobilejs from 'ismobilejs';

export function isMobile(isBrowser: boolean): boolean {
  if (isBrowser) {
    return isMobilejs(window.navigator.userAgent).any;
  } else {
    // TODO: check server side the user agent
  }
}
