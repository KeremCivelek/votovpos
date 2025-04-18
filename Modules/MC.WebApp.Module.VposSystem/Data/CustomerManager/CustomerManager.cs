using MC.Core;
using MC.Data;
using MC.WebApp.Core;
using MC.WebApp.Models;
using MC.WebApp.Models.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MC.WebApp.Module.VposSystem
{
    public class CustomerManager
    {
        #region Sap Customer Control And Save
        public ResponseViewModel SapCustomerControlAndAdd(List<UserViewModel> users, SapCustomerViewModel customer)
        {
            var result = new ResponseViewModel();
            using (var db = new MCDb())
            {
                db.BeginTransaction();
                try
                {
                    #region Customer Check
                    customer.CustomerCode = Convert.ToInt32(customer.CustomerCode).ToString();
                    var encryptedCustomerCode = SecurityUtil.Encrypt(customer.CustomerCode);
                    //Bu müşteri sistemde kayıtlı mı sorgulaması
                    var user = users.FirstOrDefault(s => s.UserName == encryptedCustomerCode);
                    if (!user.IsNull())
                    {
                        result.isSuccess = false;
                        result.Message = "Müşteri Veritabanında zaten mevcut!";
                        return result;
                    }
                    #endregion

                    #region Add User
                    var userDb = new User()
                    {
                        UserGuid = Guid.NewGuid(),
                        UserName = encryptedCustomerCode,
                        UserPassword = encryptedCustomerCode,
                        IsActive = true,
                    };
                    var responseUser = AddUser(userDb,db);
                    #endregion

                    #region Add UserProfile
                    var userProfile = new UserProfileDbModel()
                    {
                        Username = customer.CustomerName,
                        UserId = responseUser.Response,
                    };
                    var responseUserProfile = AddUserProfile(userProfile,db);
                    #endregion

                    db.Commit();
                    result.isSuccess = true;
                    result.Message = "Kullanıcı Başarıyla Eklendi.";
                    return result;
                }
                catch (Exception ex)
                {
                    db.RollBack();
                    LogManager.LogError(ex);
                    result.isSuccess = false;
                    result.Message = "Server Error";
                    return result;
                }
            }

        }
        public ResponseViewModel<int> AddUser(User user, MCDb db)
        {
            var result = new ResponseViewModel<int>();
            try
            {
                int? addResult = db.Add(user);
                result.isSuccess = addResult.HasValue ? true : false;
                result.Message = "Kullanıcı Başarıyla Eklendi";
                result.Response = addResult.Value;
                return result;

            }
            catch (Exception ex)
            {
                LogManager.LogError(ex);
                result.isSuccess = false;
                result.Message = "Server Error";
                return result;
            }

        }
        public ResponseViewModel AddUserProfile(UserProfileDbModel userProfile, MCDb db)
        {
            var result = new ResponseViewModel();
            try
            {
                int? addResult = db.Add(userProfile);
                result.isSuccess = addResult.HasValue ? true : false;
                result.Message = "Kullanıcı Profili Başarıyla Eklendi";
                return result;
            }
            catch (Exception ex)
            {
                LogManager.LogError(ex);
                result.isSuccess = false;
                result.Message = "Server Error";
                return result;
            }

        }
        #endregion

        #region Get UserList
        public ResponseViewModel<List<UserViewModel>> GetUsers()
        {
            ResponseViewModel<List<UserViewModel>> result = new ResponseViewModel<List<UserViewModel>>();
            try
            {
                using (var db = new MCDb())
                {
                    var userList = db.GetList<User>()
                                     .Select(s => (UserViewModel)s)
                                     .ToList();
                    result.Response = userList;
                    result.isSuccess = true;
                }
                return result;
            }
            catch (Exception ex)
            {
                LogManager.LogError(ex);
                result.isSuccess = false;
                result.Message = "Server Error";
                return result;
            }

        }

        #endregion
    }
}