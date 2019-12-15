module.exports =  function (req, res, next) {
  if (req.method !== 'GET') {
    // Converts POST to GET and move payload to query params
    // This way it will make JSON Server that it's GET request
    req.method = 'GET';
    req.query = {};

    let url = req.url;

    url = url.split('/').join('.').substr(1);
    req.url = '/'+url;
  }
  // Continue to JSON Server router
  next();
}
