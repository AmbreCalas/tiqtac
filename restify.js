'use strict';
/* Server side : database management */

var restify = require('restify');
var database = require('./database');

// Create server
var server = restify.createServer({
  name: 'RestifyServer',
  version: '0.0.1'
});
// Server settings
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.fullResponse());

function corsHandler(req, res, next) {
  var allowHeaders = ['Accept', 'Accept-Encoding', 'Accept-Language', 'Accept-Version', 'Api-Version', 'Authorization', 'Cache-Control', 'Connection', 'Content-Language', 'Content-Length', 'Content-MD5', 'Content-Type', 'Date', 'Dnt', 'Host', 'If-Modified-Since', 'Keep-Alive', 'Origin', 'Sid', 'Upgrade', 'User-Agent', 'WithCredentials', 'X-Api-Version', 'X-CustomHeader', 'X-CSRF-Token', 'X-Forwarded-For', 'X-Ping', 'X-PINGOTHER', 'X-Real-Ip', 'X-Requested-With', 'X-Response-Time'];
  if (res.methods.indexOf('OPTIONS') === -1) res.methods.push('OPTIONS');
  //res.origin('http://localhost:9000/*');
  res.header("Access-Control-Allow-Origin", "*", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); //"*", req.header("Access-Control-Request-Method"), res.methods.join(', ')
  res.header("Access-Control-Allow-Headers", allowHeaders.join(', '));
  res.setHeader('Access-Control-Expose-Headers', 'X-Api-Version, X-Request-Id, X-Response-Time, Cache-Control, Content-Language, Content-Type, Expires, Last-Modified, Pragma');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Request-Method', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header( "Access-Control-Max-Age", 1000);
  res.header( "Content-type","text/plain charset=UTF-8");
  //res.header( "Content-length", 0);
}
function routeOptions(req, res, next) {
  res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE');
  res.send(204);
  return next();
}

restify.CORS.ALLOW_HEADERS.push('sid');
restify.CORS.ALLOW_HEADERS.push('Authorization');
restify.CORS.ALLOW_HEADERS.push('Accept-Encoding');
restify.CORS.ALLOW_HEADERS.push('Accept-Language');
restify.CORS.ALLOW_HEADERS.push('X-Requested-With');
server.pre(restify.CORS({
  //origins: ['http://localhost:9000', 'http://localhost:8080'],  // defaults to ['*']
  credentials: true,
  headers: [
    "authorization",
    "Accept-Encoding",
    "Accept-Language",
    "withcredentials",
    "x-requested-with",
    "x-forwarded-for",
    "x-real-ip",
    "x-customheader",
    "X-Requested-With",
    "user-agent",
    "keep-alive",
    "host",
    "accept",
    "connection",
    "upgrade",
    "content-type",
    "dnt",
    "if-modified-since",
    "cache-control",
    "origin"
  ],
  methods: ['GET', 'PUT', 'DELETE', 'POST', 'OPTIONS']
}));
server.use(restify.CORS());
server.opts('/', corsHandler, routeOptions);
//'/pi/add/:piNumber/:firstCoeff/:secondCoeff'


/* CONSULTATION : GET */
// Get last pi
server.get('/pi/last', function (req, res, next) {
  database.last_pi().then(function (data) {
    res.send(data);
  });
  return next();
});

// Get fbl list for a pi
server.get('/pi/:piNumber/fbl/all', function (req, res, next) {
  database.fbl_all(req.params.piNumber).then(function (data) {
    res.send(data);
  });
  return next();
});

// Get all pi
server.get('/pi/all', function (req, res, next) {
  database.pi_all().then(function (data) {
    res.send(data);
  });
  return next();
});

// Get pi by number
server.get('/pi/:piNumber', function (req, res, next) {
  database.pi_by_number(req.params.piNumber).then(function (data) {
    res.send(data);
  });
  return next();
});

// Get fbl by id
server.get('/fbl/:fblId', function (req, res, next) {
  database.fbl_by_id(req.params.fblId).then(function (data) {
    res.send(data);
  });
  return next();
});

/* CREATION : POST */
// Create a pi
server.post('/pi/add/:piNumber/:firstCoeff/:secondCoeff', function(req, res, next) {
  database.last_pi().then(function (pi) {
    database.add_pi(req.params.piNumber, req.params.firstCoeff, req.params.secondCoeff, pi.pi_end_date).then(function (data) {
      res.send(data);
    });
    return next();
  })
});

// Create a fbl
server.post('/pi/:piNumber/fbl/add/:fblName/:description/:points/:md/:risk/:estimateMd/:proba', function(req, res, next) {
    database.add_fbl(req.params.piNumber, req.params.fblName, req.params.description, req.params.points, req.params.md, req.params.risk, req.params.estimateMd, req.params.proba).then(function (data) {
      res.send(data);
    });
    return next();
});


/* DELETION : DEL */
server.del('/fbl/:fblId/del', function(req, res, next) {
  database.delete_fbl(req.params.fblId).then(function (data) {
    res.send(data);
  });
  return next();
});


/* MODIFICATION : PUT */
server.put('/fbl/:fblId/:piNumber', function(req, res, next) {
  database.change_pi(req.params.fblId, req.params.piNumber).then(function (data) {
    res.send(data);
  });
  return next();
});


server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});

