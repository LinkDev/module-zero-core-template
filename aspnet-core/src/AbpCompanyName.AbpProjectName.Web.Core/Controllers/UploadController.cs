using Abp.MultiTenancy;
using AbpCompanyName.AbpProjectName.Authentication.External;
using AbpCompanyName.AbpProjectName.Authentication.JwtBearer;
using AbpCompanyName.AbpProjectName.Authorization;
using AbpCompanyName.AbpProjectName.Authorization.Users;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Hosting;
using AbpCompanyName.AbpProjectName.Configuration;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using Microsoft.AspNetCore.Http;
using System;

namespace AbpCompanyName.AbpProjectName.Controllers
{
    [Route("api/[controller]/[action]")]
    public class UploadController : AbpProjectNameControllerBase
    {
        private readonly LogInManager _logInManager;
        private readonly ITenantCache _tenantCache;
        private readonly AbpLoginResultTypeHelper _abpLoginResultTypeHelper;
        private readonly TokenAuthConfiguration _configuration;
        private readonly IExternalAuthConfiguration _externalAuthConfiguration;
        private readonly IExternalAuthManager _externalAuthManager;
        private readonly UserRegistrationManager _userRegistrationManager;
        private readonly IConfigurationRoot _appConfiguration;
        public UploadController(
            LogInManager logInManager,
            ITenantCache tenantCache,
            AbpLoginResultTypeHelper abpLoginResultTypeHelper,
            TokenAuthConfiguration configuration,
            IExternalAuthConfiguration externalAuthConfiguration,
            IExternalAuthManager externalAuthManager,
            UserRegistrationManager userRegistrationManager, IHostingEnvironment env)
        {
            _logInManager = logInManager;
            _tenantCache = tenantCache;
            _abpLoginResultTypeHelper = abpLoginResultTypeHelper;
            _configuration = configuration;
            _externalAuthConfiguration = externalAuthConfiguration;
            _externalAuthManager = externalAuthManager;
            _userRegistrationManager = userRegistrationManager;
            _appConfiguration = env.GetAppConfiguration();
        }

        [HttpGet]
        public FileStreamResult GetImage(string FileName)
        {
            var uploads = "Files";
            var FilePath = Path.Combine(uploads, FileName);
            var image = System.IO.File.OpenRead(FilePath);
            return File(image, $"image/{Path.GetExtension(FileName)}");
        }

        [HttpPost]
        public string UploadFile(IFormFile file)
        {
            var fileName = Guid.NewGuid();
            var uploads = "Files";
            if (!Directory.Exists(uploads))
                Directory.CreateDirectory(uploads);
            var FileName = $"{fileName:N}{Path.GetExtension(file.FileName)}";
            var FilePath = Path.Combine(uploads, FileName);

            var x = Directory.GetCurrentDirectory();
            using (var fileStream = new FileStream(FilePath, FileMode.OpenOrCreate))
            {
                file.CopyTo(fileStream);
            }
            return FileName;
        }
        
    }
}
