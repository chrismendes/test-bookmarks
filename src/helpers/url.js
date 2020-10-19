export function validateURL(url) {

  const pattern = new RegExp('^(https?:\\/\\/)?'+       // Protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // Domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+                      // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+                  // Port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+                         // Query string
    '(\\#[-a-z\\d_]*)?$','i');                          // Fragment locator
  return !!pattern.test(url);

}

function urlHasProtocol(url) {
  const pattern = /^https?:\/\//i;
  return pattern.test(url)
}

export function urlWithoutProtocol(url) {
  if(urlHasProtocol(url) === true) {
    url = url.replace(/(^\w+:|^)\/\//, ''); // (Remove protocol)
    url = url.replace(/\/$/, ''); // (Remove trailing slash)
  }
  return url;
}

export function urlWithProtocol(url) {
  const defaultProtocol = 'https://';
  if(urlHasProtocol(url) === false) {
    url = defaultProtocol + url;
  }
  return url;
}