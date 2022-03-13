var SibApiV3Sdk = require('sib-api-v3-sdk');
var defaultClient = SibApiV3Sdk.ApiClient.instance;

// Configure API key authorization: api-key
var apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.API_KEY_SENDINBLUE;

var apiInstance = new SibApiV3Sdk.ContactsApi();
let createContact = new SibApiV3Sdk.CreateContact();
let transactionalEmailsApi = new SibApiV3Sdk.TransactionalEmailsApi();


module.exports.createContact = createContact;
module.exports.apiInstance = apiInstance;
module.exports.transactionalEmailsApi = transactionalEmailsApi;