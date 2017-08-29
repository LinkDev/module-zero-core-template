using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.Questions.Dto;

namespace AbpCompanyName.AbpProjectName.Questions
{
	public interface IQuestionAppService : IFilteredAppService<QuestionDto, Guid, FilteredResultRequestDto>
	{
		
	}
}