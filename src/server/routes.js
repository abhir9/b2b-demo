const config = require("../config.js");

const LoginRadiusSDK = require("loginradius-sdk")(config);
const router = require("express").Router();

router.get("/checkname", function sessions(req, res, next) {
    LoginRadiusSDK.organizationApi
      .getOrganizationByName(req.query.name)
      .then(function getOrganizationByName(response) {
res.json(response);
      })
      .catch(function getSessionError(err) {
        res.json(err);
      });
  });

   
  router.post("/login", function sessions(req, res, next) {
    const token = req.body.token;
    const domain = req.body.domain;
    LoginRadiusSDK.authenticationApi
      .getProfileByAccessToken(token)
      .then(function getOrganizationByName(userProfile) {
      if (!userProfile) {
        throw new Error("No user profile found for given access token.");
      }
      else {
        if(domain){
          LoginRadiusSDK.accountApi
          .updateAccountByUid({
            CustomFields: {
              employee: req.body.employee ? req.body.employee : "",
              role: req.body.role ? req.body.role : "",
              organization: req.body.organization ? req.body.organization : "",
            }
          }, userProfile.Uid);
          LoginRadiusSDK.organizationApi
      .createOrganizationByName({
        Name:domain, OwnerUid: userProfile.Uid
      })
      .then(function getOrganizationByName(response) {
        if(response.Name){
        res.json({
          name:userProfile.FullName,
          email:userProfile.Email[0].Value,
          uid: userProfile.Uid,
          role: ["Owner"],
          organization:response.Id
        })
      }
      })
      .catch((err)=> {
        res.json(err);
      });
        }
        else {
          // Get organization ID after login
          //userProfile.organization
          LoginRadiusSDK.roleApi.getRoleContextByUid(userProfile.Uid)
    .then(function getRoleContextByUid(response) {
      var orgId = userProfile.Organizations ? userProfile.Organizations[0].Id : ""
      if(response && response.Data.length && orgId){
        
        const roles =
        response.Data &&
        response.Data.filter(
          ({ Context }) =>
            Context &&
            Context === orgId);
        res.json({
          name:userProfile.FullName,
          email:userProfile.Email[0].Value,
          uid: userProfile.Uid,
          role: roles && roles[0].Roles,
          organization:orgId
        }) 
      }
      else {
        res.json({ErrorCode:"1090", Description:"User not exist"});
      }
    })
    .catch(function (err) {
      res.json(err);
    });
          
        }
        
      }
      })
      .catch(function getSessionError(err) {
        res.json(err);
      });
  });

  router.post("/team", function sessions(req, res, next) {
    const email = req.body.email;
    const orgId = req.body.ownerid;
    LoginRadiusSDK.organizationApi
      .createTeamMember({Email:email}, orgId)
      .then(function createTeamMember(teamProfile) {
      if (!teamProfile) {
        throw new Error("Unable to create team member");
      }
      else {
        //UId
        LoginRadiusSDK.roleApi.updateRoleContextByUid
    ({ rolecontext: [{
      context: orgId,
      Roles: req.body.roles,
      additionalpermissions: []
    }] }, teamProfile.UId)
    .then(function upsertRoleResp(response) {
      res.json(response);
    })
    .catch(function getSessionError(err) {
      res.json(err);
    });
      }
      })
      .catch(function getSessionError(err) {
        res.json(err);
      });
  });
  router.put("/role", function sessions(req, res, next) {
    const orgId = req.body.ownerid;
    const uid = req.body.uid;
    LoginRadiusSDK.roleApi.updateRoleContextByUid
    ({ rolecontext: [{
      context: orgId,
      Roles: req.body.roles,
      additionalpermissions: []
    }] }, uid)
    .then(function upsertRoleResp(response) {
      res.json(response);
    })
    .catch(function getSessionError(err) {
      res.json(err);
    });
  });
  
  router.post("/organization", function sessions(req, res, next) {
    const name = req.body.name;
    const uid = req.body.name;
    LoginRadiusSDK.organizationApi
      .createOrganizationByName({
        Name:name, OwnerUid: uid
      })
      .then(function getOrganizationByName(response) {
        res.json(response)
      })
      .catch((err)=> {
        res.json(err);
      });
  });

  router.delete("/team", function sessions(req, res, next) {
    const uids = req.body.uids;
    const orgId = req.body.orgId;
    LoginRadiusSDK.organizationApi
    .deleteTeamMember(orgId, {UId:[uids]}).then((deleteOrgMemeber)=>{
      res.json(deleteOrgMemeber)
    }).catch((e)=>{
      res.json(e)
    });
//     Promise.all([
//       LoginRadiusSDK.roleApi.deleteRoleContextByUid
//       (orgId, uids),
//       LoginRadiusSDK.organizationApi
//       .deleteTeamMember(orgId, {UId:[uids]})
//     ]).then(([deleteOrgMemeber, DeleteRoleContext])=>{
//       res.json(deleteOrgMemeber);
//     }).catch(([deleteOrgMemeberError, DeleteRoleContextError])=>{
// console.log(deleteOrgMemeberError)
// console.log(DeleteRoleContextError)
//     })
  });

  router.get("/team", function sessions(req, res, next) {
    const orgId = req.query.name;
    LoginRadiusSDK.roleApi.getRoleContextByContextName
    (orgId)
    .then(function upsertRoleResp(response) {
      res.json(response);
    })
    .catch(function getSessionError(err) {
      res.json(err);
    });
  });

  module.exports = router;