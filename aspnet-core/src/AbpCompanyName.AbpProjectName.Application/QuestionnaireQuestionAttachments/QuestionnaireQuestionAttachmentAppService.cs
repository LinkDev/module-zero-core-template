using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.QuestionnaireQuestionAttachments.Dto;

namespace AbpCompanyName.AbpProjectName.QuestionnaireQuestionAttachments
{
	public class QuestionnaireQuestionAttachmentAppService : AsyncFilteredAppService<QuestionnaireQuestionAttachment, QuestionnaireQuestionAttachmentDto, Guid, FilteredResultRequestDto>, IQuestionnaireQuestionAttachmentAppService
	{
		public QuestionnaireQuestionAttachmentAppService(IRepository<QuestionnaireQuestionAttachment, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "Name ASC";
		}

		protected override IQueryable<QuestionnaireQuestionAttachment> CreateQuery()
        {
            return Repository.GetAllIncluding(
				e => e.Question
			);
        }
	}
}