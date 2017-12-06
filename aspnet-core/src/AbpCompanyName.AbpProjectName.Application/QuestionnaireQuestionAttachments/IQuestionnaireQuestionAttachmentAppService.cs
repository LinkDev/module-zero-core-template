using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.QuestionnaireQuestionAttachments.Dto;

namespace AbpCompanyName.AbpProjectName.QuestionnaireQuestionAttachments
{
	public interface IQuestionnaireQuestionAttachmentAppService : IFilteredAppService<QuestionnaireQuestionAttachmentDto, Guid, FilteredResultRequestDto>
	{
		
	}
}