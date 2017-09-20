using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.IO;

namespace AbpCompanyName.AbpProjectName.Upload
{
    public class UploadAppService : AbpProjectNameAppServiceBase, IUploadAppService
    {
        public string UploadFile(IFormFile file)
        {
            var fileName = Guid.NewGuid();
            var uploads = "Files";
            if (!Directory.Exists(uploads))
                Directory.CreateDirectory(uploads);
            var FileName = $"{fileName:N}{Path.GetExtension(file.FileName)}";
            var FilePath = Path.Combine(uploads, FileName);
            using (var fileStream = new FileStream(FilePath, FileMode.OpenOrCreate))
            {
                file.CopyTo(fileStream);
            }
            return FileName;
        }
    }
}
