const express = require('express');
//ini untuk automate memasukan semua path/url untuk dimonitoring (intercept using middleware)
const promMid = require('express-prometheus-middleware');


//ini untuk prometheus custom metric
const client = require('prom-client');

const app = express();

const PORT = 9091;
const gauge = new client.Gauge({
  name: 'appVersion',
  help: 'appVersion',
  labelNames: ['version'],
});

// 1st version: Set value to 100 with "method" set to "GET" and "statusCode" to "200"
gauge.set({ version: 'v1000' }, 100);


app.use(promMid({
  metricsPath: '/metrics',
  collectDefaultMetrics: true,
  requestDurationBuckets: [0.1, 0.5, 1, 1.5],
  requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
  responseLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
  /**
   * Uncomenting the `authenticate` callback will make the `metricsPath` route
   * require authentication. This authentication callback can make a simple
   * basic auth test, or even query a remote server to validate access.
   * To access /metrics you could do:
   * curl -X GET user:password@localhost:9091/metrics
   */
  // authenticate: req => req.headers.authorization === 'Basic dXNlcjpwYXNzd29yZA==',
  /**
   * Uncommenting the `extraMasks` config will use the list of regexes to
   * reformat URL path names and replace the values found with a placeholder value
  */
  // extraMasks: [/..:..:..:..:..:../],
  /**
   * The prefix option will cause all metrics to have the given prefix.
   * E.g.: `app_prefix_http_requests_total`
   */
  // prefix: 'app_prefix_',
  /**
   * Can add custom labels with customLabels and transformLabels options
   */
   customLabels: ['appVersion'],
   transformLabels(labels, req) {
     // eslint-disable-next-line no-param-reassign
     labels.appVersion = 'v.1.2.0';
   },
}));

// curl -X GET localhost:9091/hello?name=Chuck%20Norris
app.get('/hello', (req, res) => {
  console.log('GET /hello');
  const { name = 'Anon' } = req.query;
  res.json({ message: `Hello, ${name}!` });
});

app.listen(PORT, () => {
  console.log(`Example api is listening on http://localhost:${PORT}`);
});
