using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.EncodingResponses.Dto;

namespace AbpCompanyName.AbpProjectName.EncodingResponses
{
	public class EncodingResponseAppService : AsyncFilteredAppService<EncodingResponse, EncodingResponseDto, Guid, FilteredResultRequestDto>, IEncodingResponseAppService
	{
		public EncodingResponseAppService(IRepository<EncodingResponse, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "ResponseCode ASC";
		}

	}
}