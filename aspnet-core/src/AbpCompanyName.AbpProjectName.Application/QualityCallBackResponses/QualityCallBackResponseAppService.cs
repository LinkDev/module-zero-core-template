using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.QualityCallBackResponses.Dto;

namespace AbpCompanyName.AbpProjectName.QualityCallBackResponses
{
	public class QualityCallBackResponseAppService : AsyncFilteredAppService<QualityCallBackResponse, QualityCallBackResponseDto, int, FilteredResultRequestDto>, IQualityCallBackResponseAppService
	{
		public QualityCallBackResponseAppService(IRepository<QualityCallBackResponse, int> repository)
            : base(repository)
        {
			this.DefaultSort = "UserId ASC";
		}

	}
}