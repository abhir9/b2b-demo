/*
 * Created by LoginRadius Development Team
   Copyright 2019 LoginRadius Inc. All rights reserved.
*/
module.exports = function (config) {
    var module = {};
    var helper = require(config.HELPER_PATH);
  
    module.getOrganizationByName = function (name) {
      if (helper.isNullOrWhiteSpace(name)) {
        return Promise.reject(helper.getValidationMessage('name'));
      }
      var queryParameters = {};
  
      queryParameters.apiKey = config.apiKey;
      queryParameters.apiSecret = config.apiSecret;
  
      var resourcePath = 'identity/v2/manage/organizations/name/' + name;
  
      return config.request('GET', resourcePath, queryParameters, null);
    };

    module.createTeamMember = function (accountCreateModel, id, fields) {
      if (helper.checkJson(accountCreateModel)) {
        return Promise.reject(helper.getValidationMessage('memberModel'));
      }
      if (helper.isNullOrWhiteSpace(id)) {
        return Promise.reject(helper.getValidationMessage('id'));
      }
      var queryParameters = {};
  
      queryParameters.apiKey = config.apiKey;
      queryParameters.apiSecret = config.apiSecret;
      if (!helper.isNullOrWhiteSpace(fields)) {
        queryParameters.fields = fields;
      }
  
      var resourcePath = 'identity/v2/manage/organizations/' + id + '/members';
  
      return config.request('POST', resourcePath, queryParameters, accountCreateModel);
    };

    module.createOrganizationByName = function (Model) {
      if (helper.checkJson(Model)) {
        return Promise.reject(helper.getValidationMessage('Model'));
      }
      var queryParameters = {};
  
      queryParameters.apiKey = config.apiKey;
      queryParameters.apiSecret = config.apiSecret;
        
      var resourcePath = 'identity/v2/manage/organizations';
  
      return config.request('POST', resourcePath, queryParameters, Model);
    };

    module.deleteTeamMember = function (orgId, deleteUidModel) {
      var queryParameters = {};
  
      queryParameters.apiKey = config.apiKey;
      queryParameters.apiSecret = config.apiSecret;
  
      var resourcePath = 'identity/v2/manage/organizations/'+orgId+'/members';
  
      return config.request('DELETE', resourcePath, queryParameters, deleteUidModel);
    };
    return module;
  };
  