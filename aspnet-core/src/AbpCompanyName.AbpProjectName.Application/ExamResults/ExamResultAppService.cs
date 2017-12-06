using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.ExamResults.Dto;

namespace AbpCompanyName.AbpProjectName.ExamResults
{
	public class ExamResultAppService : AsyncFilteredAppService<ExamResult, ExamResultDto, Guid, FilteredResultRequestDto>, IExamResultAppService
	{
		public ExamResultAppService(IRepository<ExamResult, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "Id ASC";
		}

	}
}