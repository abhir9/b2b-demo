

var config = {};
config.environment = process.env.Env || "dev"; // Possible values are: 'dev', 'stag' and 'prod'.
config.port = process.env.Port || "3001";
config.apiDomain = process.env.apiDomain || "devapi.lrinternal.com";
config.apiKey = process.env.key || "5476ffe6-6f76-4897-b597-b339ac57ea79";
config.apiSecret =  process.env.secret || "57265328-9777-4fe9-b33d-fc6762feb260";
config.idxDomain = 'https://b2b-demo.devhub.lrinternal.com/auth';
config.apiEndpoint = 'https://b2blrdemo.herokuapp.com';
module.exports = config;
