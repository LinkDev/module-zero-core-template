using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abp.Application.Services.Dto
{
    public class FilteredResultRequestDto : PagedAndSortedResultRequestDto, IFilteredResultRequest
    {
        public FilteredResultRequestDto()
        {
        }

        public virtual string Filter { get; set; }

        public override int MaxResultCount { get; set; } = int.MaxValue;
    }
}
