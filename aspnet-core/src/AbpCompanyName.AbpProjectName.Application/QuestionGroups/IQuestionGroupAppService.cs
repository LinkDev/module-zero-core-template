using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.QuestionGroups.Dto;

namespace AbpCompanyName.AbpProjectName.QuestionGroups
{
	public interface IQuestionGroupAppService : IFilteredAppService<QuestionGroupDto, Guid, FilteredResultRequestDto>
	{
		
	}
}