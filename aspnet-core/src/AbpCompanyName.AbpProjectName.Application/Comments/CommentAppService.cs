using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using AbpCompanyName.AbpProjectName.Comments.Dto;

namespace AbpCompanyName.AbpProjectName.Comments
{
	public class CommentAppService : AsyncFilteredAppService<Comment, CommentDto, Guid, FilteredResultRequestDto>, ICommentAppService
	{
		public CommentAppService(IRepository<Comment, Guid> repository)
            : base(repository)
        {
			this.DefaultSort = "UserId ASC";
		}

		protected override IQueryable<Comment> CreateQuery()
        {
            return Repository.GetAllIncluding(
				e => e.Response, 
				e => e.Question, 
				e => e.QuestionGroup
			);
        }
	}
}