using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AbpCompanyName.AbpProjectName
{
    public class GetAllUserInput: PagedAndSortedResultRequestDto
    {
        public string searchKey { get; set; }
        public int? roleId { get; set; }
    }
}
