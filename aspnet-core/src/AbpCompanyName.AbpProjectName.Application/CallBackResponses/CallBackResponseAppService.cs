using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.CallBackResponses.Dto;

namespace AbpCompanyName.AbpProjectName.CallBackResponses
{
	public class CallBackResponseAppService : AsyncFilteredAppService<CallBackResponse, CallBackResponseDto, Guid, FilteredResultRequestDto>, ICallBackResponseAppService
	{
		public CallBackResponseAppService(IRepository<CallBackResponse, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "UserId ASC";
		}

		protected override IQueryable<CallBackResponse> CreateQuery()
        {
            return Repository.GetAllIncluding(
				e => e.Survey, 
				e => e.Domain, 
				e => e.Phase, 
				e => e.Sample, 
				e => e.cbParentResponse
			);
        }
	}
}