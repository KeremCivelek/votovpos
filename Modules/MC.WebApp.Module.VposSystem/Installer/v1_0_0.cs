using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

namespace MC.WebApp.Module.VposSystem.Installer
{
    public static class v1_0_0
    {
        public static string ToSql()
        {
            var sb = new StringBuilder();
            #region Schema
            sb.AppendLine(@"
                            IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'VposSystem')
                            BEGIN
                                EXEC('CREATE SCHEMA VposSystem AUTHORIZATION dbo')
                            END
                            ");
            #endregion
            #region Tables
            sb.AppendLine(@"
                             IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'VposSystem' AND TABLE_NAME = 'BankBinNumbers')
                                BEGIN
                                CREATE TABLE [VposSystem].[BankBinNumbers](
                                [BankBinNumberId] [int] IDENTITY(1,1) NOT NULL,
                                [BinNumber] [nvarchar](150) NOT NULL,
                                [BankaKodu] [nvarchar](50) NOT NULL,
                                [BankaAdi] [nvarchar](250) NOT NULL,
	                             CONSTRAINT [PK_BankBınNumbers] PRIMARY KEY CLUSTERED 
	                            (
		                            [BankBinNumberId] ASC
	                            )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
	                            ) ON [PRIMARY]
	                         END");
            #endregion
            
            #region Settings
            sb.AppendLine(@"
                            IF NOT EXISTS (SELECT * FROM System.Settings WHERE ModuleName = 'key_module_vpossystem' AND SettingName = 'key_module_sap_update')
                            BEGIN
                            INSERT INTO System.Settings(ModuleName,SettingName,BoolValue) VALUES('key_module_vpossystem','key_module_sap_update',1)
                            END
                            IF NOT EXISTS (SELECT * FROM System.Settings WHERE ModuleName = 'key_module_vpossystem' AND SettingName = 'str_sap_request_code')
                            BEGIN
                            INSERT INTO System.Settings(ModuleName,SettingName,StringValue) VALUES('key_module_vpossystem','str_sap_request_code','1002')
                            END
                            IF NOT EXISTS (SELECT * FROM System.Settings WHERE ModuleName = 'key_module_vpossystem' AND SettingName = 'str_sap_bukrs_code')
                            BEGIN
                            INSERT INTO System.Settings(ModuleName,SettingName,StringValue) VALUES('key_module_vpossystem','str_sap_bukrs_code','YY01')
                            END
                            IF NOT EXISTS (SELECT * FROM System.Settings WHERE ModuleName = 'key_module_vpossystem' AND SettingName = 'str_sap_service_url')
                            BEGIN
                            INSERT INTO System.Settings(ModuleName,SettingName,StringValue) VALUES('key_module_vpossystem','str_sap_service_url','https://vceaa-dev-cloud.it-cpi018-rt.cfapps.eu10-003.hana.ondemand.com/cxf/ZVPOS_CPI_2_ERP')
                            END
                            IF NOT EXISTS (SELECT * FROM System.Settings WHERE ModuleName = 'key_module_vpossystem' AND SettingName = 'str_sap_username')
                            BEGIN
                            INSERT INTO System.Settings(ModuleName,SettingName,StringValue) VALUES('key_module_vpossystem','str_sap_username','arda.berkman@inforama.com.tr')
                            END
                            IF NOT EXISTS (SELECT * FROM System.Settings WHERE ModuleName = 'key_module_vpossystem' AND SettingName = 'str_sap_password')
                            BEGIN
                            INSERT INTO System.Settings(ModuleName,SettingName,StringValue) VALUES('key_module_vpossystem','str_sap_password','Cits2022*')
                            END
                            IF NOT EXISTS (SELECT * FROM System.Settings WHERE ModuleName = 'key_module_vpossystem' AND SettingName = 'vpossystem_sap_job_timer')
                            BEGIN
                            INSERT INTO System.Settings(ModuleName,SettingName,IntValue) VALUES('key_module_vpossystem','vpossystem_sap_job_timer',480)
                            END
                            IF NOT EXISTS (SELECT * FROM System.Settings WHERE ModuleName = 'key_module_vpossystem' AND SettingName = 'str_bank_return_success_url')
                            BEGIN
                            INSERT INTO System.Settings(ModuleName,SettingName,StringValue) VALUES('key_module_vpossystem','str_bank_return_success_url','https://localhost:44398/TR/VposSystem/Default/Success3D')
                            END
                            IF NOT EXISTS (SELECT * FROM System.Settings WHERE ModuleName = 'key_module_vpossystem' AND SettingName = 'str_bank_return_error_url')
                            BEGIN
                            INSERT INTO System.Settings(ModuleName,SettingName,StringValue) VALUES('key_module_vpossystem','str_bank_return_error_url','https://localhost:44398/TR/VposSystem/Default/Fail3D')
                            END
                            IF NOT EXISTS (SELECT * FROM System.Settings WHERE ModuleName = 'key_module_vpossystem' AND SettingName = 'str_provision_request_code')
                            BEGIN
                            INSERT INTO System.Settings(ModuleName,SettingName,StringValue) VALUES('key_module_vpossystem','str_provision_request_code','1003')
                            END
                            
                            IF NOT EXISTS (SELECT * FROM System.Settings WHERE ModuleName = 'key_module_vpossystem' AND SettingName = 'str_invoice_request_code')
                            BEGIN
                            INSERT INTO System.Settings(ModuleName,SettingName,StringValue) VALUES('key_module_vpossystem','str_invoice_request_code','1001')
                            END
                            
                            IF NOT EXISTS (SELECT * FROM System.Settings WHERE ModuleName = 'key_module_vpossystem' AND SettingName = 'str_finansbank_merchant_id')
                            BEGIN
                            INSERT INTO System.Settings(ModuleName,SettingName,StringValue) VALUES('key_module_vpossystem','str_finansbank_merchant_id','085300000009597')
                            END

 

                            IF NOT EXISTS (SELECT * FROM System.Settings WHERE ModuleName = 'key_module_vpossystem' AND SettingName = 'str_finansbank_merchant_user')
                            BEGIN
                            INSERT INTO System.Settings(ModuleName,SettingName,StringValue) VALUES('key_module_vpossystem','str_finansbank_merchant_user','QNB_ISYERI_KULLANICI')
                            END

 

                            IF NOT EXISTS (SELECT * FROM System.Settings WHERE ModuleName = 'key_module_vpossystem' AND SettingName = 'str_finansbank_merchant_password')
                            BEGIN
                            INSERT INTO System.Settings(ModuleName,SettingName,StringValue) VALUES('key_module_vpossystem','str_finansbank_merchant_password','FwCX2')
                            END

 

                            IF NOT EXISTS (SELECT * FROM System.Settings WHERE ModuleName = 'key_module_vpossystem' AND SettingName = 'str_finansbank_merchant_store_key')
                            BEGIN
                            INSERT INTO System.Settings(ModuleName,SettingName,StringValue) VALUES('key_module_vpossystem','str_finansbank_merchant_store_key','12345678')
                            END

 

                            IF NOT EXISTS (SELECT * FROM System.Settings WHERE ModuleName = 'key_module_vpossystem' AND SettingName = 'str_finansbank_payment_service_url')
                            BEGIN
                            INSERT INTO System.Settings(ModuleName,SettingName,StringValue) VALUES('key_module_vpossystem','str_finansbank_payment_service_url','https://vpostest.qnbfinansbank.com/Gateway/Default.aspx')
                            END
                            
                            ");
            #endregion
            return sb.ToString();
        }
    }
}