const http = require('http');

http.get('http://39.97.3.27:4000/quark/page/getMyPages?type=my&pageMode=h5', function(res) {
  console.log('status code: ' + res.statusCode);
  console.log('headers: ' + res.headers);

  res.on('data', function(data) {
    process.stdout.write(data);
  });
}).on('error', function(err) {
  console.error(err);
});
