using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abp.Application.Services.Dto
{
    public class FilteredResultRequestDto : PagedAndSortedResultRequestDto, IFilteredResultRequest
    {
        public virtual string search { get; set; }
    }
}
