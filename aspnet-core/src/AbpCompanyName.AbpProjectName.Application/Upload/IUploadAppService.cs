using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AbpCompanyName.AbpProjectName.Upload
{
    public interface IUploadAppService
    {
        string UploadFile(IFormFile file);
    }
}
