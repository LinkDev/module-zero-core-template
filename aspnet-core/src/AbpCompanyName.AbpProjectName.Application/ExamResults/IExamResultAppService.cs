using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.ExamResults.Dto;

namespace AbpCompanyName.AbpProjectName.ExamResults
{
	public interface IExamResultAppService : IFilteredAppService<ExamResultDto, Guid, FilteredResultRequestDto>
	{
		
	}
}