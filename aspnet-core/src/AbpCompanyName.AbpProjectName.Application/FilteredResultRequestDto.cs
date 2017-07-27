using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AbpCompanyName.AbpProjectName
{
   public class FilteredResultRequestDto: PagedAndSortedResultRequestDto
    {

        public string search { get; set; }
    }
}
