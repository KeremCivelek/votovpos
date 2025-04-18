using MC.Core;
using MC.Data;
using MC.WebApp.Core;
using MC.WebApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Mvc;

namespace MC.WebApp.Module.VposSystem
{
    public class BankManager
    {
        #region Bank Bin Numbers
        public ResponseViewModel<List<BankBinNumberViewModel>> GetBankBinNumbers(string lang, IMCController controller)
        {
            ResponseViewModel<List<BankBinNumberViewModel>> result = new ResponseViewModel<List<BankBinNumberViewModel>>();
            try
            {
                using (var db = new MCDb())
                {
                    var list = db.GetList<BankBinNumber>().Select(s => (BankBinNumberViewModel)s).ToList();
                    result.isSuccess = true;
                    result.Response = list;
                    result.Message = LanguageManager.Localize("Banka Bin Numaraları başarıyla listelendi", lang);
                }
            }
            catch (Exception ex)
            {
                LogManager.LogError(ex, controller.LogData);
                result.isSuccess = false;
                result.Message = ex.Message;
                return result;
            }
            return result;
        }
        public ResponseViewModel AddBankBinNumber(BankBinNumberViewModel model, string lang, IMCController controller)
        {
            var result = new ResponseViewModel();
            try
            {
                using (var db = new MCDb())
                {
                    var dbModel = (BankBinNumber)model;
                    int addId = db.Add(dbModel) ?? 0;
                    LogManager.LogInsertAsync(dbModel, controller.LogData);
                    result.isSuccess = true;
                    result.Message = LanguageManager.Localize("Banka Bin Numarası Ekleme başarılı", lang);
                }
            }
            catch (Exception ex)
            {
                LogManager.LogError(ex, controller.LogData);
                result.isSuccess = false;
                result.Message = "Server Error";
                return result;
            }

            return result;
        }
        public ResponseViewModel UpdateBankBinNumber(BankBinNumberViewModel model, string lang, IMCController controller)
        {
            var result = new ResponseViewModel();
            try
            {
                using (var db = new MCDb())
                {
                    var binNumber = db.Get<BankBinNumber>(model.BankBinNumberId);
                    if (binNumber.IsNull())
                    {
                        result.isSuccess = false;
                        result.Message = LanguageManager.Localize("Bin numarası bulunamadı", lang);
                        return result;
                    }

                    LogManager.LogBeforeUpdateAsync(binNumber.CreateClone(), controller.LogData);
                    model.CopyTo(binNumber);
                    db.Update(binNumber);
                    LogManager.LogAfterUpdateAsync(binNumber, controller.LogData);
                    result.isSuccess = true;
                    result.Message = LanguageManager.Localize("Banka Bin Numarası Güncelleme başarılı", lang);
                }
            }
            catch (Exception ex)
            {
                LogManager.LogError(ex, controller.LogData);
                result.isSuccess = false;
                result.Message = "Server Error";
                return result;
            }

            return result;
        }
        public ResponseViewModel DeleteBankBinNumber(int bankBinNumberId, string lang, IMCController controller)
        {
            var result = new ResponseViewModel();
            try
            {
                using (var db = new MCDb())
                {
                    var binNumber = db.Get<BankBinNumber>(bankBinNumberId);
                    if (binNumber.IsNull())
                    {
                        result.isSuccess = false;
                        result.Message = LanguageManager.Localize("Bin numarası bulunamadı", lang);
                        return result;
                    }

                    db.Delete(binNumber);
                    LogManager.LogDeleteAsync(binNumber, controller.LogData);
                    result.isSuccess = true;
                    result.Message = LanguageManager.Localize("Banka Bin Numarası Silme başarılı", lang);
                }
            }
            catch (Exception ex)
            {
                LogManager.LogError(ex, controller.LogData);
                result.isSuccess = false;
                result.Message = "Server Error";
                return result;
            }

            return result;
        }
        #endregion

        #region Provision İşlemleri
        public ResultViewModel CompleteProvision(Payment3DResponseViewModel model, string lang, IMCController controller)
        {
            ResultViewModel result = new ResultViewModel();
            try
            {
                //İşlem başarılı ise
                if (model.ProcReturnCode == "00" && model.TxnResult == "Success")
                {
                    SapInvoiceProvisionViewModel sapInvoiceProvisionViewModel = new SapInvoiceProvisionViewModel()
                    {
                        RequestGuid = model.RequestGuid,
                        TransactionDate = model.TransactionDate,
                        MerchantID = model.MerchantID,
                        OrderId = model.OrderId,
                        Hash = model.Hash,
                        Currency = ((eCurrency)model.Currency.As<int>()).ToString(),
                        PurchAmount = model.PurchAmount,
                        BankCode = model.BankCode.PadLeft(4, '0'),
                        BankName = getBankName(model.BankCode.As<int>(), lang),
                        CustomerCode = model.CustomerCode,
                        CompCode = model.CompCode
                    };
                    var sapResult = SapManager.Instance.SaveInvoiceProvision(sapInvoiceProvisionViewModel, lang, controller);
                    if (!sapResult.isSuccess)
                    {
                        result.isSuccess = false;
                        result.Message = sapResult.Message;
                        return result;
                    }
                }
            }
            catch (Exception ex)
            {
                LogManager.LogError(ex, controller.LogData);
                result.isSuccess = false;
                result.Message = ex.StackTrace;
                return result;
            }

            return result;
        }
        #endregion

        #region Private Methods
        private string getBankName(int bankCode, string lang = "TR")
        {
            try
            {
                var months = typeof(eBankCode).GetEnumDictionary().Select(s => new TextValueViewModel<int>()
                {
                    Text = LanguageManager.Localize(s.Key, lang),
                    Value = s.Value
                });

                return months.FirstOrDefault(f => f.Value == bankCode)?.Text;
            }
            catch (Exception ex)
            {
                LogManager.LogError(ex);
                throw;
            }
        }
        #endregion

    }
}