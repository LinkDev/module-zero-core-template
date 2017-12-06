using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.QuestionAttachments.Dto;

namespace AbpCompanyName.AbpProjectName.QuestionAttachments
{
	public interface IQuestionAttachmentAppService : IFilteredAppService<QuestionAttachmentDto, Guid, FilteredResultRequestDto>
	{
		
	}
}