

var config = {};
config.environment = process.env.Env || "prod"; // Possible values are: 'dev', 'stag' and 'prod'.
config.port = process.env.Port || "3001";
config.apiDomain = process.env.apiDomain || "api.loginradius.com";
config.apiKey = process.env.key || "c155b144-f103-4007-bcf0-932cbbf9f2f0";
config.apiSecret =  process.env.secret || "b54f27db-9c67-41e5-94a8-6c6dd8ee66f2";
config.idxDomain = 'https://b2b-demo.hub.loginradius.com/auth';
config.apiEndpoint = 'http://15.206.240.193:3001';
module.exports = config;
