export function validateURL(url) {
  const pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  return pattern.test(url);
}

export function urlWithoutProtocol(url) {
  url = url.replace(/(^\w+:|^)\/\//, ''); // (Remove protocol)
  url = url.replace(/\/$/, ''); // (Remove trailing slash)
  return url;
}