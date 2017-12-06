using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.QuestionAttachments.Dto;

namespace AbpCompanyName.AbpProjectName.QuestionAttachments
{
	public class QuestionAttachmentAppService : AsyncFilteredAppService<QuestionAttachment, QuestionAttachmentDto, Guid, FilteredResultRequestDto>, IQuestionAttachmentAppService
	{
		public QuestionAttachmentAppService(IRepository<QuestionAttachment, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "Name ASC";
		}

		protected override IQueryable<QuestionAttachment> CreateQuery()
        {
            return Repository.GetAllIncluding(
				e => e.Question
			);
        }
	}
}